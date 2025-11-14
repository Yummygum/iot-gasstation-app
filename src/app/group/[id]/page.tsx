'use client'
import { useQuery } from '@apollo/client/react'
import { use } from 'react'

import GroupBudgetBar from '@/components/BudgetBar/GroupBudgetBar'
import GasChart from '@/components/Chart/GasChart'
import ClientTable from '@/components/ClientTable/ClientTable'
import GroupPageHeader from '@/components/GroupPageHeader'
import GET_GROUP from '@/lib/api/queries/getGroup'

interface GroupPageProps {
  params: Promise<{
    id: string
  }>
}

const GroupPage = ({ params }: GroupPageProps) => {
  const { id } = use(params)

  const { data, loading } = useQuery(GET_GROUP, {
    variables: {
      groupId: id
    }
  })

  return (
    <div>
      <GroupPageHeader isLoading={loading} />

      <section className="flex flex-col gap-10 p-4">
        {/* {data?.getGroup?.status && (
          <StatusNotifier variant={data?.getGroup?.status?.variant} />
        )} */}

        <GroupBudgetBar groupId={id} isLoading={loading} />

        <GasChart groupId={id} />

        <ClientTable groupId={id} groupName={data?.getGroup?.name} />
      </section>
    </div>
  )
}

export default GroupPage
