import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
import { Dao } from './dao'
import optimisticQueue from '../fragments/optimisticQueue'
import execution from '../fragments/execution'
import role from '../fragments/role'

export interface Daos {
  daos: Dao[]
}

const daos: DocumentNode = gql`
    query DAOS {
      daos {
        id
        address
        executions {
          ...Execution_execution
        }
        roles {
          ...Role_role
        }
        queues {
          ...OptimisticQueue_optimisticQueue
        }
      }
    }
    ${optimisticQueue}
    ${execution}
    ${role}
  `

export default daos
