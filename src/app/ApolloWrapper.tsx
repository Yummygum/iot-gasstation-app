'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache
} from '@apollo/client-integration-nextjs'
import { BaseHttpLink } from '@apollo/client/link/http'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { OperationTypeNode } from 'graphql'
import { createClient } from 'graphql-ws'
import { PropsWithChildren } from 'react'

const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_WS_URL, NODE_ENV } = process.env

// Shared options for the HTTP and WebSocket connections
const linkOptions: BaseHttpLink.Shared.Options = {
  // headers: {
  //   'X-API-Key': NEXT_PUBLIC_API_KEY ?? ''
  // },
  fetchOptions: {
    ...(NODE_ENV === 'development' ? { cache: 'no-store' } : {})
  }
}

function makeClient() {
  if (!NEXT_PUBLIC_API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not set')
  }

  if (!NEXT_PUBLIC_WS_URL) {
    throw new Error('NEXT_PUBLIC_WS_URL is not set')
  }

  // Initialize the links for the HTTP and WebSocket connections
  const httpLink = new HttpLink({
    uri: NEXT_PUBLIC_API_URL,
    ...linkOptions
  })

  const wsLink = new GraphQLWsLink(
    createClient({
      url: NEXT_PUBLIC_WS_URL,
      ...linkOptions
    })
  )

  /* The split function takes three parameters:
   **
   ** * A function that's called for each operation to execute
   ** * The Link to use for an operation if the function returns a "truthy" value
   ** * The Link to use for an operation if the function returns a "falsy" value
   */
  const splitLink = ApolloLink.split(
    ({ operationType }) => {
      return operationType === OperationTypeNode.SUBSCRIPTION
    },
    wsLink,
    httpLink
  )

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
  })
}

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
