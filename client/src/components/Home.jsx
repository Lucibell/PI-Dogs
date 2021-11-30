import React from 'react'
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getDogs, createdOrApiFilter, orderByName, orderByWeight} from "../actions" 
import { Link } from 'react-router-dom'
import DogCard from './DogCard'
import Paginado from './Paginado'
import SearchBar from './SearchBar'


export default function Home() {
 
    const dispatch = useDispatch() // para ir despachando las acciones
    const allDogs = useSelector ( (state) => state.dogsLoaded) // reemplace el mapStateToProps. Todo lo q esta en el estado de la action de dogsLoaded traelo. 
    const [orderName, setOrderName]=useState("")
    const [orderWeight, setOrderWeight]=useState("")

    //Paginador
    const [paginaActual, setPaginaActual]=useState(1)
    //const [dogsPerPage, setdogsPerPage]=useState(8)
    const dogsPerPage=8
    const indexofLastDog = paginaActual * dogsPerPage
    const indexofFirstDog = indexofLastDog - dogsPerPage
    const actualDogs = allDogs.slice(indexofFirstDog, indexofLastDog)

    const paginado=(pageNumber) => { // funcion q ayuda al renderizado del paginado
        setPaginaActual(pageNumber)   
    }

    //Traemos del estado los perros cuando el componente se monta. Se usa useEffect. Lo siguiente reemplaza el mapDispatchToProps y el ComponentDIdAmount
    useEffect (()=> {
        dispatch(getDogs()) // se despacha la action de traerte todos los perros 
    }, [dispatch])

    function handleOnClick(e) { // es para un boton q traiga todos los perros de nuevo. Resetea
        e.preventDefault();
        dispatch(getDogs())
    }

    function handleOnFilterDborApi (e) {
        e.preventDefault()
        dispatch(createdOrApiFilter(e.target.value))
    }

    function handleOnOrderName (e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setPaginaActual(1)
        setOrderName(`Ordenado ${e.target.value}}`)
    }

    function handleOnOrderWeight (e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value))
        setPaginaActual(1)
        setOrderWeight(`Ordenado ${e.target.value}}`)
    }

    return (
        <div>
            <Link to = "/dog">Create Dog</Link>
            <h1>DoggieWorld</h1>
            <button onClick={(e) => {handleOnClick(e)}}> Home - Vuelve a cargar los perros</ button>
            <div>
                <select onChange= {(e) => {handleOnOrderName(e)}}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                    
                <select onChange= {(e) => {handleOnOrderWeight(e)}} >
                    <option value="w.asc">Weight-asc</option>
                    <option value="w.desc">Weight-desc</option>
                </select>
          
                <select onChange= {(e) => {handleOnFilterDborApi(e)}}> 
                    <option value="all">All</option>
                    <option value="createddogs">CreatedDogs</option>
                    <option value="apidogs">ApiDogs</option>
                </select>
                
                <select>
                    <option value="temperament">Temperament</option>
                </select>
            </div>


        <Paginado allDogs={allDogs.length} paginado={paginado} dogsPerPage={dogsPerPage}        />     

        <SearchBar />
          
          {  
            actualDogs?.map ((e) => {
                return (
                    <div className="cards">
                    <Link to = {"/dogs/" + e.id}> 
                    <DogCard key={e.id} name={e.name} image={e.image} temperament={e.temperament} weight_min={e.weight_min} weight_max={e.weight_max} /> 
                    </Link>
                </div> 
                )}
                )
            }
           
        </div>
    )
}

//image={c.img ? c.img : c.image}
// c.image ? c.image : <img src= 'url... '

//ver de modularizar a una NavBar la parte de volver a Home, el create y el nombre de la aplicacion.
// Se podria hacer el filtrado en otro componente
//De los filtros del select ver si se puede hacer por estados y cambios de estado
// Falta Filtrado por temperament. 
// No funciona el search bar
// Agregar la imagen al DataBase
// Hay q hacer controlado el formulario
// Ver como eliminar los temps cdo creas un dog
// Ver de usar el useHIstory para el formulario q ahora se llama distinto en el 
// NO anda la validacion del formulario

//
//<Link to={"/home/" + e.id}>

