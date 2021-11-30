import axios from 'axios'


// ruta de la home en donde vienen todos los perros
export function getDogs () {
    return async function (dispatch) {
        var json= await axios.get("http://localhost:3001/dogs")

    return dispatch({ type: "GET_DOGS", payload: json.data });
         
}}

export function getNameDog(name) {
    return async function (dispatch) {
        try {
         var info = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({ type: "GET_NAME_DOG", payload: info.data });
        }
        catch (error) {
            console.log (error)
        } }
    }

export function getTemps(){
    return async function (dispatch) {
        var temps = await axios.get('http://localhost:3001/temperament',{});
        return dispatch({ type: "GET_TEMPS", payload: temps.data });
    }

}

export function postDog(payload) {
    return async function (dispatch) {
        var dogcreated = await axios.post ('http://localhost:3001/dog', payload)
        return dogcreated; 
    }
}

export function getIdDog(id) {
    return async function (dispatch) {
        try {
        var dogId= await axios.get (`http://localhost:3001/dogs/${id}`)
        return dispatch ({type: "GET_DOG_DETAILS", payload: dogId.data})
        }
        catch (error) {
            console.log (error)
        }
    }
}


export function createdOrApiFilter (payload) {
    return {
    type:"DB_OR_API_FILTER",
    payload
}
}

export function orderByName (payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByWeight (payload) {
    return {
        type: "ORDER_BY_WEIGHT",
        payload
    }
}







// export function getDogsdetail(){

// }





