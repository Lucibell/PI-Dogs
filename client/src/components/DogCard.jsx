import React from 'react'
import styled from 'styled-components' 
import img from "../assets/doberman.jpg" 

const Div= styled.div `
    border-style: solid;
    border-color:black;
    height:450px;
    width: 370px;
    background:linear-gradient(#23dbbc, #ebe0e0, white);
    border-radius:10px;
    overflow:auto;
    margin-bottom: 3rem;
    
`

const Img = styled.img `
    max-width:100%;
    height:auto;
    border-color:black;
    border-style:solid;
    border-width: 1px;
    border-radius: 10px;
`

const H3 = styled.h3 `
    font-weight:800;
    font-size:1.5rem;
    text-decoration: underline black;
`

const H4 =styled.h4 `
    text-decoration: underline black;

`
const P = styled.p `
    font-size : 1.1rem;
    font-weight:bold;
    margin-top:-10px;

`
const H5 = styled.p `
    font-size : 1.1rem;
    font-weight:bold;

`


// Este componente muestra/renderiza la carta de cada Dog en la home. 
function DogCard({name, image, temperament, weight_min, weight_max}) {

    return (
        <Div>
            <H3>{name}</H3>
            <Img src={image}  alt="img not found" width="200px" height="250px"
            />
            <H5>Weight: {weight_min} - {weight_max} kg </H5>
            <H4>Temperaments: </H4>
            <P>{temperament}</P>
            

        </Div>
    )
}

export default DogCard
