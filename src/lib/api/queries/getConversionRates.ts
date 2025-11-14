import { graphql } from '../graphql'

export const GET_CONVERSION_RATES = graphql(`
  query GetConversionRates {
    getConversionRates {
      eurToIot
      usdToIot
    }
  }
`)
