import React from 'react';
import axios from '../../config/axios';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import moment from 'moment';
import {Badge, Button, Card, CardColumns} from 'react-bootstrap';

export default class NotesList extends React.Component{
    constructor(){
        super()
        this.state = {
            notes: []
        }
    }

    componentDidMount(){
        axios.get('/notes', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            // console.log(response)
            const notes = response.data
            this.setState({notes})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    handleRemove(id){
        // console.log(id)

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this note!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`/notes/${id}`, {
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
                .then((response) => {
                    if(response.data.hasOwnProperty('errors')){
                        alert(response.data.message)
                    }else{
                        const notes = this.state.notes.filter(note => note._id !== id)
                        this.setState({notes})
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
              swal("Poof! Your note has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your note is safe!");
            }
          });
    }

    render(){
        return(
            <div><br/>
                <h2>Listing Notes - {this.state.notes.length} <Link to="/notes/new"><Button>Add Note</Button></Link></h2><hr/>
                <CardColumns className="row">
                {
                    this.state.notes.map((note) => {
                        return(
                            <span className="col-md-4">
                                <Card key={note._id}>
                                <Card.Body>
                                    <Card.Title>{note.title}<span>   </span>
                                    <span><Badge pill variant="primary">{note.categoryId ? note.categoryId.name : ''}</Badge></span></Card.Title>
                                <Card.Text>
                                    {note.description}
                                </Card.Text>
                                <Card.Link href={`/notes/${note._id}`}>Show</Card.Link>
                                <Card.Link href={`/notes/edit/${note._id}`}>Edit</Card.Link>
                                <Card.Link href="#" onClick={() => this.handleRemove(note._id)}>Remove</Card.Link>
                                <Card.Link href={`/notes/copy/${note._id}`}>Copy</Card.Link>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Created at {moment(note.createdAt).calendar()}</small>
                                </Card.Footer>
                            </Card>
                            </span>
                        )
                    })
                }
                </CardColumns>
            </div>
        )
    }
}