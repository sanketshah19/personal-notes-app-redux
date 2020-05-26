import axios from '../config/axios'
import swal from 'sweetalert'

export const loginUser = (user) => {
    return {
        type: 'LOGIN_USER',
        payload: user
    }
}

export const logoutUser = () => {
    return {
        type: 'LOGOUT_USER'
    }
}

export const startRegisterUser = (formData, props) => {
    return (dispatch) => {
        axios.post('/users/register' , formData)
        .then((response) => {
            if(response.data.hasOwnProperty('errmsg')){
                swal("Oops!", `${response.data.errmsg}`, "error");
            }else if(response.data.hasOwnProperty('errors')){
                swal("Oops!", `${response.data.message}`, "error");
            }
            else{
                swal("Success!", "User Registered!", "success");
                props.history.push('/users/login')
            }
        })
        .catch((err) => {
            alert(err)
        })
    }
}

export const startLoginUser = (formData, props) => {
    return (dispatch) => {
        axios.post('/users/login', formData)
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                // alert(response.data.errors)
                swal("Oops!", `${response.data.errors}`, "error");
            }else{
                swal("Success!", "Login Successfully!", "success");
                const token = response.data.token
                localStorage.setItem('authToken', token)
                props.history.push('/')
                dispatch(loginUser(response.data.user))
            }
        })
        .catch((err) => {
            alert(err)
        })
    }
}

export const startLogoutUser = () => {
    return (dispatch) => {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              axios.delete('/users/logout', {
                    headers: {
                      'x-auth': localStorage.getItem('authToken')
                    }
                  })
                  .then((response) => {
                    swal("Successfully Logout!", {
                        icon: "success",
                    })
                    dispatch(logoutUser())
                    setTimeout(() => {
                        localStorage.removeItem('authToken')
                        window.location.href = "/"
                    }, 500);
                  })
            }
          });
    }
}