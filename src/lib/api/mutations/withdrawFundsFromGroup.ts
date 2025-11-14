import { graphql, VariablesOf } from '../graphql'

const WITHDRAW_FUNDS_FROM_GROUP_MUTATION = graphql(`
  mutation WithdrawFundsFromGroup($amount: Int!, $groupId: UUID!) {
    funds: withdrawFundsFromGroup(amount: $amount, groupId: $groupId) {
      balance
      groupId
      members
      name
    }
  }
`)

export type WithdrawFundsFromGroupMutationVariables = VariablesOf<
  typeof WITHDRAW_FUNDS_FROM_GROUP_MUTATION
>

export default WITHDRAW_FUNDS_FROM_GROUP_MUTATION
