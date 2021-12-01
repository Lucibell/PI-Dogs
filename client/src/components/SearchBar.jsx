import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {getNameDog} from "../actions" 
// import {Link} from "react-router-dom"

function SearchBar() {

 const dispatch = useDispatch()
 const [nameDog, setNameDog] = useState('')

function handleChangeInput(e) {
    e.preventDefault()
    setNameDog(e.target.value) //COn esto va variando el valor del estado segun lo que vaya poniendo el usuario
    //console.log(nameDog)
}

function handleSubmit(e) {
    e.preventDefault()
    dispatch(getNameDog(nameDog))

    console.log(getNameDog(nameDog))
   // setNameDog("")
}

    return (
        <div>
            <input
                type="text"
                placeholder="Looking for..."
                onChange={(e) => handleChangeInput(e)}
            />
            {/* <Link to="/dogs"> */}
            <button 
                type="submit"
                onClick={(e) =>handleSubmit(e)}>Buscar
            </button>
            {/* </Link> */}
            
        </div>
    )
}

export default SearchBar


// import React from 'react';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// //action
// import { getNameDog } from '../actions';

// export default function SearchBar () {
// const dispatch = useDispatch()
// const [name, setName] = useState('')

// function handleInputChange(e) {
// e.preventDefault() 
// setName(e.target.value)

// }

// function handleSubmit (e) {
//     e.preventDefault()
//     dispatch(getNameDog(name))
//     getNameDog('')
// }

// return (
//     <div>
//         <input 
//         type= 'text'
//         placeholder = 'Breed...'
//         onChange = {(e) => handleInputChange(e)}
//         />
//         <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
//     </div>
// )

// }
