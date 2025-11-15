'use client'

import { useQuery } from '@apollo/client/react'

import DashboardBudgetBar from '@/components/BudgetBar/DashboardBudgetBar'
import GasChart from '@/components/Chart/GasChart'
import ClientTable from '@/components/ClientTable/ClientTable'
import DashboardHeader from '@/components/DashboardHeader'
import SpendingSummary from '@/components/SpendingSummary/SpendingSummary'
import { useApolloSubscription } from '@/hooks/useApolloSubscription'
import GET_CLIENT_LIST from '@/lib/api/queries/getClientList'
import GET_SPONSOR_WALLET from '@/lib/api/queries/getSponsorWallet'
import CLIENT_UPDATES_SUBSCRIPTION from '@/lib/api/subscriptions/clientUpdates'
import SPONSOR_WALLET_UPDATES_SUBSCRIPTION from '@/lib/api/subscriptions/sponsorWalletUpdates'

const Dashboard = () => {
  const {
    data,
    loading,
    subscribeToMore: sponsorWalletSubscribeToMore
  } = useQuery(GET_SPONSOR_WALLET)
  const {
    data: clientsData,
    loading: clientLoading,
    subscribeToMore: clientSubscribeToMore
  } = useQuery(GET_CLIENT_LIST)

  useApolloSubscription({
    subscribeToMore: clientSubscribeToMore,
    document: CLIENT_UPDATES_SUBSCRIPTION,
    onUpdate: (prev, update) => ({
      ...prev,
      ...update.clientUpdates
    })
  })

  useApolloSubscription({
    subscribeToMore: sponsorWalletSubscribeToMore,
    document: SPONSOR_WALLET_UPDATES_SUBSCRIPTION,
    onUpdate: (prev, update) => ({
      ...prev,
      ...update.sponsorWalletUpdates
    })
  })

  const isLoading = loading || clientLoading
  const totalClients = clientsData?.getClientList?.length ?? 0

  return (
    <div className="flex w-full flex-col gap-10 px-4 py-8">
      <DashboardHeader
        isLoading={isLoading}
        totalClients={totalClients}
        walletData={data?.getSponsorWallet}
      />

      <DashboardBudgetBar
        isLoading={isLoading}
        walletData={data?.getSponsorWallet}
      />

      <GasChart />

      <ClientTable />

      <SpendingSummary
        isLoading={isLoading}
        walletData={data?.getSponsorWallet}
      />

      {/* <NotifyItem
        className="max-w-md"
        onClick={() => {}}
        title="Mint.fun has spent more than usual today"
      >
        <p>
          Your average daily spend has been <IOTAAmount amount={100} /> over the
          past 30 days. Today, it has spent <IOTAAmount amount={10} />.
        </p>
      </NotifyItem> */}
    </div>
  )
}

export default Dashboard
