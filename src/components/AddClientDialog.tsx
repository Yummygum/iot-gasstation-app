'use client'
/* eslint-disable max-statements */
import { useLazyQuery, useMutation } from '@apollo/client/react'
import { InfoIcon, LoaderIcon, WalletIcon } from 'lucide-react'
import { PropsWithChildren, useMemo, useState } from 'react'
import { toast } from 'sonner'

import ADD_CLIENT_TO_GROUP_MUTATION from '@/lib/api/mutations/addClientToGroup'
import CREATE_CLIENT_MUTATION from '@/lib/api/mutations/createClient'
import CREATE_GROUP_MUTATION from '@/lib/api/mutations/createGroup'
import GET_GROUP from '@/lib/api/queries/getGroup'
import GET_GROUP_LIST from '@/lib/api/queries/getGroupList'

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
import { Field, FieldGroup, FieldLabel, FieldSet } from './ui/field'
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
const organizationUrlRegex = new RegExp(
  /^(?:https:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\:\d{1,5})?\/?$/
)

const AddClientDialog = ({
  url: initialUrl = '',
  groupId: initialGroupId,
  children
}: AddClientDialogContentProps) => {
  const [clientType, setClientType] = useState<ClientType>('organization')
  const [url, setUrl] = useState(initialUrl)
  const [groupId, setGroupId] = useState(initialGroupId)
  const [clientName, setClientName] = useState('')
  const [walletAddress, setWalletAddress] = useState('')

  const isOrganization = clientType === 'organization'
  const isIndividual = clientType === 'individual'

  const isFormValid = useMemo(() => {
    if (!groupId) {
      return false
    }

    const validUrl = organizationUrlRegex.test(url)

    // Check the required fields for organization and individual types
    return isOrganization ? validUrl : clientName !== '' && walletAddress !== ''
  }, [url, isOrganization, walletAddress, clientName, groupId])

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
      refetchQueries: [GET_GROUP],
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
    if (!isFormValid) {
      toast.error('Please fill out all required fields')
      return
    }

    try {
      const { data: createClientData } = await createClient({
        variables: { name: clientName, walletAddress: walletAddress }
      })

      // Add default group if no groups exist
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
        addClientToGroup({
          variables: {
            groupId: groupId ?? '',
            clientId: createClientData.registerClient.clientId
          }
        })

        toast.success(`Client added successfully`)
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong adding a client')
      return
    }
  }

  return (
    <Dialog onOpenChange={(open) => (open ? getGroupList() : null)}>
      {children}

      <DialogContent>
        <form>
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
                <Button
                  onClick={(event) => {
                    event?.preventDefault()
                    setClientType('organization')
                  }}
                  size="sm"
                  variant={isOrganization ? 'default' : 'ghost'}
                >
                  Organization
                </Button>
                <Button
                  onClick={(event) => {
                    event?.preventDefault()
                    setClientType('individual')
                  }}
                  size="sm"
                  variant={isIndividual ? 'default' : 'ghost'}
                >
                  Individual
                </Button>
              </div>

              {isOrganization && (
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                      Client URL
                    </FieldLabel>
                    <Input
                      name="Client URL"
                      onChange={(event) => setUrl(event.target.value)}
                      placeholder="Client URL"
                      value={url}
                    />
                  </Field>
                </FieldGroup>
              )}

              {isIndividual && (
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="field--client-name">
                      Client name
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id="field--client-name"
                        onChange={(event) => setClientName(event.target.value)}
                        placeholder="Your client name"
                        value={clientName}
                      />
                    </InputGroup>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="field--wallet address">
                      Wallet address
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        autoComplete="off"
                        className="!pl-1"
                        data-1p-ignore
                        name="Wallet address"
                        onChange={(event) =>
                          setWalletAddress(event.target.value)
                        }
                        placeholder="0x02a212de6a9dfa3a69e22387..."
                        value={walletAddress}
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
                            Enter the wallet address of the client here. It
                            should be 64 characters long.
                          </TooltipContent>
                        </Tooltip>
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                </FieldGroup>
              )}

              <FieldGroup>
                <Field className="max-w-[224px]">
                  <FieldLabel htmlFor="field--group">Add to group</FieldLabel>
                  <Select
                    onValueChange={(selectedValue) => setGroupId(selectedValue)}
                    value={groupId}
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
                </Field>
              </FieldGroup>

              <DialogFooter>
                <Button
                  className="mt-10 w-full"
                  disabled={!isFormValid}
                  onClick={handleSubmit}
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
