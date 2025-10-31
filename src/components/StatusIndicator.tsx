import { useMemo } from 'react'

import { cn } from '@/lib/utils'

interface StatusIndicatorProps {
  status: 'ok' | 'error' | 'warning'
}

const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  const color = useMemo(() => {
    switch (status) {
      case 'ok':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'warning':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }, [status])

  return (
    <span className="flex items-center gap-2">
      <span className={cn('size-1.5 rounded-full', color)} />
    </span>
  )
}

export default StatusIndicator
