import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import  './signup.css'
import axios from "axios";
import {
    useHistory
} from "react-router-dom";

const url = 'http://localhost:5000'
function Signup() {

    // const [email, setEmail] = useState('');
    // // const [errmessage, setErrmessage] = useState('');
    // var history = useHistory();
    // useEffect(() => {
    //     axios({
    //         method: 'post',
    //         url: url + '/auth/validemail',
    //         data: {
    //             email: email
    //         }, withCredentials: true
    //     }).then((response) => {
    //         if (response.data.status === 200) {
    //             if (response.data.isFound) {
    //                 setErrmessage("Email Already exit")
    //             }
    //             else {
    //                 setErrmessage("Email is Available")
    //             }
    //         } else {
    //             alert(response.data.message);
    //         }
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }, [email])
    function hanldsubmit(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: url + '/auth/signup',
            data: {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                password: document.getElementById('password').value
            }, withCredentials: true
        }).then((response) => {
            if (response.data.status === 200) {
                document.getElementById('show-result').innerHTML = response.data.message
            } else {
                // alert(response.data.message);
                document.getElementById('show-result').innerHTML = response.data.message
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    // function handleClick() {
    //     history.push("./Login")
    // }
    return (
        <div className="main">
        <div className="center">
            <MDBContainer>
                <MDBRow className="rowcenter">
                    <MDBCol md="6">
                        <form className="formcenter" onSubmit={hanldsubmit}>
                            <p className="h4 text-center mb-4">Sign up</p>
                            <label htmlFor="defaultFormRegisterNameEx" className="yello-text">
                                Your name
                             </label>
                            <input type="text" className="form-control" required id="name" placeholder="Your Name" />
                            <br />
                            <label htmlFor="defaultFormRegisterEmailEx" className="black-text" >
                                Your email
                            </label>
                            <input type="email" className="form-control" placeholder="Your Email" required id="email" />
                            {/* <h5 style={{ textAlign: "right" }}>{errmessage}</h5> */}
                            <label htmlFor="defaultFormRegisterConfirmEx" className="black-text">
                                Phone
                            </label>
                            <input type="text" className="form-control" required id="phone" placeholder="Enter Number" />
                            <br />
                            <label htmlFor="defaultFormRegisterPasswordEx" className="black-text" >
                                Your password
                            </label>
                            <input type="password" className="form-control" required id="password" placeholder="Enter Your Password" />
                            {/* <span style={{ cursor: "pointer", color: "blue" }} onClick={handleClick}>I Already have an account</span> */}
                            <div className="text-center mt-4">
                                <MDBBtn color="unique" type="submit">
                                    Register
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <center><span style={{ textAlign: "center", fontWeight: "bolder" }} id="show-result"></span></center>
        </div>
        </div>
    )
}

export default Signup;