'use client'
import { useQuery } from '@apollo/client/react'
import { use } from 'react'

import GroupBudgetBar from '@/components/BudgetBar/GroupBudgetBar'
import GasChart from '@/components/Chart/GasChart'
import ClientTable from '@/components/ClientTable/ClientTable'
import GroupPageHeader from '@/components/GroupPageHeader'
import StatusNotifier from '@/components/StatusNotifier'
import GET_GROUP from '@/lib/api/queries/getGroup'

interface GroupPageProps {
  params: Promise<{
    id: string
  }>
}

const GroupPage = ({ params }: GroupPageProps) => {
  const { id } = use(params)

  const { data, loading, dataState } = useQuery(GET_GROUP, {
    variables: {
      groupId: id
    }
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
