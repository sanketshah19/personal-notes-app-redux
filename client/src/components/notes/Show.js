import React from 'react';
import axios from '../../config/axios';
import moment from 'moment';
import {Badge, Card, Container, Col, Row} from 'react-bootstrap';

export default class NotesShow extends React.Component{
    constructor(){
        super()
        this.state = {
            note: {}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`notes/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const note = response.data
            this.setState({note})
            // console.log(note)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    render(){
        return(
            <div><br/>
                <h2 className="text-center">Note Information</h2><br/>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col xs={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{this.state.note.title}<span>   </span>
                                        <span><Badge pill variant="primary">{this.state.note.categoryId ? this.state.note.categoryId.name : ''}</Badge></span>
                                    </Card.Title>
                                    <Card.Text>
                                        {this.state.note.description}
                                    </Card.Text>
                                    <Card.Link href={`/notes/edit/${this.state.note._id}`}>Edit</Card.Link>
                                    <Card.Link href="/notes">Back</Card.Link>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Created at {moment(this.state.note.createdAt).calendar()}</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}