'use client'

import { HttpLink } from '@apollo/client'
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache
} from '@apollo/client-integration-nextjs'
import { PropsWithChildren } from 'react'

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    fetchOptions: {
      ...(process.env.NODE_ENV === 'development' ? { cache: 'no-store' } : {})
    }
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink
  })
}

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
