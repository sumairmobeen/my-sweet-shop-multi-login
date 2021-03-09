import Pictures from "./Pictures/logo.png"

import React, { Component } from "react";

import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/adminDashboard";
import LogoutButton from './components/logout.';
import { Navbar, Form, FormControl, Nav, Button } from 'react-bootstrap';
import { useGlobalState } from './context/globalContext'
// import AddProduct from "./components/AddProduct";






function App() {
  const globalState = useGlobalState();

  return (
    <>
      <Router>
        <nav>
          <Navbar bg="yellow" variant="red" style={{ height: '50px' }}>
            {(globalState.role === null) ?
              <>
                <Nav className="mr-auto">
                  <img src={Pictures}  width="80px" height="50px"></img>

                  <Nav.Link href="/"><Link to="/" className="text-white">Home</Link></Nav.Link>
                  <Nav.Link href="/login"><Link to="/login" className="text-white">Login</Link></Nav.Link>
                  <Nav.Link href="/signup"><Link to="/signup" className="text-white">Signup</Link></Nav.Link>
                  <Nav.Link href="/cart" ><Link to="/cart"  className="text-white"><i style={{float: 'right'}} class="fas fa-cart-plus"></i></Link></Nav.Link>
                  
                </Nav>
              </>
              : null}
            {(globalState.role === "user") ?
              <>
                <Nav className="mr-auto text-white">
                <img src={Pictures}  width="80px" height="50px"></img>
                  <Nav.Link href="/" ><Link to="/">Dashboard</Link></Nav.Link>
                  <Nav.Link href="/"><Link to="/profile">profile</Link></Nav.Link>
                  <Nav.Link href="/cart" ><Link to="/cart"  className="text-white"><i style={{float: 'right'}} class="fas fa-cart-plus"></i></Link></Nav.Link>
                </Nav>
                <Form inline>
                  <div className="logout">
                  <LogoutButton />
                  </div>
                </Form>
              </>
              : null}
       {(globalState.role === "admin") ?
              <>
                <Nav className="mr-auto text-white">
                <img src={Pictures}  width="80px" height="50px"></img>
                  <Nav.Link href="/" ><Link to="/" >Admin.Dashboard</Link></Nav.Link>
                  <Nav.Link href="/"><Link to="/profile">profile</Link></Nav.Link>
                  <div className="logbtn">
                  <Nav.Link href="/" ><Link to="/"><LogoutButton /></Link></Nav.Link>
                  </div>
                </Nav>
                
                {/* <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-info">Search</Button>
                  <LogoutButton />
                </Form> */}
              </>
              : null}

          </Navbar>

        </nav>


        <Switch>
          {(globalState.role === null) ?
            <>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>

              <Route path="/login">
                <Login />
              </Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </>
            : null}

          {(globalState.role === "user") ?
            <>
              <Route exact path="/">
                <Dashboard />
              </Route>

              <Route path="/home">
                <Home />
              </Route>


              <Route path="*">
                <Redirect to="/" />
              </Route>

            </>
            : null}

          {(globalState.role === "admin") ?
            <>
              <Route exact path="/">
                <AdminDashboard />
              </Route>
              <Route path="/home">
                <logout />
              </Route>

              <Route path="*">
                <Redirect to="/" />
              </Route>
            </>
            : null}




        </Switch>
      </Router>

    </>
  )


}

export default App;
























































// class App extends Component {

//   state = {
//     isOpen: false
//   };

//   toggleCollapse = () => {
//     this.setState({ isOpen: !this.state.isOpen });
//   }

//   render() {
//     return (
//       <>
//         <Router>
//           <MDBNavbar color="default-color" dark expand="md">
//             <MDBNavbarBrand>
//               <strong className="white-text">Navbar</strong>
//             </MDBNavbarBrand>
//             <MDBNavbarToggler onClick={this.toggleCollapse} />
//             <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
//               <MDBNavbarNav left>
//                 <MDBNavItem active>
//                   <MDBNavLink to="/">Home</MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBNavLink to="#!">Features</MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBNavLink to="#!">Pricing</MDBNavLink>
//                 </MDBNavItem>
//               </MDBNavbarNav>
//               <MDBNavbarNav right>
//                 <MDBNavItem>
//                   <MDBNavLink className="waves-effect waves-light" to="#!">
//                     <MDBIcon fab icon="twitter" />
//                   </MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBNavLink className="waves-effect waves-light" to="#!">
//                     <MDBIcon fab icon="google-plus-g" />
//                   </MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBNavLink to="/login">Login</MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBNavLink to="/signup">Signup</MDBNavLink>
//                 </MDBNavItem>
//               </MDBNavbarNav>
//             </MDBCollapse>
//           </MDBNavbar>

//           <Switch>
//             {(globalState.loginStatus === false) ?
//               <Route path="/">
//                 <Login />
//               </Route> :
//               <Route path="/">
//                 <Dashboard />
//               </Route>

//             }
//             <Route exact path="/home">
//               <Home />
//             </Route>
//             <Route path="/signup">
//               <Signup />
//             </Route>
//           </Switch>

//         </Router>
//       </>
//     );
//   }
// }