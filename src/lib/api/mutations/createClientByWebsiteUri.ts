import { graphql } from '../graphql'

const CREATE_CLIENT_BY_WEBSITE_URI_MUTATION = graphql(`
  mutation CreateClientByWebsiteUri($websiteUri: Url!, $groupId: UUID) {
    registerClient(websiteUri: $websiteUri, groupId: $groupId) {
      balance
      clientId
      groupId
      name
      walletAddress
    }
  }
`)

export default CREATE_CLIENT_BY_WEBSITE_URI_MUTATION
