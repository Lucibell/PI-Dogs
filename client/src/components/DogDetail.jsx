import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import {useEffect} from 'react'
import { getIdDog } from '../actions'
import styled from 'styled-components'
import img from '../assets/perri.jpg'
import dober from '../assets/doberman.jpg'

const DivFondo = styled.div `
    background-image:url(${img});
    background-size: contain;
    position:absolute; 
    top:0;
    bottom:0;
    left:0;
    right:0; 
`

const DivPpal = styled.div`
    border-style: solid;
    border-color:black;
   // height:550px;
    height:500px;
    width: 450px;
    background:linear-gradient(#23dbbc, #ebe0e0);

    border-radius:10px;
    position:absolute;
    right:35%;
    top:10%;
    overflow:auto;
    font-family:"Raleway";

    `
const Img = styled.img`
    max-width:50%;
    height:auto;
    border-color:black;
    border-style:solid;
    border-width: 1px;
    border-radius: 10px;
`
const H1 = styled.h1 `
    font-weight:800;
    font-size:2rem;
    text-decoration: underline black;
`
const H3 =styled.h3`
    text-decoration: underline black;
    margin-top:-8px;
    margin-right:10px;
`

const P = styled.p`
    font-size: 20px;
    margin-top:-12px;

`
const Button = styled.button `
    font-family:"Indie Flower", cursive;
    font-weight:bold;
    font-size:20px;
    padding: 10px;
    background-color: #007ac1;
    border:none; 
    margin-bottom:10px;
    width:auto;
    border-radius:40px;
    color:#FFF;
    position:absolute;
    left:45%;
    top: 1%;
`

const Div1 = styled.div`
    display:flex;
    flex-direction: row;
    align-items:center;
    justify-content:flex-start;
    margin-top:10px;
    margin-left:115px;
`
const Div2 = styled.div`
    display:flex;
    flex-direction: row;
    margin-left:15px;
    justify-content:flex-start;
    margin-top:10px;
`


function DogDetail() {

    const dispatch = useDispatch()
    const dogDetail = useSelector(state => state.dogDetail)
    //console.log(dogDetail)
    const params = useParams();

    useEffect (()=> {
        dispatch(getIdDog(params.id)) // se despacha la action de traerte la info de cada perro cdo se monta  
    }, [dispatch, params.id])

    //console.log(getIdDog(params.id))
    
    return (
        <DivFondo>
        <DivPpal>
           {
            dogDetail.length > 0 ?
                <div>
                    <H1>{dogDetail[0].name}</H1>
                    <Img  src ={dogDetail[0].image ? dogDetail[0].image : dober}/>
                    <Div1>
                    <H3>Weight: </H3>
                    <P>{dogDetail[0].weight_min} - {dogDetail[0].weight_max} kg</P>
                    </Div1>
                    <Div1>
                    <H3>Height: </H3>
                    <P>{!dogDetail[0].createdInDb ? dogDetail[0].height + " cm" : dogDetail[0].height_min + " - " + dogDetail[0].height_max + " cm"} </P>
                    </Div1>
                    <Div1>
                    <H3>Life span: </H3>
                    <P>{dogDetail[0].life_span} </P>
                    </Div1>
                    <Div2>
                    <H3>Temperaments: </H3>
                    <P>{!dogDetail[0].createdInDb ? dogDetail[0].temperament + " " : dogDetail[0].temperaments.map ((e)=> e.name + (', '))}</P>
                    </Div2>          

                </div> : <p>Loading...</p>
           }


        </DivPpal>
           <Link to = "/dogs">
               <Button type="submit">Go back</Button>
           </Link>
        </DivFondo>
    )
}

export default DogDetail
// Ver el tema de la imagen por aca. Esta solo contemplado para los de la API