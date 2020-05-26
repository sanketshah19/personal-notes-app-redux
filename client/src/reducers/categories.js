const categoriesInitialState = []

const categoriesReducer = (state = categoriesInitialState, action) => {
    switch(action.type){
        case 'GET_CATEGORIES': {
            return [...action.payload]
        }
        case 'ADD_CATEGORY': {
            return [...state, action.payload]
        }
        case 'REMOVE_CATEGORY': {
            return [...state].filter(category => category._id !== action.payload)
        }
        default: {
            return [...state]
        }
    }
}

export default categoriesReducer