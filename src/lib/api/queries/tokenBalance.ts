import { graphql, ResultOf } from '../graphql'

const TOKEN_BALANCE = graphql(`
  query TokenBalance {
    tokenBalance
  }
`)
export type TokenBalanceQuery = ResultOf<typeof TOKEN_BALANCE>
export default TOKEN_BALANCE
