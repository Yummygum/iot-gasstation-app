'use client'

import { useQuery } from '@apollo/client/react'
import { CopyIcon } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import React, { useState } from 'react'
import { toast } from 'sonner'

import GET_SPONSOR_WALLET from '@/lib/api/queries/getSponsorWallet'

import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'

interface AddFundsDialogProps {
  children: React.ReactNode
}

const AddFundsDialog = ({ children }: AddFundsDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useQuery(GET_SPONSOR_WALLET)

  const walletAddress = data?.getSponsorWallet?.address || ''

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress)
      toast.success('Address copied to clipboard')
    } catch (err) {
      toast.error('Failed to copy address')
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-[561px]">
        <DialogHeader className="mb-6">
          <DialogTitle>Add funds to wallet</DialogTitle>
          <DialogDescription>
            Top up your account using your wallet
          </DialogDescription>
          <DialogClose />
        </DialogHeader>

        <div className="flex flex-col items-center gap-6">
          {/* QR Code */}
          <div className="flex size-[198px] items-center justify-center rounded-lg bg-white p-4">
            {walletAddress ? (
              <QRCodeSVG size={198} value={walletAddress} />
            ) : (
              <div className="text-muted-foreground text-sm">Loading...</div>
            )}
          </div>

          {/* Address Display */}
          <div className="w-full space-y-3">
            <div className="bg-muted text-muted-foreground rounded-lg border p-4 text-center font-mono text-sm leading-relaxed break-all">
              {walletAddress || 'Loading wallet address...'}
            </div>

            {/* Copy Button */}
            <Button
              className="w-full"
              disabled={!walletAddress}
              onClick={handleCopyAddress}
              type="button"
              variant="default"
            >
              <CopyIcon className="mr-2 size-4" />
              Copy address
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddFundsDialog
