'use client'
import { useMutation } from '@apollo/client/react'
import React, { useState } from 'react'

import ALLOCATE_FUNDS_TO_GROUP_MUTATION from '@/lib/api/mutations/allocateFundsToGroup'
import WITHDRAW_FUNDS_FROM_GROUP_MUTATION from '@/lib/api/mutations/withdrawFundsFromGroup'
import GET_GROUP from '@/lib/api/queries/getGroup'

import CurrencyConverter from './CurrencyConverter'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'

interface AllocateFundsDialogProps {
  groupId: string
  children: React.ReactNode
}

const AllocateFundsDialog = ({
  groupId,
  children
}: AllocateFundsDialogProps) => {
  const [isAddMode, setIsAddMode] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const [allocateFunds, { loading: allocateLoading }] = useMutation(
    ALLOCATE_FUNDS_TO_GROUP_MUTATION,
    {
      refetchQueries: [{ query: GET_GROUP, variables: { groupId } }]
    }
  )

  const [withdrawFunds, { loading: withdrawLoading }] = useMutation(
    WITHDRAW_FUNDS_FROM_GROUP_MUTATION,
    {
      refetchQueries: [{ query: GET_GROUP, variables: { groupId } }]
    }
  )

  const processFunds = async (amount: number) => {
    const mutation = isAddMode ? allocateFunds : withdrawFunds
    await mutation({ variables: { amount, groupId } })
    setIsOpen(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const iotaAmount = parseInt(formData.get('iotaAmount') as string, 10)

    if (!iotaAmount || iotaAmount <= 0) {
      return
    }

    try {
      await processFunds(iotaAmount)
    } catch (error) {
      console.error('Error processing funds:', error)
    }
  }

  const isLoading = allocateLoading || withdrawLoading

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-6">
            <DialogTitle>Allocate budget</DialogTitle>
            <p className="text-muted-foreground text-sm">
              Drain or top up the Allocated budget for this group
            </p>
            <DialogClose />
          </DialogHeader>

          <div className="mb-6">
            <div className="bg-muted flex rounded-lg p-1">
              <Button
                className="flex-1"
                onClick={() => setIsAddMode(true)}
                size="sm"
                type="button"
                variant={isAddMode ? 'default' : 'ghost'}
              >
                Add funds
              </Button>
              <Button
                className="flex-1"
                onClick={() => setIsAddMode(false)}
                size="sm"
                type="button"
                variant={!isAddMode ? 'default' : 'ghost'}
              >
                Withdraw funds
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <CurrencyConverter />
          </div>

          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? 'Processing...' : 'Confirm'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AllocateFundsDialog
