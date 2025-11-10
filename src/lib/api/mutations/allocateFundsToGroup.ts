import { graphql, VariablesOf } from '../graphql'

const ALLOCATE_FUNDS_TO_GROUP_MUTATION = graphql(`
  mutation AllocateFundsToGroup($amount: Int!, $groupId: UUID!) {
    allocateFundsToGroup(amount: $amount, groupId: $groupId) {
      balance
      groupId
      name
      members
    }
  }
`)

export type AllocateFundsToGroupMutationVariables = VariablesOf<
  typeof ALLOCATE_FUNDS_TO_GROUP_MUTATION
>

export default ALLOCATE_FUNDS_TO_GROUP_MUTATION
