import { UserIcon } from 'lucide-react'

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty'
import Header from '@/components/ui/header'

const Dashboard = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <Header />

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UserIcon />
          </EmptyMedia>
          <EmptyTitle>No clients</EmptyTitle>
          <EmptyDescription>No clients found</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <button>Add client</button>
        </EmptyContent>
      </Empty>
    </main>
  )
}

export default Dashboard
