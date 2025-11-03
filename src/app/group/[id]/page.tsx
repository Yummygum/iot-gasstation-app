import BudgetBar from '@/components/BudgetBar/BudgetBar'
import GasChart from '@/components/Chart/GasChart'
import ClientPageHeader from '@/components/GroupPageHeader'
import { valueRenderer } from '@/components/ValueRenderer'

const GroupPage = () => {
  return (
    <div className="relative gap-3">
      <ClientPageHeader
        description={`${valueRenderer(12712)} Total transactions`}
        title="Hogeschool van Amsterdam"
      />

      <section className="flex flex-col gap-5 p-6">
        <BudgetBar />

        <GasChart />
      </section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default GroupPage
