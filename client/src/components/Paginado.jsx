import React from 'react'

function Paginado({allDogs, paginado, dogsPerPage}) {
    const pageNumbers = []
    let pagesTotales = Math.ceil(allDogs/dogsPerPage)

    for (let i=1 ; i<=pagesTotales ; i++) {
        pageNumbers.push(i)
    } 

    return (
        <nav>
            <ul className="paginado">
                {pageNumbers?.map(number=> ( 
                   <a key={number} onClick={()=>paginado(number)}> {number} </a>
                     ))}
            </ul>
        </nav>
    )}

export default Paginado

//VER BIEN, NO TERMINO DE ENTENDER

