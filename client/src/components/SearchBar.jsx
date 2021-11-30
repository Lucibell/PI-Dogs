import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {getNameDog} from "../actions" 

function SearchBar() {

 const dispatch = useDispatch()
 const [nameDog, setNameDog] = useState("")

function handleChangeInput(e) {
    e.preventDefault()
    setNameDog(e.target.value) //COn esto va variando el valor del estado segun lo que vaya poniendo el usuario
    //console.log(nameDog)
}

function handleSubmit(e) {
    e.preventDefault()
    dispatch(getNameDog(nameDog)) //AL apretar el boton despacha la accion de traer la info del nombre del perro q 
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
            <button 
                type="submit"
                onClick={(e) => handleSubmit(e)}>Buscar

            </button>
            
        </div>
    )
}

export default SearchBar
