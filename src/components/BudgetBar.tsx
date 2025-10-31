import { Button } from './ui/button'
import { Item, ItemActions, ItemContent } from './ui/item'
import { Separator } from './ui/separator'

const BudgetBar = () => {
  return (
    <Item
      className="rounded-2xl bg-linear-to-l from-sky-200/20 via-blue-200/20 to-indigo-300/20 p-8"
      variant="muted"
    >
      <ItemContent className="flex h-full flex-row items-stretch gap-10">
        <div className="flex flex-col items-start">
          <h2 className="text-muted-foreground text-xs uppercase">
            Current balance
          </h2>
          <p className="text-foreground text-lg font-normal">99,14</p>
        </div>

        <Separator orientation="vertical" />

        <div className="flex flex-col items-start">
          <h2 className="text-muted-foreground text-xs uppercase">
            Est. remaining transactions
          </h2>
          <p className="text-foreground text-lg font-normal">29572</p>
        </div>

        <Separator orientation="vertical" />

        <div className="flex flex-col items-start">
          <h2 className="text-muted-foreground text-xs uppercase">
            Est. date of depletion
          </h2>
          <p className="text-foreground text-lg font-normal">Nov 12, 2025</p>
        </div>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="default">
          Allocate budget
        </Button>
      </ItemActions>
    </Item>
  )
}

export default BudgetBar
