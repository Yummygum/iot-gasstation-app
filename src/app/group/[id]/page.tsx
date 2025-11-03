'use client'
import { useSuspenseQuery } from '@apollo/client/react'
import { use } from 'react'

import BudgetBar from '@/components/BudgetBar/BudgetBar'
import GasChart from '@/components/Chart/GasChart'
import GroupPageHeader from '@/components/GroupPageHeader'
import GET_GROUP from '@/lib/api/queries/getGroup'

interface GroupPageProps {
  params: Promise<{
    id: string
  }>
}

const GroupPage = ({ params }: GroupPageProps) => {
  const { id } = use(params)

  useSuspenseQuery(GET_GROUP, {
    variables: {
      groupId: id
    }
  })

  return (
    <div>
      <GroupPageHeader />

      <section className="flex flex-col gap-10 p-6">
        <BudgetBar />

        <GasChart />
      </section>
    </div>
  )
}

export default GroupPage
