'use client'

import { useMutation } from '@apollo/client/react'
import { useForm } from '@tanstack/react-form'
import { LoaderIcon, Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'
import { toast } from 'sonner'
import * as z from 'zod'

import CREATE_GROUP_MUTATION from '@/lib/api/mutations/createGroup'
import DELETE_GROUP_MUTATION from '@/lib/api/mutations/deleteGroup'
import UPDATE_GROUP_MUTATION from '@/lib/api/mutations/updateGroup'
import GET_GROUP from '@/lib/api/queries/getGroup'
import GET_GROUP_LIST from '@/lib/api/queries/getGroupList'

import { ConfirmDeleteGroupDialog } from './ConfirmDeleteGroupDialog'
import { AlertDialogTrigger } from './ui/alert-dialog'
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
import { InputGroup, InputGroupInput } from './ui/input-group'

interface GroupDialogProps extends PropsWithChildren {
  groupId?: string
  name?: string
}

// eslint-disable-next-line max-statements
const GroupDialog = ({
  children,
  groupId,
  name: initialName = ''
}: GroupDialogProps) => {
  const [, /* groupName */ setGroupName] = useState(initialName)
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm({
    defaultValues: {
      name: initialName
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(1, 'Please enter a group name')
      })
    },
    onSubmit: async ({ value }) => {
      try {
        if (isEditMode && groupId) {
          await updateExistingGroup(value.name)
        } else {
          await createNewGroup(value.name)
        }
      } catch (err) {
        console.error(err)
        toast.error(
          isEditMode
            ? 'Something went wrong updating the group'
            : 'Something went wrong adding a group'
        )
        return
      }
    }
  })

  const isEditMode = Boolean(groupId)

  useEffect(() => {
    setGroupName(initialName)
    // keep form in sync when initial name prop changes
    form.setFieldValue('name', initialName)
  }, [initialName, form])

  // Track current name for delete/UX only via local state

  const router = useRouter()

  const [createGroup, { loading: isCreateLoading }] = useMutation(
    CREATE_GROUP_MUTATION,
    {
      refetchQueries: [GET_GROUP_LIST],
      errorPolicy: 'all'
    }
  )

  const [updateGroup, { loading: isUpdateLoading }] = useMutation(
    UPDATE_GROUP_MUTATION,
    {
      refetchQueries: [GET_GROUP, GET_GROUP_LIST],
      errorPolicy: 'all'
    }
  )

  const [deleteGroup, { loading: isDeleteLoading }] = useMutation(
    DELETE_GROUP_MUTATION,
    {
      refetchQueries: [GET_GROUP_LIST],
      errorPolicy: 'all'
    }
  )

  const isLoading = isCreateLoading || isUpdateLoading || isDeleteLoading

  const updateExistingGroup = async (name: string) => {
    const { data: updateGroupData } = await updateGroup({
      variables: { groupId: groupId as string, name }
    })
    if (updateGroupData?.updateGroup) {
      toast.success('Group updated successfully')
      setIsOpen(false)
    }
  }

  const createNewGroup = async (name: string) => {
    const { data: createGroupData } = await createGroup({
      variables: { name }
    })
    if (createGroupData?.createGroup) {
      toast.success('Group added successfully')
      router.push(`/group/${createGroupData.createGroup.groupId}`)
      setIsOpen(false)
    }
  }

  const handleSubmit = async () => {
    await form.handleSubmit()
  }

  const handleDelete = async () => {
    if (!groupId) {
      return
    }

    try {
      const { data: deleteGroupData } = await deleteGroup({
        variables: { groupId }
      })

      if (deleteGroupData?.deleteGroup) {
        toast.success('Group deleted successfully')
        router.push('/')
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong deleting the group')
      return
    }
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
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
            <DialogTitle>{isEditMode ? 'Edit group' : ' group'}</DialogTitle>
            <DialogDescription className="text-balance">
              Groups are collections of clients. Use groups to organize your
              clients and manage their funds more efficiently.
            </DialogDescription>
            <DialogClose />
          </DialogHeader>

          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <form.Field name="name">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor="field--group-name">
                          Group name
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            aria-invalid={isInvalid}
                            id="field--group-name"
                            name={field.name}
                            onBlur={field.handleBlur}
                            onChange={(event) => {
                              setGroupName(event.target.value)
                              field.handleChange(event.target.value)
                            }}
                            placeholder="Your group name"
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
              </FieldGroup>

              <DialogFooter className="mt-10 flex-row justify-between gap-2">
                <ConfirmDeleteGroupDialog onDelete={handleDelete}>
                  <AlertDialogTrigger asChild>
                    {isEditMode && (
                      <Button
                        disabled={isLoading}
                        type="button"
                        variant="ghostDestructive"
                      >
                        {isDeleteLoading ? (
                          <LoaderIcon className="animate-spin" />
                        ) : (
                          <>
                            <Trash2Icon className="size-4" />
                            Delete group
                          </>
                        )}
                      </Button>
                    )}
                  </AlertDialogTrigger>
                </ConfirmDeleteGroupDialog>

                <form.Field name="name">
                  {(field) => (
                    <Button
                      className={isEditMode ? 'ml-auto' : 'w-full'}
                      disabled={
                        isLoading ||
                        field.state.value.trim() === '' ||
                        (isEditMode && field.state.value === initialName)
                      }
                      onClick={handleSubmit}
                      type="submit"
                    >
                      {isLoading ? (
                        <LoaderIcon className="animate-spin" />
                      ) : isEditMode ? (
                        'Edit group'
                      ) : (
                        'Create group'
                      )}
                    </Button>
                  )}
                </form.Field>
              </DialogFooter>
            </FieldSet>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default GroupDialog
