import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import userReducer from '../reducers/user'
import categoriesReducer from '../reducers/categories'
import singleCategoryReducer from '../reducers/singleCategory'

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        categories: categoriesReducer,
        singleCategory: singleCategoryReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore