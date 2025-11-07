/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
    'Boolean': unknown;
    'ClientDto': { kind: 'OBJECT'; name: 'ClientDto'; fields: { 'balance': { name: 'balance'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'clientId': { name: 'clientId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null; }; } }; 'groupId': { name: 'groupId'; type: { kind: 'SCALAR'; name: 'UUID'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'walletAddress': { name: 'walletAddress'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'Float': unknown;
    'GroupDto': { kind: 'OBJECT'; name: 'GroupDto'; fields: { 'balance': { name: 'balance'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'groupId': { name: 'groupId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null; }; } }; 'members': { name: 'members'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null; }; }; }; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'ID': unknown;
    'Int': unknown;
    'MutationRoot': { kind: 'OBJECT'; name: 'MutationRoot'; fields: { 'addClientToGroup': { name: 'addClientToGroup'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'GroupDto'; ofType: null; }; } }; 'allocateFundsToGroup': { name: 'allocateFundsToGroup'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'GroupDto'; ofType: null; }; } }; 'createGroup': { name: 'createGroup'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'GroupDto'; ofType: null; }; } }; 'deleteGroup': { name: 'deleteGroup'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null; }; } }; 'registerClient': { name: 'registerClient'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'ClientDto'; ofType: null; }; } }; 'removeClient': { name: 'removeClient'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'UUID'; ofType: null; }; } }; 'removeClientFromGroup': { name: 'removeClientFromGroup'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'GroupDto'; ofType: null; }; } }; 'withdrawFundsFromGroup': { name: 'withdrawFundsFromGroup'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'GroupDto'; ofType: null; }; } }; }; };
    'QueryRoot': { kind: 'OBJECT'; name: 'QueryRoot'; fields: { 'getClient': { name: 'getClient'; type: { kind: 'OBJECT'; name: 'ClientDto'; ofType: null; } }; 'getClientList': { name: 'getClientList'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'ClientDto'; ofType: null; }; }; }; } }; 'getGroup': { name: 'getGroup'; type: { kind: 'OBJECT'; name: 'GroupDto'; ofType: null; } }; 'getGroupList': { name: 'getGroupList'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'GroupDto'; ofType: null; }; }; }; } }; 'getSponsorWallet': { name: 'getSponsorWallet'; type: { kind: 'OBJECT'; name: 'SponsorWalletDto'; ofType: null; } }; 'tokenBalance': { name: 'tokenBalance'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; }; };
    'SponsorWalletDto': { kind: 'OBJECT'; name: 'SponsorWalletDto'; fields: { 'address': { name: 'address'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'balance': { name: 'balance'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'sponsorWalletId': { name: 'sponsorWalletId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'String': unknown;
    'SubscriptionRoot': { kind: 'OBJECT'; name: 'SubscriptionRoot'; fields: { 'clientUpdates': { name: 'clientUpdates'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'ClientDto'; ofType: null; }; } }; 'groupUpdates': { name: 'groupUpdates'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'GroupDto'; ofType: null; }; } }; 'sponsorWalletUpdates': { name: 'sponsorWalletUpdates'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'SponsorWalletDto'; ofType: null; }; } }; 'tokenBalanceUpdates': { name: 'tokenBalanceUpdates'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'TokenBalanceUpdate'; ofType: null; }; } }; }; };
    'TokenBalanceUpdate': { kind: 'OBJECT'; name: 'TokenBalanceUpdate'; fields: { 'action': { name: 'action'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'balance': { name: 'balance'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'timestamp': { name: 'timestamp'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'UUID': unknown;
};

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: 'QueryRoot';
  mutation: 'MutationRoot';
  subscription: 'SubscriptionRoot';
  types: introspection_types;
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}