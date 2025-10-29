'use client'

import { ReactNode } from 'react'

import { Button } from './button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './dialog'

export interface ModalAction {
  label: string
  onClick?: () => void
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  disabled?: boolean
  isLoading?: boolean
  closeOnClick?: boolean
}

export interface ModalProps {
  trigger?: ReactNode
  title?: string
  description?: string
  children?: ReactNode
  actions?: ModalAction[]
  isOpen?: boolean
  onOpenChange?: (_isOpen: boolean) => void
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full mx-4'
}

export const Modal = ({
  trigger,
  title,
  description,
  children,
  actions = [],
  isOpen,
  onOpenChange,
  size = 'md',
  className
}: ModalProps) => {
  const content = (
    <DialogContent className={`${sizeClasses[size]} ${className || ''}`}>
      {(title || description) && (
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
      )}

      {children && <div className="py-4">{children}</div>}

      {actions.length > 0 && (
        <DialogFooter>
          {actions.map((action, index) => (
            <ActionButton action={action} key={index} />
          ))}
        </DialogFooter>
      )}
    </DialogContent>
  )

  if (trigger) {
    return (
      <Dialog onOpenChange={onOpenChange} open={isOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        {content}
      </Dialog>
    )
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      {content}
    </Dialog>
  )
}

const ActionButton = ({ action }: { action: ModalAction }) => {
  const button = (
    <Button
      className={action.isLoading ? 'opacity-50' : ''}
      disabled={action.disabled || action.isLoading}
      onClick={action.onClick}
      variant={action.variant || 'default'}
    >
      {action.isLoading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {action.label}
    </Button>
  )

  if (action.closeOnClick !== false) {
    return <DialogClose asChild>{button}</DialogClose>
  }

  return button
}

// Convenience components for common modal patterns
export const ConfirmModal = ({
  trigger,
  title = 'Are you sure?',
  description,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'destructive',
  isLoading = false,
  ...props
}: Omit<ModalProps, 'actions'> & {
  onConfirm?: () => void
  onCancel?: () => void
  confirmLabel?: string
  cancelLabel?: string
  confirmVariant?: ModalAction['variant']
  isLoading?: boolean
}) => {
  const actions: ModalAction[] = [
    {
      label: cancelLabel,
      variant: 'outline',
      onClick: onCancel
    },
    {
      label: confirmLabel,
      variant: confirmVariant,
      onClick: onConfirm,
      isLoading,
      closeOnClick: !isLoading
    }
  ]

  return (
    <Modal
      actions={actions}
      description={description}
      title={title}
      trigger={trigger}
      {...props}
    />
  )
}

export const InfoModal = ({
  trigger,
  title,
  description,
  onClose,
  closeLabel = 'Close',
  ...props
}: Omit<ModalProps, 'actions'> & {
  onClose?: () => void
  closeLabel?: string
}) => {
  const actions: ModalAction[] = [
    {
      label: closeLabel,
      onClick: onClose
    }
  ]

  return (
    <Modal
      actions={actions}
      description={description}
      title={title}
      trigger={trigger}
      {...props}
    />
  )
}
