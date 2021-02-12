import {REQUEST_ERROR} from '../actions/types/RateActionTypes'
import {CategoryActionTypes, RECEIVED_CATEGORIES} from '../actions/types/CategoryActionTypes'
import {Category} from '../types/Category'

interface CategoriesState {
  categories: Category[],
  err: any
}

const initialState: CategoriesState = {
  categories: [],
  err: ''
}

export default (state = initialState, action: CategoryActionTypes) => {
  switch (action.type) {
    case RECEIVED_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    case REQUEST_ERROR:
      return {
        ...state,
        err: action.err

      }
    default:
      return state
  }
}
