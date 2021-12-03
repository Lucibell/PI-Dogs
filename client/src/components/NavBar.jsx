import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import {getDogs} from "../actions"

const Contenedor = styled.div `
    background-color:#00B6BD;
    height: 100px;
    display:flex;
`

const Titulo = styled.h1`
font-size: 50px;
position:absolute;
right:40%;
top:-3%;

`
const Button =styled.button `
    font-family:"Indie Flower", cursive;
    margin-top:40px;
    font-weight:bold;
    font-size:30px;
    padding: 10px;
    background-color: #007ac1;
    border:none; 
    width:auto;
    border-radius:40px;
    color:#FFF;
    position:absolute;
    left:20%;
    top:-3%;
`

const Create = styled.div `
    font-family:"Indie Flower", cursive;
    margin-top:40px;
    font-weight:bold;
    font-size:30px;
    padding: 10px;
    background-color: #007ac1;
    border:none; //todos los input tienen un borde
    width:auto;
    border-radius:40px;
    color: white;
    position:absolute;
    left:80%;
    top:-3%;
`


function NavBar() {
    
    const dispatch=useDispatch();

    function handleOnClick(e) { // es para un boton q traiga todos los perros de nuevo. Resetea
        e.preventDefault();
        dispatch(getDogs())
    }

    return (
        <Contenedor>
            <Create>    
        <Link  to="/dog" style={{textDecoration:"none" , color:"white"}}>Create</Link>
            </Create>
        <Titulo>Doggie App</Titulo>
        <Button onClick={(e) => handleOnClick(e)} > Home </ Button>
                   
        </Contenedor>
    )
}

export default NavBar




