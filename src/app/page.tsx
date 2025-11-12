'use client'
import BudgetBar from '@/components/BudgetBar/BudgetBar'
import GasChart from '@/components/Chart/GasChart'
import DashboardHeader from '@/components/DashboardHeader'
import IOTAAmount from '@/components/IOTAAmount'
import NotifyItem from '@/components/NotifyItem'
import SpendingSummary from '@/components/SpendingSummary/SpendingSummary'

const Dashboard = () => {
  return (
    <div className="flex w-full flex-col gap-10 px-4 py-8">
      <DashboardHeader />

      <BudgetBar />

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
