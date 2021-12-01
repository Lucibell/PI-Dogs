import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import {useEffect} from 'react'
import { getIdDog } from '../actions'


function DogDetail() {

    const dispatch = useDispatch()
    const dogDetail = useSelector(state => state.dogDetail) 
    const params = useParams();

    useEffect (()=> {
        dispatch(getIdDog(params.id)) // se despacha la action de traerte la info de cada perro cdo se monta  
    }, [dispatch])

    //console.log(getIdDog(params.id))
    
    return (
        <div>
           {
            dogDetail.length > 0 ?
                <div>
                    <h1>{dogDetail[0].name}</h1>
                    <img src ={dogDetail[0].image} />
                    <h2>Weight: {dogDetail[0].weight_min} - {dogDetail[0].weight_max} kg</h2>
                    <h2>Height: {!dogDetail[0].createdInDb ? dogDetail[0].height + " cm" : dogDetail[0].height_min + " - " + dogDetail[0].height_max + " cm"} </h2>
                    <h2>Life_span: {dogDetail[0].life_span} </h2>
                    <h3>Temperaments: {!dogDetail[0].createdInDb ? dogDetail[0].temperament + " " : dogDetail[0].temperaments.map ((e)=> e.name + (' '))}</h3>
                              

                </div> : <p>Loading...</p>
           }

           <Link to = "/dogs">
               <button type="submit">Go back</button>
           </Link>

        </div>
    )
}

export default DogDetail
// Ver el tema de la imagen por aca. Esta solo contemplado para los de la API