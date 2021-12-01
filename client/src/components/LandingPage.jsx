import React from 'react'
import {Link} from 'react-router-dom'


function Landingpage() {
    return (
        <div> 
            <h1>
                Bienvenidos a la DOG PAGE 
            </h1>
            <Link to = "/dogs" >
            <button>Ingresar</button>
            </Link>
            
        </div>
    )
}

export default Landingpage
