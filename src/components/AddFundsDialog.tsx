'use client'

import { CopyIcon } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

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
  walletAddress?: string
  children: React.ReactNode
}

const AddFundsDialog = ({
  walletAddress = '0xdbc1d75014a031b1f7ccc6928b07daa601cOebac7a6af5ae64bfeae5eb84f5f7',
  children
}: AddFundsDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

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
            Top up your account using your personal wallet
          </DialogDescription>
          <DialogClose />
        </DialogHeader>

        <div className="flex flex-col items-center gap-6">
          {/* QR Code */}
          <div className="flex size-[198px] items-center justify-center rounded-lg border-2 border-black bg-white p-4">
            <svg
              className="size-full"
              viewBox="0 0 29 29"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect fill="#fff" height="29" width="29" />
              <path
                d="M0 0h7v7H0zM8 0h1v1H8zM10 0h2v1h-2zM13 0h3v1h-3zM17 0h2v1h-2zM22 0h7v7h-7zM1 1h5v5H1zM9 1h1v2H9zM12 1h1v1h-1zM16 1h1v2h-1zM19 1h1v1h-1zM23 1h5v5h-5zM2 2h3v3H2zM10 2h2v1h-2zM13 2h2v1h-2zM17 2h2v1h-2zM24 2h3v3h-3zM9 3h1v1H9zM12 3h1v1h-1zM16 3h1v1h-1zM19 3h1v1h-1zM8 4h2v1H8zM13 4h3v1h-3zM17 4h2v1h-2zM9 5h1v1H9zM12 5h1v1h-1zM16 5h1v1h-1zM19 5h1v1h-1zM8 6h1v1H8zM10 6h2v1h-2zM13 6h3v1h-3zM17 6h2v1h-2zM0 8h1v2H0zM2 8h2v1H2zM5 8h4v1H5zM10 8h2v1h-2zM13 8h1v1h-1zM15 8h1v1h-1zM17 8h2v1h-2zM20 8h2v1h-2zM24 8h1v1h-1zM27 8h2v1h-2zM4 9h1v1H4zM6 9h1v1H6zM9 9h1v1H9zM12 9h2v1h-2zM16 9h1v1h-1zM19 9h1v1h-1zM21 9h2v1h-2zM25 9h1v1h-1zM1 10h1v1H1zM3 10h3v1H3zM7 10h1v1H7zM10 10h1v1h-1zM12 10h2v1h-2zM15 10h2v1h-2zM19 10h3v1h-3zM23 10h3v1h-3zM27 10h2v1h-2zM0 11h1v1H0zM2 11h1v1H2zM4 11h2v1H4zM7 11h3v1H7zM11 11h1v1h-1zM14 11h1v1h-1zM16 11h2v1h-2zM19 11h1v1h-1zM21 11h1v1h-1zM23 11h1v1h-1zM25 11h4v1h-4zM1 12h2v1H1zM4 12h1v1H4zM6 12h1v1H6zM9 12h2v1H9zM12 12h1v1h-1zM14 12h3v1h-3zM18 12h1v1h-1zM20 12h3v1h-3zM24 12h1v1h-1zM26 12h1v1h-1zM0 13h1v1H0zM2 13h1v1H2zM4 13h1v1H4zM6 13h3v1H6zM10 13h1v1h-1zM12 13h5v1h-5zM18 13h1v1h-1zM20 13h2v1h-2zM23 13h3v1h-3zM27 13h2v1h-2zM1 14h1v1H1zM3 14h1v1H3zM5 14h1v1H5zM8 14h1v1H8zM11 14h1v1h-1zM13 14h1v1h-1zM15 14h2v1h-2zM18 14h3v1h-3zM22 14h2v1h-2zM25 14h1v1h-1zM27 14h2v1h-2zM0 15h3v1H0zM4 15h1v1H4zM6 15h1v1H6zM9 15h2v1H9zM12 15h2v1h-2zM15 15h1v1h-1zM17 15h4v1h-4zM22 15h1v1h-1zM24 15h2v1h-2zM27 15h2v1h-2zM1 16h1v1H1zM3 16h3v1H3zM7 16h2v1H7zM10 16h1v1h-1zM13 16h3v1h-3zM17 16h1v1h-1zM19 16h3v1h-3zM23 16h3v1h-3zM27 16h2v1h-2zM8 17h1v2H8zM10 17h2v1h-2zM13 17h1v1h-1zM15 17h1v1h-1zM17 17h2v1h-2zM20 17h2v1h-2zM24 17h1v1h-1zM27 17h2v1h-2zM0 18h1v1H0zM2 18h2v1H2zM5 18h3v1H5zM9 18h1v1H9zM12 18h2v1h-2zM16 18h1v1h-1zM19 18h1v1h-1zM21 18h2v1h-2zM25 18h1v1h-1zM0 19h2v1H0zM3 19h1v1H3zM5 19h1v1H5zM8 19h2v1H8zM11 19h1v1h-1zM13 19h1v1h-1zM15 19h3v1h-3zM19 19h1v1h-1zM21 19h1v1h-1zM23 19h1v1h-1zM25 19h4v1h-4zM1 20h1v1H1zM3 20h3v1H3zM7 20h1v1H7zM10 20h1v1h-1zM12 20h2v1h-2zM15 20h2v1h-2zM19 20h3v1h-3zM23 20h3v1h-3zM27 20h2v1h-2zM0 21h7v1H0zM8 21h1v1H8zM10 21h2v1h-2zM13 21h3v1h-3zM17 21h2v1h-2zM22 21h7v1h-7zM1 22h5v1H1zM9 22h1v2H9zM12 22h1v1h-1zM16 22h1v2h-1zM19 22h1v1h-1zM23 22h5v1h-5zM2 23h3v1H2zM10 23h2v1h-2zM13 23h2v1h-2zM17 23h2v1h-2zM24 23h3v1h-3zM8 24h2v1H8zM13 24h3v1h-3zM17 24h2v1h-2zM9 25h1v1H9zM12 25h1v1h-1zM16 25h1v1h-1zM19 25h1v1h-1zM8 26h1v1H8zM10 26h2v1h-2zM13 26h3v1h-3zM17 26h2v1h-2zM8 27h1v1H8zM10 27h2v1h-2zM13 27h3v1h-3zM17 27h2v1h-2zM8 28h1v1H8zM10 28h2v1h-2zM13 28h3v1h-3zM17 28h2v1h-2z"
                fill="#000"
              />
            </svg>
          </div>

          {/* Address Display */}
          <div className="w-full space-y-3">
            <div className="bg-muted text-muted-foreground rounded-lg border p-4 text-center font-mono text-sm leading-relaxed break-all">
              {walletAddress}
            </div>

            {/* Copy Button */}
            <Button
              className="w-full"
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
