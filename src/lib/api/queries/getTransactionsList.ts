import { graphql, ResultOf, VariablesOf } from '../graphql'

// Note: The introspection file may need to be regenerated to recognize
// the query parameters. This query should work at runtime.
const GET_TRANSACTIONS_LIST = graphql(`
  query GetTransactionList($after: DateTime!, $before: DateTime!) {
    getTransactionList(after: $after, before: $before) {
      clientId
      clientName
      groupId
      timestamp
      transactionFee
      transactionFeeEur
      transactionFeeUsd
    }
  }
`)

export type GetTransactionsListQuery = ResultOf<typeof GET_TRANSACTIONS_LIST>
export type GetTransactionsListVariables = VariablesOf<
  typeof GET_TRANSACTIONS_LIST
>

export default GET_TRANSACTIONS_LIST
