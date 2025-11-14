import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Skeleton } from './ui/skeleton'

type StatusNotifierProps = {
  variant?: 'action' | 'warning' | 'success'
  title?: string
  description?: string
  className?: string
  isLoading?: boolean
}

const StatusNotifier = ({
  variant = 'success',
  title,
  description,
  className,
  isLoading
}: StatusNotifierProps) => {
  const config = {
    action: {
      icon: AlertTriangle,
      title: title || 'Action required',
      description:
        description ||
        `Group is running out of budget. Please top up to make sure they are still allowed to spend.`,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500'
    },
    warning: {
      icon: AlertCircle,
      title: title || 'Warning',
      description: description || 'There has been an unusual spike detected.',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500'
    },
    success: {
      icon: CheckCircle,
      title: title || 'No issues',
      description: description || 'No issues detected at this time!',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500'
    }
  }

  const {
    icon: Icon,
    title: statusTitle,
    description: statusDescription,
    bgColor,
    iconColor
  } = config[variant]

  return (
    <div className={cn('border-border rounded-xl border p-3', className)}>
      <div className="flex flex-col gap-3">
        <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          Status
        </p>
        {isLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <div
            className={cn('flex items-center gap-3 rounded-lg p-2', bgColor)}
          >
            <Icon className={cn('size-4 shrink-0', iconColor)} />
            <p className="text-foreground text-xl font-medium">{statusTitle}</p>
          </div>
        )}
        <div className="text-muted-foreground text-sm leading-tight">
          {isLoading ? <Skeleton className="h-5 w-3/4" /> : statusDescription}
        </div>
      </div>
    </div>
  )
}

export default StatusNotifier
