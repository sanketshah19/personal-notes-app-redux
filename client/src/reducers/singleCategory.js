const categoryInitialState = {}

const singleCategoryReducer = (state = categoryInitialState, action) => {
    switch(action.type){
        case 'SINGLE_CATEGORY': {
            return action.payload
        }
        default: {
            return {...state}
        }
    }
}

export default singleCategoryReducer