import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    font-size: 20px;
    font-family:"Indie Flower", cursive;
    margin:3px;
    width:45px;
    border-radius: 9999px;
    /* font-weight:bold; */

    &:active {
        color:white;
        background-color:#007ac1;
    }

    &:hover::not(.active) {
        background-color:#00B6BD;
    }
 

`


function Paginado({allDogs, paginado, dogsPerPage}) {
    const pageNumbers = []
    let pagesTotales = Math.ceil(allDogs/dogsPerPage)

    for (let i=1 ; i<=pagesTotales ; i++) {
        pageNumbers.push(i)
    } 

    return (
        <nav>
            <ul>
                {pageNumbers?.map(number=> ( 
                   <Button key={number} onClick={()=>paginado(number)}> {number} </Button>
                     ))}
            </ul>
        </nav>
    )}

export default Paginado


