import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import img from '../assets/ppal.jpg'

const Contenedor = styled.div` 
    background-image: url(${img});
    background-size:cover;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    font-size: 2.5em;
        `

const Titulo = styled.h1`
    font-family:"Indie Flower", cursive; //cambiar la letra. no me gusta 
    color:#007ac1;
    position:absolute;
    right: 55%;
    top: 15%;
`

const Boton = styled.button `
    font-family:"Indie Flower", cursive;
    margin-top:20px;
    font-weight:bold;
    font-size:40px;
    padding: 10px;
    background-color: #007ac1;
    border:none; //todos los input tienen un borde
    width:auto;
    border-radius:40px;
    color:#FFF;
    position:absolute;
    left:20%;
    top:70%;
    transition:background-color .3s ease;


    &:hover {
    background-color: #326AC0;
    }


`



function Landingpage() {
    return (
        <Contenedor> 
            <Titulo>
                Welcome to Dogs World 
            </Titulo>
            <Link to = "/dogs" >
            <Boton>Get In</Boton>
            </Link>
            
        </Contenedor>
    )
}

export default Landingpage
