import React from 'react';
import axios from '../../config/axios'
import {Card, Container, Col, Row} from 'react-bootstrap'

export default class CategoriesShow extends React.Component{
    constructor(){
        super()
        this.state = {
            category: {}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/categories/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            // console.log(response)
            const category = response.data
            this.setState({category})
        })
        .catch((err) => {
            console.log(err)
        })
    }


    render(){
        return(
            <div><br/>
                <h2>Category Information</h2><br/>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col xs={6}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Category:</Card.Title>
                                    <Card.Text>{this.state.category.name}</Card.Text>
                                    <Card.Link href={`/categories/edit/${this.props.match.params.id}`}>Edit</Card.Link>
                                    <Card.Link href="/categories">Back</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}