import { graphql, VariablesOf } from '../graphql'

const UPDATE_SPONSOR_WALLET_MUTATION = graphql(`
  mutation UpdateSponsorWallet($input: UpdateSponsorWalletInput!) {
    updateSponsorWallet(input: $input) {
      sponsorWalletId
      address
      balance
      name
      logoUri
    }
  }
`)

export type UpdateSponsorWalletMutationVariables = VariablesOf<
  typeof UPDATE_SPONSOR_WALLET_MUTATION
>

export default UPDATE_SPONSOR_WALLET_MUTATION
