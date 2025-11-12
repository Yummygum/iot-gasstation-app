import { initGraphQLTada } from 'gql.tada'

import { introspection } from './graphql-env'

export const graphql = initGraphQLTada<{
  introspection: introspection
  scalars: {
    Boolean: boolean
    DateTime: string
    Float: number
    ID: string
    Int: number
    String: string
    UUID: string
    Url: string
  }
}>()

export { readFragment } from 'gql.tada'
export type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada'
