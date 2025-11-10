import { useMutation } from '@apollo/client/react'
import { PropsWithChildren } from 'react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import DELETE_CLIENT_MUTATION from '@/lib/api/mutations/deleteClient'
import GET_CLIENT_LIST from '@/lib/api/queries/getClientList'

interface ConfirmDeleteClientModalProps extends PropsWithChildren {
  clientId: string
  // eslint-disable-next-line no-unused-vars
  onOpenChange?: (open: boolean) => void
  // eslint-disable-next-line react/boolean-prop-naming
  open: boolean
}

const ConfirmDeleteClientDialog = ({
  children,
  open,
  onOpenChange,
  clientId
}: ConfirmDeleteClientModalProps) => {
  const [deleteClient] = useMutation(DELETE_CLIENT_MUTATION, {
    variables: { clientId },
    refetchQueries: [GET_CLIENT_LIST]
  })

  const handleDialogActionClick = async () => {
    try {
      const { data } = await deleteClient()

      if (data?.deleteClient) {
        toast.success('Client deleted successfully')
      }
    } catch (error) {
      toast.error('Failed to delete client')
      console.error(error)
    }
  }

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      {children}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            client and all of its statistics.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDialogActionClick}>
            Delete client
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDeleteClientDialog
