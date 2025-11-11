'use client'
/* eslint-disable max-statements */

import { useLazyQuery, useMutation } from '@apollo/client/react'
import { useForm } from '@tanstack/react-form'
import { InfoIcon, LoaderIcon, WalletIcon } from 'lucide-react'
import { PropsWithChildren, useMemo, useState } from 'react'
import { toast } from 'sonner'
import * as z from 'zod'

import ADD_CLIENT_TO_GROUP_MUTATION from '@/lib/api/mutations/addClientToGroup'
import CREATE_CLIENT_MUTATION from '@/lib/api/mutations/createClient'
import CREATE_GROUP_MUTATION from '@/lib/api/mutations/createGroup'
import GET_CLIENT_LIST from '@/lib/api/queries/getClientList'
import GET_GROUP from '@/lib/api/queries/getGroup'
import GET_GROUP_LIST from '@/lib/api/queries/getGroupList'
import { normalizeClientUrl } from '@/lib/utils'

import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from './ui/field'
import { Input } from './ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from './ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

interface AddClientDialogContentProps extends PropsWithChildren {
  url?: string
  groupId?: string
}

type ClientType = 'individual' | 'organization'

// A regex to test the organization URL
const urlRegex = new RegExp(
  /^(?:https:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\:\d{1,5})?\/?$/
)

const formSchema = z
  .object({
    clientType: z.enum(['individual', 'organization']),
    groupId: z.string().min(1, 'Please select a group'),
    url: z.string(),
    clientName: z.string(),
    walletAddress: z.string()
  })
  .superRefine((value, ctx) => {
    if (value.clientType === 'organization') {
      if (value.url === '' || !urlRegex.test(value.url)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Client URL is required and must be valid',
          path: ['url']
        })
      }
    } else {
      if (value.clientName === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Client name is required',
          path: ['clientName']
        })
      }

      if (value.walletAddress === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Wallet address is required',
          path: ['walletAddress']
        })
      }
    }
  })

const AddClientDialog = ({
  url: initialUrl = '',
  groupId: initialGroupId,
  children
}: AddClientDialogContentProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm({
    defaultValues: {
      clientType: 'organization' as ClientType,
      url: initialUrl,
      groupId: initialGroupId ?? '',
      clientName: '',
      walletAddress: ''
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      const normalizedUrl = normalizeClientUrl(value.url)
      const submitValue = { ...value, url: normalizedUrl }
      try {
        const { data: createClientData } = await createClient({
          variables: {
            name: submitValue.clientName,
            walletAddress: submitValue.walletAddress
          }
        })

        if (groups.find((group) => group.groupId === 'my-group')) {
          try {
            await createGroup({
              variables: { name: 'My group' }
            })
          } catch (err) {
            toast.error('Something went wrong adding your first group')
            console.error(err)
          }
        }

        if (createClientData?.registerClient.clientId) {
          await addClientToGroup({
            variables: {
              groupId: submitValue.groupId ?? '',
              clientId: createClientData.registerClient.clientId
            }
          })

          toast.success(`Client added successfully`)
          form.reset()
          setIsOpen(false)
        }
      } catch (err) {
        console.error(err)
        toast.error('Something went wrong adding a client')
        return
      }
    }
  })

  const [getGroupList, { data: groupsData }] = useLazyQuery(GET_GROUP_LIST)
  const groups = useMemo(
    () => [
      ...(groupsData?.getGroupList || []),
      ...((groupsData?.getGroupList || []).length === 0
        ? [
            {
              name: 'My group',
              groupId: 'my-group'
            }
          ]
        : [])
    ],
    [groupsData?.getGroupList]
  )

  const [createClient, { loading: createClientLoading }] = useMutation(
    CREATE_CLIENT_MUTATION,
    {
      refetchQueries: [GET_GROUP],
      errorPolicy: 'all'
    }
  )

  const [addClientToGroup, { loading: addClientToGroupLoading }] = useMutation(
    ADD_CLIENT_TO_GROUP_MUTATION,
    {
      refetchQueries: [GET_GROUP, GET_CLIENT_LIST],
      errorPolicy: 'all'
    }
  )

  const [createGroup, { loading: createGroupLoading }] = useMutation(
    CREATE_GROUP_MUTATION,
    {
      refetchQueries: [GET_GROUP_LIST],
      errorPolicy: 'all'
    }
  )

  const isLoading =
    createClientLoading || addClientToGroupLoading || createGroupLoading

  const handleSubmit = async () => {
    await form.handleSubmit()
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          getGroupList()
        } else {
          form.reset()
        }

        setIsOpen(open)
      }}
      open={isOpen}
    >
      {children}

      <DialogContent>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmit()
          }}
        >
          <DialogHeader className="mb-5">
            <DialogTitle>Add Client</DialogTitle>
            <DialogDescription>
              Add either a Organizational client or Individual client
            </DialogDescription>
            <DialogClose />
          </DialogHeader>

          <FieldGroup>
            <FieldSet>
              <div className="flex w-min gap-2 self-center rounded-xl border bg-white p-2">
                <form.Field name="clientType">
                  {(field) => (
                    <>
                      <Button
                        onClick={(event) => {
                          event?.preventDefault()
                          field.handleChange('organization')
                        }}
                        size="sm"
                        variant={
                          field.state.value === 'organization'
                            ? 'default'
                            : 'ghost'
                        }
                      >
                        Organization
                      </Button>
                      <Button
                        onClick={(event) => {
                          event?.preventDefault()
                          field.handleChange('individual')
                        }}
                        size="sm"
                        variant={
                          field.state.value === 'individual'
                            ? 'default'
                            : 'ghost'
                        }
                      >
                        Individual
                      </Button>
                    </>
                  )}
                </form.Field>
              </div>

              <form.Field name="clientType">
                {(ft) =>
                  ft.state.value === 'organization' ? (
                    <FieldGroup>
                      <form.Field name="url">
                        {(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor="field--client-url">
                                Client URL
                              </FieldLabel>
                              <Input
                                aria-invalid={isInvalid}
                                autoComplete="off"
                                id="field--client-url"
                                name={field.name}
                                onBlur={() => {
                                  field.handleBlur()
                                  const normalized = normalizeClientUrl(
                                    field.state.value
                                  )
                                  if (normalized !== field.state.value) {
                                    field.handleChange(normalized)
                                  }
                                }}
                                onChange={(event) =>
                                  field.handleChange(event.target.value)
                                }
                                placeholder="https://example.org"
                                value={field.state.value}
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          )
                        }}
                      </form.Field>
                    </FieldGroup>
                  ) : (
                    <FieldGroup>
                      <form.Field name="clientName">
                        {(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor="field--client-name">
                                Client name
                              </FieldLabel>
                              <InputGroup>
                                <InputGroupInput
                                  aria-invalid={isInvalid}
                                  id="field--client-name"
                                  name={field.name}
                                  onBlur={field.handleBlur}
                                  onChange={(event) =>
                                    field.handleChange(event.target.value)
                                  }
                                  placeholder="Your client name"
                                  value={field.state.value}
                                />
                              </InputGroup>
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          )
                        }}
                      </form.Field>

                      <form.Field name="walletAddress">
                        {(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor="field--wallet-address">
                                Wallet address
                              </FieldLabel>
                              <InputGroup>
                                <InputGroupInput
                                  aria-invalid={isInvalid}
                                  autoComplete="off"
                                  className="pl-1!"
                                  data-1p-ignore
                                  id="field--wallet-address"
                                  name={field.name}
                                  onBlur={field.handleBlur}
                                  onChange={(event) =>
                                    field.handleChange(event.target.value)
                                  }
                                  placeholder="0x02a212de6a9dfa3a69e22387..."
                                  value={field.state.value}
                                />
                                <InputGroupAddon>
                                  <WalletIcon />
                                </InputGroupAddon>
                                <InputGroupAddon align="inline-end">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <InputGroupButton
                                        className="rounded-full"
                                        size="icon-xs"
                                      >
                                        <InfoIcon />
                                      </InputGroupButton>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-[240px]">
                                      Enter the wallet address of the client
                                      here. It should be 64 characters long.
                                    </TooltipContent>
                                  </Tooltip>
                                </InputGroupAddon>
                              </InputGroup>
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          )
                        }}
                      </form.Field>
                    </FieldGroup>
                  )
                }
              </form.Field>

              <FieldGroup>
                <form.Field name="groupId">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field className="max-w-[224px]" data-invalid={isInvalid}>
                        <FieldLabel htmlFor="field--group">
                          Add to group
                        </FieldLabel>
                        <Select
                          onValueChange={(selectedValue) =>
                            field.handleChange(selectedValue)
                          }
                          value={field.state.value}
                        >
                          <SelectTrigger
                            aria-label="Select a group..."
                            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                          >
                            <SelectValue placeholder="Select a group..." />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {groups.map((group, idx) => (
                              <SelectItem
                                key={`${group.groupId}-${idx}`}
                                value={group.groupId}
                              >
                                {group.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                </form.Field>
              </FieldGroup>

              <DialogFooter>
                <Button
                  className="mt-10 w-full"
                  onClick={(event) => {
                    event.preventDefault()
                    handleSubmit()
                  }}
                  type="submit"
                >
                  {isLoading ? (
                    <LoaderIcon className="animate-spin" />
                  ) : (
                    'Add Client'
                  )}
                </Button>
              </DialogFooter>
            </FieldSet>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddClientDialog
