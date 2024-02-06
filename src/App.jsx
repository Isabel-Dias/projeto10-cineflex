import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [movieName, setMovieName] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatNames, setSeatNames] = useState([]);

  movieName;
  sessionDate;
  sessionTime;
  seatNames;

  const config = {
    headers: {
      Authorization: "L1tQ0XU9l1CXlCYOvMtwa96V",
    },
  };

  useEffect(() => {
    const promise = axios.get(
      `${import.meta.env.VITE_API_URL}movies`,
      config
    );

    promise.then((p) => {
      setMovies(p.data);
    });
  }, []);

  return (
    <BrowserRouter>
      <NavContainer>CINEFLEX</NavContainer>
      <Routes>
        <Route path="/" element={<HomePage movies={movies} />} />
        <Route
          path="/assentos/:idSessao"
          element={
            <SeatsPage
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              seatNames={seatNames}
              setSeatNames={setSeatNames}
              name={name}
              setName={setName}
              cpf={cpf}
              setCpf={setCpf}
              setMovieName={setMovieName}
              setSessionDate={setSessionDate}
              setSessionTime={setSessionTime}
            />
          }
        />
        <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
        <Route
          path="/sucesso"
          element={
            <SuccessPage
              name={name}
              cpf={cpf}
              movieName={movieName}
              sessionDate={sessionDate}
              sessionTime={sessionTime}
              seatNames={seatNames}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cfd9;
  color: #e8833a;
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  position: fixed;
  top: 0;
  left: 0;
  a {
    text-decoration: none;
    color: #e8833a;
  }
`;
