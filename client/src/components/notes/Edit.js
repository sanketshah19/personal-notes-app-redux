import React from 'react';
import axios from '../../config/axios';
import swal from 'sweetalert';
import NotesForm from './Form';

export default class NotesEdit extends React.Component{
    constructor(){
        super()
        this.state = {
            note: {}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/notes/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const note = response.data
            this.setState({note})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleSubmit = (formData) => {
        // console.log(formData)
        const id = this.props.match.params.id
        axios.put(`/notes/${id}`, formData, {
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
                swal("Success!", "Notes Information Updated!", "success");
            }
        })
    }
    
    render(){
        return(
            <div>
                <br/>
                <h2>Update Information</h2><br/>
                { Object.keys(this.state.note).length !== 0 && <NotesForm note={this.state.note} handleSubmit={this.handleSubmit}/>}
            </div>
        )
    }
}