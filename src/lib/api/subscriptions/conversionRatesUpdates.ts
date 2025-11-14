import { graphql, ResultOf } from '../graphql'

const CONVERSION_RATES_SUBSCRIPTION = graphql(`
  subscription GetConversionRatesSubscription {
    conversionRateUpdates {
      eurToIot
      usdToIot
    }
  }
`)

export type ConversionRatesSubscription = ResultOf<
  typeof CONVERSION_RATES_SUBSCRIPTION
>

export default CONVERSION_RATES_SUBSCRIPTION
