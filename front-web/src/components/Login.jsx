import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './login.css'
import axios from 'axios';
import {
    useHistory
} from "react-router-dom";
import { useGlobalState, useGlobalStateUpdate } from './../context/globalContext'




const url = 'http://localhost:5000'
function Login() {
    const history = useHistory();

    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();

    function hanldlogin(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: url + '/auth/login',
            data: {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            }, withCredentials: true
        }).then((response) => {
            if (response.data.status === 200) {
                // alert(response.data.message)
                history.push("./Dashboard");

                setGlobalState(prev => {
                    return { ...prev, user: response.data.user, loginStatus: true, token: response.data.token }
                })
            } else {
                alert(response.data.message);
            }
        }).catch((error) => {
            console.log(error);
        });

    }
    return (
        <div className="main">
        <div className="logincenter">
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <form onSubmit={hanldlogin}>
                            <p className="h4 text-center mb-4">Sign in</p>
                            <label htmlFor="defaultFormLoginEmailEx" className="black-text">
                                Your email
                            </label>
                            <input type="email" id="email" className="form-control" placeholder="Enter Your Email" />
                            <br />
                            <label htmlFor="defaultFormLoginPasswordEx" className="black-text">
                                Your password
                            </label>
                            <input type="password" id="password" className="form-control" placeholder="Enter Your Password" />
                            <div className="text-center mt-4">
                                <MDBBtn color="indigo" type="submit">Login</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            {'===>' + JSON.stringify(globalState)}
        </div>
        </div>
        
    )
    
}


export default Login;


