import styled from "styled-components"
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SeatsPage() {
    const [seats, setSeats] = useState([]);
    const params = useParams();
    const { idSessao } = params;
    const [selectedSeats, setSelectedSeats] = useState([]);

    function selectSeats(selectedSeatID) {
        
        let newSeats = [];

        if (!selectedSeats.includes(selectedSeatID)) {
            newSeats = [...selectedSeats, selectedSeatID]
            setSelectedSeats(newSeats)
        }

        seats.seats.forEach(seat => {
            if (seat.id == selectedSeatID && seat.isAvailable == true) {
                seat.isAvailable = 'selected'
            } else if (seat.id == selectedSeatID && seat.isAvailable == 'selected') {
                seat.isAvailable = true;
                newSeats = [...selectedSeats]
                newSeats.splice(seat.id);
                setSelectedSeats(newSeats);
            }
        })
    }

    const config = {
        headers: {
            "Authorization": "L1tQ0XU9l1CXlCYOvMtwa96V"
        }
    }
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`, config);

        promise.then(p => {
            setSeats(p.data)
        });

    }, []);



    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
                {seats?.seats?.map(seat => (
                    <SeatItem key={seat.id} onClick={() => { selectSeats(seat.id) }}
                        color={seat.isAvailable == true ? "#C3CFD9" : seat.isAvailable == false ? "#FBE192" : "#1AAE9E"}
                        border={seat.isAvailable == true ? "#808F9D" : seat.isAvailable == false ? "#F7C52B" : "#0E7D71"}
                    >
                        {seat.name}
                    </SeatItem>
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle color="#1AAE9E" border="#0E7D71" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color="#C3CFD9" border="#808F9D" />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color="#FBE192" border="#F7C52B" />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={seats?.movie?.posterURL} />
                </div>
                <div>
                    <p>{seats?.movie?.title}</p>
                    <p>{seats?.day?.weekday} - {seats?.day?.date}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.border};         // Essa cor deve mudar
    background-color: ${props => props.color};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${props => props.border};        // Essa cor deve mudar
    background-color: ${props => props.color};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    &:hover {
        cursor: ${props => props.color == "#FBE192" ? 'default' : 'pointer'}
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
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
`