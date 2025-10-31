'use client'
import { useEffect, useState } from 'react'

import { quickHash } from '@/lib/quickHash'

import CurrencyConverter from '../CurrencyConverter'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Item, ItemActions, ItemContent } from '../ui/item'
import { Skeleton } from '../ui/skeleton'
import BudgetBarItem from './BudgetBarItem'

const BudgetBar = () => {
  const [loading, setLoading] = useState(true)

  const values = [
    {
      title: 'Current balance',
      value: 99.26
    },
    {
      title: 'Est. remaining transactions',
      value: 2929
    },
    {
      title: 'Est. date of running out',
      value: new Date('2025-11-21')
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [])

  return (
    <>
      <Dialog>
        <Item
          className="rounded-2xl bg-linear-to-l from-sky-200/20 via-blue-200/20 to-indigo-300/20 p-8"
          variant="muted"
        >
          <ItemContent className="flex h-full flex-row items-stretch gap-10">
            {!loading &&
              values.map((value, idx) => (
                <BudgetBarItem
                  isLast={idx === values.length - 1}
                  key={quickHash(value.title)}
                  title={value.title}
                  value={value.value}
                />
              ))}

            {loading &&
              Array.from({ length: 3 }).map((_, idx) => (
                <div
                  className="flex w-full flex-col items-start gap-x-10 gap-y-2"
                  key={quickHash(`skeleton-${idx}`)}
                >
                  <Skeleton
                    className="bg-primary/10 h-4 w-5/6"
                    key={`${idx}-1`}
                  />
                  <Skeleton
                    className="bg-primary/10 h-7 w-2/3"
                    key={`${idx}-2`}
                  />
                </div>
              ))}
          </ItemContent>
          <ItemActions>
            <DialogTrigger asChild>
              <Button disabled={loading} size="sm" variant="default">
                Allocate budget
              </Button>
            </DialogTrigger>
          </ItemActions>

          <DialogContent>
            <form>
              <DialogHeader className="mb-5">
                <DialogTitle>Add funds to your account</DialogTitle>
                <DialogClose />
              </DialogHeader>

              <CurrencyConverter />

              <Button className="mt-10 w-full">
                Add funds through personal wallet
              </Button>
            </form>
          </DialogContent>
        </Item>
      </Dialog>
    </>
  )
}

export default BudgetBar
