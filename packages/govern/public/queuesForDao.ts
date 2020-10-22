import { getConfiguration } from './configure'
import QueuesForDaoAction from '../internal/actions/QueuesForDaoAction'

/**
 * TODO: Define return type in promise
 *
 * @param {string} address
 *
 * @returns {Promise<any>}
 */
export default function queuesForDao(address: string): Promise<any> {
  return new QueuesForDaoAction(getConfiguration(), { address: address }).execute()
}
