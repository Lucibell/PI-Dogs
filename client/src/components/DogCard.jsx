import React from 'react'
import styled from 'styled-components' 
import dober from "../assets/doberman.jpg"
// import { useState } from 'react'
// import img from "../assets/doberman.jpg" 
// import { deleteCard } from '../actions'
// import {useDispatch} from 'react-redux'

const Div= styled.div `
    border-style: solid;
    border-color:black;
    height:440px;
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
    margin-top: -5px;
`

const H3 = styled.h3 `
    font-weight:800;
    font-size:1.5rem;
    text-decoration: underline black;
    font-family:"Raleway";
`

const H4 =styled.h4 `
    text-decoration: underline black;
    font-family:"Raleway";
`
const P = styled.p `
    font-size : 1.1rem;
    font-weight:bold;
    margin-top:-10px;
    font-family:"Raleway";
`
const H5 = styled.p `
    font-size : 1.1rem;
    font-weight:bold;
    font-family:"Raleway";
`


// Este componente muestra/renderiza la carta de cada Dog en la home. 
function DogCard({name, image, temperament, weight_min, weight_max}) {
    // const dispatch = useDispatch()

    // function handleOnDelete (e) {
    //     e.preventDefault()
    //     dispatch(deleteCard(e.target.value))
    // }
    // const [input, setInput] = useState ({
    //     name,
    //     image,-
    //     temperament,
    //     weight_min,
    //     weight_max,
    // })
    // // console.log ("Esto es input", input)
    // // // console.log(Object.keys(input))
    // // console.log (Object.entries(input))
    // console.log("Los values", Object.values(input))
    
    // function handleCardDelete (e) {
    //     console.log("e", e)
    //     setInput ({
    //         ...input,
    //         input: Object.entries(input).filter ((el) =>  {
    //             return el.map((todo)=> todo[0] !== e.name)})
            //input: Object.values(input).filter ((el) =>  el!==e)
            
    //     })

    // }

    return (
        <Div>
            <H3>{name}</H3>
            <Img src={image ? image : dober}  alt="img not found" width="200px" height="250px"
            />
            <H5>Weight: {weight_min} - {weight_max} kg </H5>
            <H4>Temperaments: </H4>
            <P>{temperament}</P>
            {/* <button 
            onClick = {(e)=>handleOnDelete(e)}
            >x </button>    */}

        </Div>
    )
}

export default DogCard
