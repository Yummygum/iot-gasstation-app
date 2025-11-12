'use client'

import { useQuery } from '@apollo/client/react'

import DashboardBudgetBar from '@/components/BudgetBar/DashboardBudgetBar'
import GasChart from '@/components/Chart/GasChart'
import ClientTable from '@/components/ClientTable/ClientTable'
import DashboardHeader from '@/components/DashboardHeader'
import IOTAAmount from '@/components/IOTAAmount'
import NotifyItem from '@/components/NotifyItem'
import SpendingSummary from '@/components/SpendingSummary/SpendingSummary'
import GET_CLIENT_LIST from '@/lib/api/queries/getClientList'
import GET_SPONSOR_WALLET from '@/lib/api/queries/getSponsorWallet'

const Dashboard = () => {
  const { data, loading } = useQuery(GET_SPONSOR_WALLET)
  const { data: clientsData, loading: clientLoading } =
    useQuery(GET_CLIENT_LIST)

  const isLoading = loading || clientLoading
  const totalClients = clientsData?.getClientList?.length ?? 0

  return (
    <div className="flex w-full flex-col gap-10 px-4 py-8">
      <DashboardHeader
        isLoading={isLoading}
        sponsorWalletId={data?.getSponsorWallet?.sponsorWalletId}
        totalClients={totalClients}
      />

      <DashboardBudgetBar
        isLoading={isLoading}
        sponsorWalletId={data?.getSponsorWallet?.sponsorWalletId}
      />

      <GasChart />

      <ClientTable />

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
