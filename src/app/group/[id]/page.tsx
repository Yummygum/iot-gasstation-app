'use client'
import { useQuery } from '@apollo/client/react'
import { use } from 'react'

import GroupBudgetBar from '@/components/BudgetBar/GroupBudgetBar'
import GasChart from '@/components/Chart/GasChart'
import ClientTable from '@/components/ClientTable/ClientTable'
import GroupPageHeader from '@/components/GroupPageHeader'
import StatusNotifier from '@/components/StatusNotifier'
import { useApolloSubscription } from '@/hooks/useApolloSubscription'
import GET_GROUP from '@/lib/api/queries/getGroup'
import GROUP_UPDATES_SUBSCRIPTION from '@/lib/api/subscriptions/groupUpdates'

interface GroupPageProps {
  params: Promise<{
    id: string
  }>
}

const GroupPage = ({ params }: GroupPageProps) => {
  const { id } = use(params)

  const { data, loading, dataState, subscribeToMore } = useQuery(GET_GROUP, {
    variables: {
      groupId: id
    }
  })

  useApolloSubscription({
    subscribeToMore,
    document: GROUP_UPDATES_SUBSCRIPTION,
    onUpdate: (prev, update) => ({
      ...prev,
      ...update.groupUpdates
    })
  })

  const isLoading = loading || dataState !== 'complete'

  return (
    <div>
      <GroupPageHeader isLoading={isLoading} />

      <section className="flex flex-col gap-10 p-4 pt-0">
        <StatusNotifier
          isLoading={isLoading}
          variant={
            data?.getGroup?.status?.variant as
              | 'action'
              | 'warning'
              | 'success'
              | undefined
          }
        />

        <GroupBudgetBar groupId={id} isLoading={isLoading} />

        <GasChart groupId={id} />

        <ClientTable groupId={id} groupName={data?.getGroup?.name} />
      </section>
    </div>
  )
}

export default GroupPage
