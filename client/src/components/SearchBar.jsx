import React from 'react'
import styled from 'styled-components'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {getNameDog} from "../actions" 
import { FcSearch } from 'react-icons/fc'
// import {Link} from "react-router-dom"

const Div = styled.div `
    background-color:#84ffff;
    height:50px;
    display: flex;
    align-items:center;
    justify-content: center;
`

const H3 =styled.h3`
    display:inline-flex;
    margin-right:10px;
`

const H2 = styled.h2 `
    display: inline-flex;
    margin-right:20px;
    margin-left:40px;
    font-weight:bold;
`
const Input = styled.input `
    display: inline-flex;
    height: 30px ;
    width: 120px;
    margin: 10px; 
    border-radius: 10px;

`
const Button = styled.button `
    font-size: 1.5rem;
    padding: 0.1rem;
    position:absolute;
    right:34%;
    border-radius: 9999px;
    border-style:solid;
    border-width:2px;
    border-color: transparent;
    background-color:transparent;
    margin-left :0;
    
    &:hover {
    background-color: #bbcef0f2;
    }
`


function SearchBar() {

 const dispatch = useDispatch()
 const [nameDog, setNameDog] = useState('')

function handleChangeInput(e) {
    e.preventDefault()
    setNameDog(e.target.value) //COn esto va variando el valor del estado segun lo que vaya poniendo el usuario
    //setNameDog("")
    
    //console.log(nameDog)
}

function handleSubmit(e) {
    e.preventDefault()
    dispatch(getNameDog(nameDog))

    // console.log(getNameDog(nameDog))
}

    return (
        <Div>
            <H2>SEARCH BY: </H2>
            <H3>NAME</H3>
            <Input
                type="text"
                placeholder="Breeds..."
                onChange={(e) => handleChangeInput(e)}
            />
            
            <Button 
                type="submit"
                onClick={(e) =>handleSubmit(e)}><FcSearch/>
            </Button>
            
            
        </Div>
    )
}

export default SearchBar

