import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalState, useGlobalStateUpdate } from "./../context/globalContext";
import {
    useHistory
} from "react-router-dom";
import LogoutButton from "./logout.";
import './Dashboard.css'

function Dashboard() {

    let url = 'http://localhost:5000'
    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();
    const [product, setproducts] = useState([]);
    let history = useHistory()




    


    return (
        
        <>
        <div className="main">
            {/* <LogoutButton />            */}
            <h1 style={{color: 'green'}}>WELCOME INFINTY-TASTE</h1>
            <div className="row1">

                {globalState.user ?
                    <div>
                        <h2>{globalState.user.name}</h2>
                    </div> : null}
            </div>


            {'===>' + JSON.stringify(globalState)}

            </div>

        </>
        
    )

                }
export default Dashboard;