import axios from '../config/axios'
import swal from 'sweetalert'

export const getCategories = (categories) => {
    return {
        type: 'GET_CATEGORIES',
        payload: categories
    }
}

export const addCategory = (category) => {
    return {
        type: 'ADD_CATEGORY',
        payload: category
    }
}

export const singleCategory = (category) => {
    return {
        type: 'SINGLE_CATEGORY',
        payload: category
    }
}

export const removeCategory = (id) => {
    return {
        type: 'REMOVE_CATEGORY',
        payload: id
    }
}

export const startGetCategories = () => {
    return (dispatch) => {
        axios.get('/categories', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const categories = response.data
            dispatch(getCategories(categories))
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const starAddCategory = (name, props) => {
    return (dispatch) => {
        axios.post('/categories', {name}, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                // alert(response.data.message)
                swal("Oops!", `${response.data.message}`, "error");
            }else{
                swal("Success!", "New Category Added!", "success");
                props.history.push('/categories')
                dispatch(addCategory(response.data))
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const startSingleCategory = (id) => {
    return (dispatch) => {
        axios.get(`/categories/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const name = response.data.name
            dispatch(singleCategory(name))
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const startRemoveCategory = (id) => {
    return (dispatch) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this category!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`/categories/${id}`,{
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
                .then((response) => {
                    if(response.data.hasOwnProperty('errors')){
                        alert(response.data.message)
                    }else{
                        dispatch(removeCategory(id))
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
              swal("Poof! Category has been deleted!", {
                icon: "success",
              })
            } else {
              swal("Category is safe!");
            }
          });
    }
}