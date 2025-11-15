'use client'

import { useTheme } from 'next-themes'
import { ComponentProps } from 'react'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <>
      <style global jsx>{`
        .toaster .toast {
          backdrop-filter: blur(12px) saturate(150%) !important;
          -webkit-backdrop-filter: blur(12px) saturate(150%) !important;
          background: rgba(255, 255, 255, 0.9) !important;
        }
        .dark .toaster .toast {
          background: rgba(0, 0, 0, 0.7) !important;
        }
        .toaster .toast[data-type='success'] [data-icon] {
          color: rgb(34, 197, 94) !important;
        }
        .toaster .toast[data-type='error'] [data-icon] {
          color: rgb(239, 68, 68) !important;
        }
        .toaster .toast[data-type='warning'] [data-icon] {
          color: rgb(249, 115, 22) !important;
        }
        .toaster .toast[data-type='info'] [data-icon] {
          color: rgb(59, 130, 246) !important;
        }
      `}</style>
      <Sonner
        className="toaster group"
        theme={theme as ToasterProps['theme']}
        toastOptions={{
          classNames: {
            toast:
              'group toast group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
            description: 'group-[.toast]:text-muted-foreground',
            actionButton:
              'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
            cancelButton:
              'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground'
          }
        }}
        {...props}
      />
    </>
  )
}

export { Toaster }
