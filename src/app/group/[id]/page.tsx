import BudgetBar from '@/components/BudgetBar/BudgetBar'
import GasChart from '@/components/Chart/GasChart'
import ClientPageHeader from '@/components/ClientPageHeader'

const GroupPage = () => {
  return (
    <div>
      <ClientPageHeader />

      <section className="flex flex-col gap-10 p-6">
        <BudgetBar />

        <GasChart />
      </section>
    </div>
  )
}

export default GroupPage
