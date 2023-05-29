import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function App() {
    const [movies, setMovies] = useState([]);
    
    
    const config = {
        headers: {
            "Authorization": "L1tQ0XU9l1CXlCYOvMtwa96V"
        }
    }
    
    useEffect(() => {
		const promise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies", config);

		promise.then(p => {
			setMovies(p.data)
		});
	}, []); 


    return (
        <>
            <BrowserRouter>
                <NavContainer>CINEFLEX</NavContainer>
                <Routes>
                    <Route path='/' element={<HomePage movies={movies} />}/>
                    <Route path='/assentos/:idSessao' element={<SeatsPage />}/>
                    <Route path='/sessoes/:idFilme' element={<SessionsPage />}/>
                    <Route path='/sucesso' element={<SuccessPage />}/>
                </Routes>
            </BrowserRouter>  
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    left: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
