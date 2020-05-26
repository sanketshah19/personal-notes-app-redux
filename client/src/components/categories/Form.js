import React from 'react';
import {Link} from 'react-router-dom';
import {Form, Button, Col, Row} from 'react-bootstrap';

export default class CategoriesForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: props.name ? props.name : ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const name = this.state.name
        this.props.handleSubmit(name)
    }

    render(){
        console.log('props', this.props)
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm="1">
                    Category
                    </Form.Label>
                    <Col sm="3">
                    <Form.Control type="text" value={this.state.name} onChange={this.handleChange} name="name" />
                    </Col>
                </Form.Group>
                <Button variant="outline-primary mr-2" size="sm" type="submit">Submit</Button>
                <Link to="/categories"><Button variant="outline-primary" size="sm">Back</Button></Link>
                </Form>
            </div>
        )
    }
}