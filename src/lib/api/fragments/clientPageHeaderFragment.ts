import { graphql } from '../graphql'

const CLIENT_PAGE_HEADER_FRAGMENT = graphql(`
  fragment ClientPageHeaderFragment on GroupDto {
    name
    balance
  }
`)

export default CLIENT_PAGE_HEADER_FRAGMENT
