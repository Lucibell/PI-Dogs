import React from 'react'
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getDogs, createdOrApiFilter, orderByName, orderByWeight, getTemps,tempFilter} from "../actions" 
import { Link } from 'react-router-dom'
import DogCard from './DogCard'
import Paginado from './Paginado'
import SearchBar from './SearchBar'


export default function Home() {
 
    const dispatch = useDispatch() // para ir despachando las acciones
    const allDogs = useSelector ( (state) => state.dogsLoaded) // reemplace el mapStateToProps. Todo lo q esta en el estado de la action de dogsLoaded traelo. 
    const temperaments = useSelector(state => state.temperaments)
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

    useEffect (()=> {
        dispatch(getTemps()) // se despacha la action de traerte todos los temperamentos para el filtrado
    }, [dispatch])

    function handleOnClick(e) { // es para un boton q traiga todos los perros de nuevo. Resetea
        e.preventDefault();
        dispatch(getDogs())
    }

    function handleOnFilterDborApi (e) {
        e.preventDefault()
        dispatch(createdOrApiFilter(e.target.value))
    }

    function handleOnFilterTemp(e) {
            e.preventDefault()
            dispatch(tempFilter(e.target.value))
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
            <Link to="/dog">Create Dog</Link>
            <h1>DoggieWorld</h1>
            <button onClick={(e) => { handleOnClick(e) }}> Home - Vuelve a cargar los perros</ button>
            <div>
                <select onChange={(e) => { handleOnOrderName(e) }}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>

                <select onChange={(e) => { handleOnOrderWeight(e) }} >
                    <option value="w.asc">Weight-asc</option>
                    <option value="w.desc">Weight-desc</option>
                </select>

                <select onChange={(e) => { handleOnFilterDborApi(e) }}>
                    <option value="all">All</option>
                    <option value="createddogs">CreatedDogs</option>
                    <option value="apidogs">ApiDogs</option>
                </select>


                <select onChange={handleOnFilterTemp}>
                    {temperaments.map((temp) => (
                        <option value={temp.name}>{temp.name}</option>
                    ))}
                </select>
            </div>


            <Paginado allDogs={allDogs.length} paginado={paginado} dogsPerPage={dogsPerPage} />

            <SearchBar />

            {
                actualDogs?.map((e) => {
                    return (
                        <div className="cards">
                            <Link to={"/dogs/" + e.id}>
                                <DogCard key={e.id} name={e.name} image={e.image ? e.image : <img src='https://www.1zoom.me/big2/76/74640-ilonka.jpg' />} temperament={e.temperament} weight_min={e.weight_min} weight_max={e.weight_max} />
                            </Link>
                        </div>

                    )
                }
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

// OJO con el filtrado por weight. 

// //  Hice una validacion media trucha.
//Ver de agregar una cruz y eliminar a los dogs creados
// Falta una imagen por default sino se carga un perro. No esta resuelto el tema de la imagen 
//Testing 


//
//<Link to={"/home/" + e.id}>

// import React from 'react';
// import { Link } from 'react-router-dom';
// // hooks
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // actions
// import {getDogs, createdOrApiFilter, orderByName, orderByWeight} from '../actions'
// // coponentes
// import DogCard from './DogCard';
// import Paginado from './Paginado';
// import SearchBar from './SearchBar';



// export default function Home (){

// const dispatch = useDispatch()

// const alldogs = useSelector ((state) => state.dogs)
// const [orden, setOrden] = useState('')
// const [currentPage, setCurrentPage] = useState(1)
// const [dogsPerPage, setDogsPerPage] = useState(8)
// const indexOfLastDog = currentPage * dogsPerPage //8
// const indexOffFirstDog = indexOfLastDog - dogsPerPage //0
// const currentDog = alldogs.slice(indexOffFirstDog, indexOfLastDog)

// const paginado = (pageNumber) => {
//     setCurrentPage(pageNumber)
// }

// useEffect(() => {
//     dispatch(getDogs());
//     }, [dispatch])

// function handleClick(e){
//     e.preventDefault();
//     dispatch(getDogs());
// }

// function handleFilterCreated (e) {
//     dispatch(createdOrApiFilter(e.target.value))
// }
// function handleSort (e) {
//     e.preventDefault();
//     dispatch(orderByName (e.target.value))
//     setCurrentPage(1);
//     setOrden(`Ordenado ${e.target.value}`)  
// }
// function handleSortWeight (e) {
//     e.preventDefault();
//     dispatch(orderByWeight (e.target.value))
//     setCurrentPage(1);
//     setOrden(`Ordenado ${e.target.value}`)  
// }

// return (
//     <div>
//         <Link to='/dog' >Create breed</Link>
//         <h1>Welcome</h1>
//         <button onClick={e => {handleClick(e)}}>
//         Volver a cargar los personajes
//         </button>
//         <SearchBar/>
//         <div>
//             <select onChange={e => handleSort(e)}>
//                 <option value= 'asc'>Ascendente</option>
//                 <option value= 'desc'>Descendente</option>
//             </select>
//             <select  onChange={e => handleSortWeight(e)}>
//                 <option value='weightasc'>Weight ascendente</option>
//                 <option value='weightdesc'>Weight descendente</option>
//             </select>
//             <select onChange={e => handleFilterCreated(e)}>
//                 <option value='All'>All</option>              
//                 <option value='name'>Existing breeds</option>
//                 <option value='Our Breeds'>Our Breeds</option>
//             </select>
//             <select >
//                 <option value='temperament'>Temperament</option>
//             </select>
//             <Paginado
//             dogsPerPage = {dogsPerPage}
//             alldogs = {alldogs.length}
//             paginado = {paginado}
//             />
//             {currentDog?.map( (element) => {
//                   return (
//                     <div>
//                         <Link to={'/home/' + element.id}>
//                             <DogCard key={element.id} image={element.image? element.image : <img src='https://i.postimg.cc/gjZX7wqp/friends-gf09118657-1280.jpg'/>} name={element.name} temperament={element.temperament} weight_min={element.weight_min} />
//                         </Link>
//                     </div>
//                   );
//                 })}           
//         </div>
//     </div>

// )
// }



