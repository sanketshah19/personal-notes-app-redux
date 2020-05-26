import React from 'react';
import axios from '../../config/axios';
import swal from 'sweetalert';
import NotesForm from './Form';

export default class NotesEdit extends React.Component{
    
    handleSubmit = (formData) => {
        // console.log(formData)
        axios.post('/notes', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                // alert(response.data.message)
                swal("Oops!", `${response.data.message}`, "error");
            }else{
                this.props.history.push('/notes')
                swal("Success!", "New note added!", "success");
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    render(){
        return(
            <div><br/>
                <h2>Add Note</h2><br/>
                <NotesForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}