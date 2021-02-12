import {Dispatch} from 'redux'
import axios from 'axios'
import {Category} from '../types/Category'
import {AppActions, RECEIVED_CATEGORIES, REQUEST_ERROR} from './types/CategoryActionTypes'
import {tokenConfig} from './authActions'
import {AppState} from '../store'

export const receivedCategories = (categories: Category[]): AppActions => ({
  type: RECEIVED_CATEGORIES,
  categories: categories
})

export const requestError = (err: any): AppActions => ({
  type: REQUEST_ERROR,
  err: err
})

export const getCategories = (categoryName: string) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {

  axios
    .post('/api/search/category', {category: categoryName}, tokenConfig(getState))
    .then(res => {
        dispatch(receivedCategories(res.data))
      }
    )
    .catch(err => {
      dispatch(requestError(err))
    })
}