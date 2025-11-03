import { graphql } from 'gql.tada'

const CLIENT_PAGE_HEADER_FRAGMENT = graphql(`
  fragment ClientPageHeaderFragment on GroupDto {
    name
  }
`)

export default CLIENT_PAGE_HEADER_FRAGMENT
