import type { DocumentNode } from '@apollo/client'

import { useEffect } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface UseApolloSubscriptionParams<TData, TSubscription> {
  subscribeToMore: (..._args: any[]) => () => void
  document: DocumentNode
  onUpdate: (_prev: TData, _subscriptionData: TSubscription) => TData
}

/**
 * Generic Apollo subscription hook
 * Handles subscription setup and teardown with minimal boilerplate.
 */
export function useApolloSubscription<
  TData extends Record<string, any>,
  TSubscription extends Record<string, any>
>({
  subscribeToMore,
  document,
  onUpdate
}: UseApolloSubscriptionParams<TData, TSubscription>) {
  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document,
      updateQuery: (
        prev: any,
        { subscriptionData }: { subscriptionData: { data?: TSubscription } }
      ) => {
        if (!subscriptionData.data) {
          return prev
        }

        return onUpdate(prev as TData, subscriptionData.data)
      }
    })

    return () => unsubscribe()
  }, [subscribeToMore, document, onUpdate])
}
/* eslint-enable @typescript-eslint/no-explicit-any */
