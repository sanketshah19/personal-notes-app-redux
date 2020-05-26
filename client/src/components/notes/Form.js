import React from 'react';
import {Link} from 'react-router-dom';
import axios from '../../config/axios'
import {Form, Button, Col, Row} from 'react-bootstrap';

export default class NotesForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: props.note ? props.note.title : '',
            description: props.note ? props.note.description : '',
            categoryId: props.note ? props.note.categoryId && props.note.categoryId._id : '',
            categories: []
        }
    }

    componentDidMount(){
        axios.get('/categories', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            // console.log(response)
            const categories = response.data
            this.setState({categories})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: this.state.title,
            description: this.state.description,
            categoryId: this.state.categoryId
        }
        this.props.handleSubmit(formData)
    }

    render(){
        // console.log('props', this.props.note)
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1">
                        Title
                        </Form.Label>
                        <Col sm="3">
                        <Form.Control type="text" value={this.state.title} onChange={this.handleChange} name="title" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="1">
                        Description
                        </Form.Label>
                        <Col sm="3">
                        <Form.Control as="textarea" rows="3" value={this.state.description} onChange={this.handleChange} name="description"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formGridState">
                        <Form.Label column sm="1">
                        Category
                        </Form.Label>
                        <Col sm="3">
                            <Form.Control as="select" value={this.state.categoryId} onChange={this.handleChange} name="categoryId">
                                <option value="">Select Category</option>
                                {
                                    this.state.categories.map((category) => {
                                        return(
                                            <option key={category._id} value={category._id}>{category.name}</option>
                                        )
                                    })
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Button variant="outline-primary mr-2" size="sm" type="submit">Submit</Button>
                    <Link to="/notes"><Button variant="outline-primary" size="sm">Back</Button></Link>
                </Form>
            </div>
        )
    }
}
