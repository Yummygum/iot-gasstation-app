'use client'

import { useQuery } from '@apollo/client/react'

import DashboardBudgetBar from '@/components/BudgetBar/DashboardBudgetBar'
import GasChart from '@/components/Chart/GasChart'
import DashboardHeader from '@/components/DashboardHeader'
import IOTAAmount from '@/components/IOTAAmount'
import NotifyItem from '@/components/NotifyItem'
import SpendingSummary from '@/components/SpendingSummary/SpendingSummary'
import GET_SPONSOR_WALLET from '@/lib/api/queries/getSponsorWallet'

const Dashboard = () => {
  useQuery(GET_SPONSOR_WALLET)

  return (
    <div className="flex w-full flex-col gap-10 px-4 py-8">
      <DashboardHeader />

      <DashboardBudgetBar />

      <GasChart />

      <SpendingSummary />

      <NotifyItem
        className="max-w-md"
        onClick={() => {}}
        title="Mint.fun has spent more than usual today"
      >
        <p>
          Your average daily spend has been <IOTAAmount amount={100} /> over the
          past 30 days. Today, it has spent <IOTAAmount amount={10} />.
        </p>
      </NotifyItem>
    </div>
  )
}

export default Dashboard
