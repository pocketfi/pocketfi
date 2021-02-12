import {Category} from '../../types/Category'

export const RECEIVED_CATEGORIES = 'RECEIVED_CATEGORIES'
export const REQUEST_ERROR = 'REQUEST_ERROR'

export interface ReceivedCategories {
  type: typeof RECEIVED_CATEGORIES,
  categories: Category[]
}

export interface RequestError {
  type: typeof REQUEST_ERROR
  err: any
}

export type CategoryActionTypes =
  | ReceivedCategories
  | RequestError

export type AppActions = CategoryActionTypes;
