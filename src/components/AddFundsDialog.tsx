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
          <div className="flex size-[198px] items-center justify-center rounded-lg p-4">
            <svg
              fill="none"
              height="198"
              viewBox="0 0 198 198"
              width="198"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M66 12H60V18H66V12Z" fill="#171D26" />
              <path d="M72 12H66V18H72V12Z" fill="#171D26" />
              <path d="M78 12H72V18H78V12Z" fill="#171D26" />
              <path d="M96 12H90V18H96V12Z" fill="#171D26" />
              <path d="M102 12H96V18H102V12Z" fill="#171D26" />
              <path d="M108 12H102V18H108V12Z" fill="#171D26" />
              <path d="M126 12H120V18H126V12Z" fill="#171D26" />
              <path d="M66 18H60V24H66V18Z" fill="#171D26" />
              <path d="M72 18H66V24H72V18Z" fill="#171D26" />
              <path d="M78 18H72V24H78V18Z" fill="#171D26" />
              <path d="M84 18H78V24H84V18Z" fill="#171D26" />
              <path d="M90 18H84V24H90V18Z" fill="#171D26" />
              <path d="M96 18H90V24H96V18Z" fill="#171D26" />
              <path d="M102 18H96V24H102V18Z" fill="#171D26" />
              <path d="M108 18H102V24H108V18Z" fill="#171D26" />
              <path d="M120 18H114V24H120V18Z" fill="#171D26" />
              <path d="M126 18H120V24H126V18Z" fill="#171D26" />
              <path d="M132 18H126V24H132V18Z" fill="#171D26" />
              <path d="M138 18H132V24H138V18Z" fill="#171D26" />
              <path d="M66 24H60V30H66V24Z" fill="#171D26" />
              <path d="M72 24H66V30H72V24Z" fill="#171D26" />
              <path d="M78 24H72V30H78V24Z" fill="#171D26" />
              <path d="M84 24H78V30H84V24Z" fill="#171D26" />
              <path d="M96 24H90V30H96V24Z" fill="#171D26" />
              <path d="M102 24H96V30H102V24Z" fill="#171D26" />
              <path d="M138 24H132V30H138V24Z" fill="#171D26" />
              <path d="M72 30H66V36H72V30Z" fill="#171D26" />
              <path d="M78 30H72V36H78V30Z" fill="#171D26" />
              <path d="M84 30H78V36H84V30Z" fill="#171D26" />
              <path d="M90 30H84V36H90V30Z" fill="#171D26" />
              <path d="M102 30H96V36H102V30Z" fill="#171D26" />
              <path d="M108 30H102V36H108V30Z" fill="#171D26" />
              <path d="M120 30H114V36H120V30Z" fill="#171D26" />
              <path d="M132 30H126V36H132V30Z" fill="#171D26" />
              <path d="M138 30H132V36H138V30Z" fill="#171D26" />
              <path d="M66 36H60V42H66V36Z" fill="#171D26" />
              <path d="M72 36H66V42H72V36Z" fill="#171D26" />
              <path d="M78 36H72V42H78V36Z" fill="#171D26" />
              <path d="M90 36H84V42H90V36Z" fill="#171D26" />
              <path d="M96 36H90V42H96V36Z" fill="#171D26" />
              <path d="M108 36H102V42H108V36Z" fill="#171D26" />
              <path d="M120 36H114V42H120V36Z" fill="#171D26" />
              <path d="M126 36H120V42H126V36Z" fill="#171D26" />
              <path d="M132 36H126V42H132V36Z" fill="#171D26" />
              <path d="M72 42H66V48H72V42Z" fill="#171D26" />
              <path d="M96 42H90V48H96V42Z" fill="#171D26" />
              <path d="M102 42H96V48H102V42Z" fill="#171D26" />
              <path d="M120 42H114V48H120V42Z" fill="#171D26" />
              <path d="M138 42H132V48H138V42Z" fill="#171D26" />
              <path d="M66 48H60V54H66V48Z" fill="#171D26" />
              <path d="M78 48H72V54H78V48Z" fill="#171D26" />
              <path d="M90 48H84V54H90V48Z" fill="#171D26" />
              <path d="M102 48H96V54H102V48Z" fill="#171D26" />
              <path d="M114 48H108V54H114V48Z" fill="#171D26" />
              <path d="M126 48H120V54H126V48Z" fill="#171D26" />
              <path d="M138 48H132V54H138V48Z" fill="#171D26" />
              <path d="M72 54H66V60H72V54Z" fill="#171D26" />
              <path d="M90 54H84V60H90V54Z" fill="#171D26" />
              <path d="M102 54H96V60H102V54Z" fill="#171D26" />
              <path d="M18 60H12V66H18V60Z" fill="#171D26" />
              <path d="M36 60H30V66H36V60Z" fill="#171D26" />
              <path d="M42 60H36V66H42V60Z" fill="#171D26" />
              <path d="M48 60H42V66H48V60Z" fill="#171D26" />
              <path d="M54 60H48V66H54V60Z" fill="#171D26" />
              <path d="M60 60H54V66H60V60Z" fill="#171D26" />
              <path d="M66 60H60V66H66V60Z" fill="#171D26" />
              <path d="M72 60H66V66H72V60Z" fill="#171D26" />
              <path d="M90 60H84V66H90V60Z" fill="#171D26" />
              <path d="M96 60H90V66H96V60Z" fill="#171D26" />
              <path d="M102 60H96V66H102V60Z" fill="#171D26" />
              <path d="M108 60H102V66H108V60Z" fill="#171D26" />
              <path d="M114 60H108V66H114V60Z" fill="#171D26" />
              <path d="M120 60H114V66H120V60Z" fill="#171D26" />
              <path d="M144 60H138V66H144V60Z" fill="#171D26" />
              <path d="M162 60H156V66H162V60Z" fill="#171D26" />
              <path d="M174 60H168V66H174V60Z" fill="#171D26" />
              <path d="M180 60H174V66H180V60Z" fill="#171D26" />
              <path d="M186 60H180V66H186V60Z" fill="#171D26" />
              <path d="M18 66H12V72H18V66Z" fill="#171D26" />
              <path d="M30 66H24V72H30V66Z" fill="#171D26" />
              <path d="M66 66H60V72H66V66Z" fill="#171D26" />
              <path d="M90 66H84V72H90V66Z" fill="#171D26" />
              <path d="M102 66H96V72H102V66Z" fill="#171D26" />
              <path d="M120 66H114V72H120V66Z" fill="#171D26" />
              <path d="M132 66H126V72H132V66Z" fill="#171D26" />
              <path d="M144 66H138V72H144V66Z" fill="#171D26" />
              <path d="M156 66H150V72H156V66Z" fill="#171D26" />
              <path d="M162 66H156V72H162V66Z" fill="#171D26" />
              <path d="M174 66H168V72H174V66Z" fill="#171D26" />
              <path d="M180 66H174V72H180V66Z" fill="#171D26" />
              <path d="M24 72H18V78H24V72Z" fill="#171D26" />
              <path d="M30 72H24V78H30V72Z" fill="#171D26" />
              <path d="M42 72H36V78H42V72Z" fill="#171D26" />
              <path d="M48 72H42V78H48V72Z" fill="#171D26" />
              <path d="M54 72H48V78H54V72Z" fill="#171D26" />
              <path d="M72 72H66V78H72V72Z" fill="#171D26" />
              <path d="M78 72H72V78H78V72Z" fill="#171D26" />
              <path d="M102 72H96V78H102V72Z" fill="#171D26" />
              <path d="M120 72H114V78H120V72Z" fill="#171D26" />
              <path d="M126 72H120V78H126V72Z" fill="#171D26" />
              <path d="M144 72H138V78H144V72Z" fill="#171D26" />
              <path d="M156 72H150V78H156V72Z" fill="#171D26" />
              <path d="M174 72H168V78H174V72Z" fill="#171D26" />
              <path d="M36 78H30V84H36V78Z" fill="#171D26" />
              <path d="M42 78H36V84H42V78Z" fill="#171D26" />
              <path d="M66 78H60V84H66V78Z" fill="#171D26" />
              <path d="M72 78H66V84H72V78Z" fill="#171D26" />
              <path d="M78 78H72V84H78V78Z" fill="#171D26" />
              <path d="M102 78H96V84H102V78Z" fill="#171D26" />
              <path d="M108 78H102V84H108V78Z" fill="#171D26" />
              <path d="M120 78H114V84H120V78Z" fill="#171D26" />
              <path d="M138 78H132V84H138V78Z" fill="#171D26" />
              <path d="M144 78H138V84H144V78Z" fill="#171D26" />
              <path d="M150 78H144V84H150V78Z" fill="#171D26" />
              <path d="M168 78H162V84H168V78Z" fill="#171D26" />
              <path d="M186 78H180V84H186V78Z" fill="#171D26" />
              <path d="M18 84H12V90H18V84Z" fill="#171D26" />
              <path d="M24 84H18V90H24V84Z" fill="#171D26" />
              <path d="M30 84H24V90H30V84Z" fill="#171D26" />
              <path d="M36 84H30V90H36V84Z" fill="#171D26" />
              <path d="M54 84H48V90H54V84Z" fill="#171D26" />
              <path d="M78 84H72V90H78V84Z" fill="#171D26" />
              <path d="M90 84H84V90H90V84Z" fill="#171D26" />
              <path d="M96 84H90V90H96V84Z" fill="#171D26" />
              <path d="M102 84H96V90H102V84Z" fill="#171D26" />
              <path d="M126 84H120V90H126V84Z" fill="#171D26" />
              <path d="M138 84H132V90H138V84Z" fill="#171D26" />
              <path d="M150 84H144V90H150V84Z" fill="#171D26" />
              <path d="M156 84H150V90H156V84Z" fill="#171D26" />
              <path d="M186 84H180V90H186V84Z" fill="#171D26" />
              <path d="M30 90H24V96H30V90Z" fill="#171D26" />
              <path d="M84 90H78V96H84V90Z" fill="#171D26" />
              <path d="M90 90H84V96H90V90Z" fill="#171D26" />
              <path d="M120 90H114V96H120V90Z" fill="#171D26" />
              <path d="M126 90H120V96H126V90Z" fill="#171D26" />
              <path d="M144 90H138V96H144V90Z" fill="#171D26" />
              <path d="M150 90H144V96H150V90Z" fill="#171D26" />
              <path d="M162 90H156V96H162V90Z" fill="#171D26" />
              <path d="M168 90H162V96H168V90Z" fill="#171D26" />
              <path d="M174 90H168V96H174V90Z" fill="#171D26" />
              <path d="M180 90H174V96H180V90Z" fill="#171D26" />
              <path d="M186 90H180V96H186V90Z" fill="#171D26" />
              <path d="M24 96H18V102H24V96Z" fill="#171D26" />
              <path d="M48 96H42V102H48V96Z" fill="#171D26" />
              <path d="M54 96H48V102H54V96Z" fill="#171D26" />
              <path d="M60 96H54V102H60V96Z" fill="#171D26" />
              <path d="M66 96H60V102H66V96Z" fill="#171D26" />
              <path d="M78 96H72V102H78V96Z" fill="#171D26" />
              <path d="M102 96H96V102H102V96Z" fill="#171D26" />
              <path d="M108 96H102V102H108V96Z" fill="#171D26" />
              <path d="M120 96H114V102H120V96Z" fill="#171D26" />
              <path d="M132 96H126V102H132V96Z" fill="#171D26" />
              <path d="M138 96H132V102H138V96Z" fill="#171D26" />
              <path d="M144 96H138V102H144V96Z" fill="#171D26" />
              <path d="M150 96H144V102H150V96Z" fill="#171D26" />
              <path d="M156 96H150V102H156V96Z" fill="#171D26" />
              <path d="M174 96H168V102H174V96Z" fill="#171D26" />
              <path d="M186 96H180V102H186V96Z" fill="#171D26" />
              <path d="M18 102H12V108H18V102Z" fill="#171D26" />
              <path d="M24 102H18V108H24V102Z" fill="#171D26" />
              <path d="M42 102H36V108H42V102Z" fill="#171D26" />
              <path d="M60 102H54V108H60V102Z" fill="#171D26" />
              <path d="M72 102H66V108H72V102Z" fill="#171D26" />
              <path d="M78 102H72V108H78V102Z" fill="#171D26" />
              <path d="M96 102H90V108H96V102Z" fill="#171D26" />
              <path d="M102 102H96V108H102V102Z" fill="#171D26" />
              <path d="M114 102H108V108H114V102Z" fill="#171D26" />
              <path d="M126 102H120V108H126V102Z" fill="#171D26" />
              <path d="M156 102H150V108H156V102Z" fill="#171D26" />
              <path d="M162 102H156V108H162V102Z" fill="#171D26" />
              <path d="M174 102H168V108H174V102Z" fill="#171D26" />
              <path d="M186 102H180V108H186V102Z" fill="#171D26" />
              <path d="M42 108H36V114H42V108Z" fill="#171D26" />
              <path d="M54 108H48V114H54V108Z" fill="#171D26" />
              <path d="M90 108H84V114H90V108Z" fill="#171D26" />
              <path d="M108 108H102V114H108V108Z" fill="#171D26" />
              <path d="M132 108H126V114H132V108Z" fill="#171D26" />
              <path d="M138 108H132V114H138V108Z" fill="#171D26" />
              <path d="M168 108H162V114H168V108Z" fill="#171D26" />
              <path d="M18 114H12V120H18V114Z" fill="#171D26" />
              <path d="M36 114H30V120H36V114Z" fill="#171D26" />
              <path d="M66 114H60V120H66V114Z" fill="#171D26" />
              <path d="M72 114H66V120H72V114Z" fill="#171D26" />
              <path d="M120 114H114V120H120V114Z" fill="#171D26" />
              <path d="M126 114H120V120H126V114Z" fill="#171D26" />
              <path d="M132 114H126V120H132V114Z" fill="#171D26" />
              <path d="M162 114H156V120H162V114Z" fill="#171D26" />
              <path d="M174 114H168V120H174V114Z" fill="#171D26" />
              <path d="M180 114H174V120H180V114Z" fill="#171D26" />
              <path d="M18 120H12V126H18V120Z" fill="#171D26" />
              <path d="M24 120H18V126H24V120Z" fill="#171D26" />
              <path d="M30 120H24V126H30V120Z" fill="#171D26" />
              <path d="M54 120H48V126H54V120Z" fill="#171D26" />
              <path d="M60 120H54V126H60V120Z" fill="#171D26" />
              <path d="M72 120H66V126H72V120Z" fill="#171D26" />
              <path d="M78 120H72V126H78V120Z" fill="#171D26" />
              <path d="M96 120H90V126H96V120Z" fill="#171D26" />
              <path d="M102 120H96V126H102V120Z" fill="#171D26" />
              <path d="M114 120H108V126H114V120Z" fill="#171D26" />
              <path d="M126 120H120V126H126V120Z" fill="#171D26" />
              <path d="M132 120H126V126H132V120Z" fill="#171D26" />
              <path d="M144 120H138V126H144V120Z" fill="#171D26" />
              <path d="M150 120H144V126H150V120Z" fill="#171D26" />
              <path d="M168 120H162V126H168V120Z" fill="#171D26" />
              <path d="M186 120H180V126H186V120Z" fill="#171D26" />
              <path d="M18 126H12V132H18V126Z" fill="#171D26" />
              <path d="M24 126H18V132H24V126Z" fill="#171D26" />
              <path d="M42 126H36V132H42V126Z" fill="#171D26" />
              <path d="M48 126H42V132H48V126Z" fill="#171D26" />
              <path d="M60 126H54V132H60V126Z" fill="#171D26" />
              <path d="M66 126H60V132H66V126Z" fill="#171D26" />
              <path d="M72 126H66V132H72V126Z" fill="#171D26" />
              <path d="M78 126H72V132H78V126Z" fill="#171D26" />
              <path d="M84 126H78V132H84V126Z" fill="#171D26" />
              <path d="M96 126H90V132H96V126Z" fill="#171D26" />
              <path d="M108 126H102V132H108V126Z" fill="#171D26" />
              <path d="M114 126H108V132H114V126Z" fill="#171D26" />
              <path d="M132 126H126V132H132V126Z" fill="#171D26" />
              <path d="M144 126H138V132H144V126Z" fill="#171D26" />
              <path d="M150 126H144V132H150V126Z" fill="#171D26" />
              <path d="M156 126H150V132H156V126Z" fill="#171D26" />
              <path d="M162 126H156V132H162V126Z" fill="#171D26" />
              <path d="M168 126H162V132H168V126Z" fill="#171D26" />
              <path d="M174 126H168V132H174V126Z" fill="#171D26" />
              <path d="M18 132H12V138H18V132Z" fill="#171D26" />
              <path d="M24 132H18V138H24V132Z" fill="#171D26" />
              <path d="M30 132H24V138H30V132Z" fill="#171D26" />
              <path d="M48 132H42V138H48V132Z" fill="#171D26" />
              <path d="M54 132H48V138H54V132Z" fill="#171D26" />
              <path d="M72 132H66V138H72V132Z" fill="#171D26" />
              <path d="M78 132H72V138H78V132Z" fill="#171D26" />
              <path d="M90 132H84V138H90V132Z" fill="#171D26" />
              <path d="M96 132H90V138H96V132Z" fill="#171D26" />
              <path d="M120 132H114V138H120V132Z" fill="#171D26" />
              <path d="M132 132H126V138H132V132Z" fill="#171D26" />
              <path d="M138 132H132V138H138V132Z" fill="#171D26" />
              <path d="M144 132H138V138H144V132Z" fill="#171D26" />
              <path d="M150 132H144V138H150V132Z" fill="#171D26" />
              <path d="M156 132H150V138H156V132Z" fill="#171D26" />
              <path d="M162 132H156V138H162V132Z" fill="#171D26" />
              <path d="M168 132H162V138H168V132Z" fill="#171D26" />
              <path d="M174 132H168V138H174V132Z" fill="#171D26" />
              <path d="M180 132H174V138H180V132Z" fill="#171D26" />
              <path d="M66 138H60V144H66V138Z" fill="#171D26" />
              <path d="M84 138H78V144H84V138Z" fill="#171D26" />
              <path d="M96 138H90V144H96V138Z" fill="#171D26" />
              <path d="M114 138H108V144H114V138Z" fill="#171D26" />
              <path d="M120 138H114V144H120V138Z" fill="#171D26" />
              <path d="M126 138H120V144H126V138Z" fill="#171D26" />
              <path d="M138 138H132V144H138V138Z" fill="#171D26" />
              <path d="M162 138H156V144H162V138Z" fill="#171D26" />
              <path d="M168 138H162V144H168V138Z" fill="#171D26" />
              <path d="M66 144H60V150H66V144Z" fill="#171D26" />
              <path d="M96 144H90V150H96V144Z" fill="#171D26" />
              <path d="M108 144H102V150H108V144Z" fill="#171D26" />
              <path d="M114 144H108V150H114V144Z" fill="#171D26" />
              <path d="M132 144H126V150H132V144Z" fill="#171D26" />
              <path d="M138 144H132V150H138V144Z" fill="#171D26" />
              <path d="M150 144H144V150H150V144Z" fill="#171D26" />
              <path d="M162 144H156V150H162V144Z" fill="#171D26" />
              <path d="M168 144H162V150H168V144Z" fill="#171D26" />
              <path d="M66 150H60V156H66V150Z" fill="#171D26" />
              <path d="M72 150H66V156H72V150Z" fill="#171D26" />
              <path d="M78 150H72V156H78V150Z" fill="#171D26" />
              <path d="M90 150H84V156H90V150Z" fill="#171D26" />
              <path d="M96 150H90V156H96V150Z" fill="#171D26" />
              <path d="M114 150H108V156H114V150Z" fill="#171D26" />
              <path d="M120 150H114V156H120V150Z" fill="#171D26" />
              <path d="M132 150H126V156H132V150Z" fill="#171D26" />
              <path d="M138 150H132V156H138V150Z" fill="#171D26" />
              <path d="M162 150H156V156H162V150Z" fill="#171D26" />
              <path d="M180 150H174V156H180V150Z" fill="#171D26" />
              <path d="M186 150H180V156H186V150Z" fill="#171D26" />
              <path d="M66 156H60V162H66V156Z" fill="#171D26" />
              <path d="M84 156H78V162H84V156Z" fill="#171D26" />
              <path d="M90 156H84V162H90V156Z" fill="#171D26" />
              <path d="M96 156H90V162H96V156Z" fill="#171D26" />
              <path d="M108 156H102V162H108V156Z" fill="#171D26" />
              <path d="M114 156H108V162H114V156Z" fill="#171D26" />
              <path d="M132 156H126V162H132V156Z" fill="#171D26" />
              <path d="M138 156H132V162H138V156Z" fill="#171D26" />
              <path d="M144 156H138V162H144V156Z" fill="#171D26" />
              <path d="M150 156H144V162H150V156Z" fill="#171D26" />
              <path d="M156 156H150V162H156V156Z" fill="#171D26" />
              <path d="M162 156H156V162H162V156Z" fill="#171D26" />
              <path d="M168 156H162V162H168V156Z" fill="#171D26" />
              <path d="M66 162H60V168H66V162Z" fill="#171D26" />
              <path d="M90 162H84V168H90V162Z" fill="#171D26" />
              <path d="M96 162H90V168H96V162Z" fill="#171D26" />
              <path d="M102 162H96V168H102V162Z" fill="#171D26" />
              <path d="M114 162H108V168H114V162Z" fill="#171D26" />
              <path d="M120 162H114V168H120V162Z" fill="#171D26" />
              <path d="M126 162H120V168H126V162Z" fill="#171D26" />
              <path d="M132 162H126V168H132V162Z" fill="#171D26" />
              <path d="M138 162H132V168H138V162Z" fill="#171D26" />
              <path d="M144 162H138V168H144V162Z" fill="#171D26" />
              <path d="M156 162H150V168H156V162Z" fill="#171D26" />
              <path d="M180 162H174V168H180V162Z" fill="#171D26" />
              <path d="M78 168H72V174H78V168Z" fill="#171D26" />
              <path d="M96 168H90V174H96V168Z" fill="#171D26" />
              <path d="M114 168H108V174H114V168Z" fill="#171D26" />
              <path d="M144 168H138V174H144V168Z" fill="#171D26" />
              <path d="M156 168H150V174H156V168Z" fill="#171D26" />
              <path d="M162 168H156V174H162V168Z" fill="#171D26" />
              <path d="M174 168H168V174H174V168Z" fill="#171D26" />
              <path d="M180 168H174V174H180V168Z" fill="#171D26" />
              <path d="M186 168H180V174H186V168Z" fill="#171D26" />
              <path d="M84 174H78V180H84V174Z" fill="#171D26" />
              <path d="M96 174H90V180H96V174Z" fill="#171D26" />
              <path d="M108 174H102V180H108V174Z" fill="#171D26" />
              <path d="M144 174H138V180H144V174Z" fill="#171D26" />
              <path d="M156 174H150V180H156V174Z" fill="#171D26" />
              <path d="M168 174H162V180H168V174Z" fill="#171D26" />
              <path d="M174 174H168V180H174V174Z" fill="#171D26" />
              <path d="M186 174H180V180H186V174Z" fill="#171D26" />
              <path d="M66 180H60V186H66V180Z" fill="#171D26" />
              <path d="M84 180H78V186H84V180Z" fill="#171D26" />
              <path d="M90 180H84V186H90V180Z" fill="#171D26" />
              <path d="M120 180H114V186H120V180Z" fill="#171D26" />
              <path d="M126 180H120V186H126V180Z" fill="#171D26" />
              <path d="M132 180H126V186H132V180Z" fill="#171D26" />
              <path d="M138 180H132V186H138V180Z" fill="#171D26" />
              <path d="M150 180H144V186H150V180Z" fill="#171D26" />
              <path d="M162 180H156V186H162V180Z" fill="#171D26" />
              <path d="M168 180H162V186H168V180Z" fill="#171D26" />
              <path
                d="M47.7 12H18.3H12V18.3V47.7V54H18.3H47.7H54V47.7V18.3V12H47.7ZM47.7 47.7H18.3V18.3H47.7V47.7Z"
                fill="#171D26"
              />
              <path
                d="M179.7 12H150.3H144V18.3V47.7V54H150.3H179.7H186V47.7V18.3V12H179.7ZM179.7 47.7H150.3V18.3H179.7V47.7Z"
                fill="#171D26"
              />
              <path
                d="M47.7 144H18.3H12V150.3V179.7V186H18.3H47.7H54V179.7V150.3V144H47.7ZM47.7 179.7H18.3V150.3H47.7V179.7Z"
                fill="#171D26"
              />
              <path d="M42 24H24V42H42V24Z" fill="#171D26" />
              <path d="M174 24H156V42H174V24Z" fill="#171D26" />
              <path d="M42 156H24V174H42V156Z" fill="#171D26" />
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
