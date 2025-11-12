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

  useQuery(GET_GROUP, {
    variables: {
      groupId: id
    }
  })

  return (
    <div>
      <GroupPageHeader />

      <section className="flex flex-col gap-10 p-4">
        <GroupBudgetBar groupId={id} />

        <GasChart groupId={id} />

        <ClientTable />
      </section>
    </div>
  )
}

export default GroupPage
