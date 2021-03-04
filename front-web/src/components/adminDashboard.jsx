import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useGlobalState, useGlobalStateUpdate } from "./../context/globalContext";
import {
    useHistory
} from "react-router-dom";
import { Container, Form, Col, Button } from 'react-bootstrap'
// import './admin.css';






let url = 'http://localhost:5000'

function AdminDashboard() {

    const globalState = useGlobalState();
    // const setGlobalState = useGlobalStateUpdate();
    const productname = useRef();
    const price = useRef();
    const productimg = useRef();
    const activeStatus = useRef();
    const stock = useRef();
    const description = useRef();







    function handlsubmit(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: url + '/admindashboard',
            data: {
                productname: productname.current.value,
                price: price.current.value,
                productimage: productimg.current.value,
                activeStatus: activeStatus.current.value,
                stock: stock.current.value,
                description: description.current.value
            }, withCredentials: true
        }).then((response) => {
            if (response.data.status === 200) {
                alert(response.data.message)
            } else {
                alert(response.data.message);
            }
        }).catch((error) => {
            console.log(error);
        });


    }







    return (

        <div>
            <h1>Admin Dashboard</h1>
            <Container fluid="md">
                <div className="row justify-content-md-center">
                    <div className="col-md-6 form">
                        <Form onSubmit={handlsubmit} >
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="name" placeholder="Enter Name" ref={productname} required />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" placeholder="Price" ref={price} required />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control type="url" placeholder="Image Url" ref={productimg} required />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Active Status</Form.Label>
                                    <Form.Control type="name" placeholder="Active Status" ref={activeStatus} required />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control type="text" placeholder="Stock" ref={stock} required />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formGridAddress2">
                                <Form.Label>Description</Form.Label>
                                <Form.Control placeholder="Description" ref={description} required />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Add
                            </Button>
                        </Form>
                    </div>
                </div>
            </Container>
        </div>








    )
}

export default AdminDashboard;