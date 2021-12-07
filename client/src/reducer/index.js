
const initialState = {
dogsLoaded:[],
allDogs:[],
temperaments:[],  
dogDetail:{}
}

export default function rootReducer(state= initialState, action) { 

    switch (action.type) {

        case "GET_DOGS":
            return {
                ...state,
                dogsLoaded: action.payload,   // manda todo lo q te mande la action GET_DOGS q es la q conecta al back 
                allDogs: action.payload,
            }

        case "GET_NAME_DOG":
            return {
                ...state,
                dogsLoaded: action.payload // Es como un filtro por name del query q esta hecho en el back directamente. Aca no hay q hacer lógica.
            }

        case "GET_TEMPS":
            return {
                ...state,
                temperaments: action.payload
            }
            
        case "POST_DOG":
            return {
                ...state
            }

        case "GET_DOG_DETAILS":
            return {
                ...state,
                dogDetail : action.payload
            }

        case"DB_OR_API_FILTER":

            const allDogs = state.allDogs
            const db_or_api_filter = action.payload === "all" ? allDogs : action.payload === "createddogs" ? allDogs.filter(e => e.createdInDb) : allDogs.filter(e => !e.createdInDb)

            return {
                ...state,
                dogsLoaded: db_or_api_filter
            }

        case "TEMP_FILTER":
            const dogs = state.allDogs
            let temp_filtered = dogs.filter((e) => {
                
                if (e.temperament) { // bendito filtro.. esta es para la info de la Api
                    return e.temperament.includes(action.payload) // Como es un string queremos q incluya al payload
            }  
             // esta es para la info de la db. Como viene en un array se mapea por el nombre y si coincide con el payload lo filtra. 
                if (e.temperaments) {
                    let tempsDb = e.temperaments.map(e => e.name);
                    return tempsDb.includes(action.payload);
            }
              })

            return {
                ...state,
                dogsLoaded:temp_filtered
            }


        case "ORDER_BY_NAME": {
            let dogsorder = action.payload === "asc" ?
                state.dogsLoaded.sort(function (a, b) { //allDOgs
                    if (a.name > b.name) {
                        return 1
                    }
                    if (a.name < b.name) {
                        return -1
                    }
                    return 0
                }) :

                state.dogsLoaded.sort(function (a, b) { //allDogs
                    if (a.name < b.name) {
                        return 1
                    }
                    if (a.name > b.name) {
                        return -1
                    }
                    return 0
                })
                return {
                    ...state,
                    dogsLoaded:dogsorder // dogsLoaded
                }
         }

        case "ORDER_BY_WEIGHT": {

            let dogsorder2 = action.payload === "w.asc" ?
                state.dogsLoaded.sort(function (a, b) {
                    
                    return (parseInt(a.weight_min) - parseInt(b.weight_min)) //allDOgs
                }) :

                state.dogsLoaded.sort(function (a, b) {

                    return (parseInt(b.weight_min) - parseInt(a.weight_min)) //allDogs
                })

            return {
                ...state,
                dogsLoaded: dogsorder2 //dogsLoaded
            }
        }
        
        
        // case "DELETE_CARD" : {
                
        //         let dogse = state.allDogs.filter ((e)=> {
        //         if(e.createdInDb) { 
        //             return e.id !== action.payload}
        //         return null
                                       
        //         })

        //     return {
        //         ...state,
        //         dogsLoaded: dogse            }

        // }
             
        default:
            return state
         
        }}

    


