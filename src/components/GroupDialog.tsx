'use client'

import { useMutation } from '@apollo/client/react'
import { LoaderIcon, Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

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
import { Field, FieldGroup, FieldLabel, FieldSet } from './ui/field'
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
  const [groupName, setGroupName] = useState(initialName)

  const isEditMode = Boolean(groupId)

  useEffect(() => {
    setGroupName(initialName)
  }, [initialName])

  const isFormValid = useMemo(() => groupName !== '', [groupName])

  const hasNameChanged = useMemo(
    () => isEditMode && groupName !== initialName,
    [isEditMode, groupName, initialName]
  )

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

  // eslint-disable-next-line max-statements
  const handleSubmit = async () => {
    if (!isFormValid) {
      toast.error('Please fill out all required fields')
      return
    }

    try {
      if (isEditMode && groupId) {
        const { data: updateGroupData } = await updateGroup({
          variables: { groupId: groupId, name: groupName }
        })

        if (updateGroupData?.updateGroup) {
          toast.success('Group updated successfully')
        }
      } else {
        const { data: createGroupData } = await createGroup({
          variables: { name: groupName }
        })

        if (createGroupData?.createGroup) {
          toast.success('Group added successfully')
          router.push(`/group/${createGroupData.createGroup.groupId}`)
        }
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
    <Dialog>
      {children}

      <DialogContent>
        <form>
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
                <Field>
                  <FieldLabel htmlFor="field--group-name">
                    Group name
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="field--group-name"
                      onChange={(event) => setGroupName(event.target.value)}
                      placeholder="Your group name"
                      value={groupName}
                    />
                  </InputGroup>
                </Field>
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

                <Button
                  className={isEditMode ? 'ml-auto' : 'w-full'}
                  disabled={
                    !isFormValid || isLoading || (isEditMode && !hasNameChanged)
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
              </DialogFooter>
            </FieldSet>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default GroupDialog
