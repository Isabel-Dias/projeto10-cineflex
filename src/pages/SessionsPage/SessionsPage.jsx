import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const params = useParams();
  const { movieId } = params;

  const config = {
    headers: {
      Authorization: "L1tQ0XU9l1CXlCYOvMtwa96V",
    },
  };
  useEffect(() => {
    const promise = axios.get(
      `${import.meta.env.VITE_API_URL}movies/${movieId}/showtimes`,
      config
    );

    promise.then((p) => {
      setSessions(p.data);
    });
  }, []);

  return (
    <PageContainer>
      Selecione o horário
      <div>
        {sessions?.days?.map((session) => (
          <SessionContainer key={session.id}>
            {session.weekday} - {session.date}
            <ButtonsContainer>
              <Link to={`/assentos/${session.showtimes[0].id}`}>
                <button key={session.showtimes[0].id}>
                  {session.showtimes[0].name}
                </button>
              </Link>
              <Link to={`/assentos/${session.showtimes[1].id}`}>
                <button key={session.showtimes[1].id}>
                  {session.showtimes[1].name}
                </button>
              </Link>
            </ButtonsContainer>
          </SessionContainer>
        ))}
      </div>
      <FooterContainer>
        <div>
          <img src={sessions.posterURL} alt="poster" />
        </div>
        <div>
          <p>{sessions.title}</p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
`;
const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  button {
    margin-right: 20px;
  }
  a {
    text-decoration: none;
  }
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;
