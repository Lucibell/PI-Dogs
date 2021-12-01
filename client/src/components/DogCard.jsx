import React from 'react'
// styled components de la presentacion de cada perrito. 

// Este componente muestra/renderiza la carta de cada Dog en la home. 
function DogCard({name, image, temperament, weight_min, weight_max}) {

   
    return (
        <div>
            <h3>{name}</h3>
            <img src={image ? image : "https://www.1zoom.me/big2/76/74640-ilonka.jpg"} alt="img not found" width="200px" height="250px"/>
            <h5>Weight_min: {weight_min} kg</h5>
            <h5>Weight_max: {weight_max} kg</h5>
            <h5>{temperament}</h5>

        </div>
    )
}

export default DogCard
