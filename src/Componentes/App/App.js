
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Home from "../Home/Home.js";
import InputValue from "../InputValue/InputValue.js";
import OutputValue from "../OutputValue/OutputValue.js";
import UserContext from "../../Contexts/UserContext.js";






export default function App(){
    const [user, setUser] = useState([]);
    return (
        <UserContext.Provider value={{user, setUser}}>
        <BrowserRouter>
		
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/sign-up/" element={<Register/>}/>
                <Route path="/Home/" element={<Home />}/>
                <Route path="/input/" element={<InputValue />}/>
                <Route path="/output/" element={<OutputValue />}/>
			</Routes>
		</BrowserRouter>
        </UserContext.Provider>
    )
}