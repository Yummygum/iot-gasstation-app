import { graphql } from '../graphql'

export const GET_IOTA_PRICE_QUERY = graphql(`
  query GetIotaPriceQuery {
    getIotaEurPrice
    getIotaUsdPrice
  }
`)
