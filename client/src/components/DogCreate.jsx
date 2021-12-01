import React, {useState, useEffect} from "react"
import {Link , useNavigate } from "react-router-dom"
import { getTemps, postDog } from "../actions"
import { useDispatch, useSelector } from "react-redux"

function validate(input) { // declaro una funcion del form de cada uno de los inputs. 
    let errors = {};
    if (input.name === "") {
        errors.name = 'A dog name is required';
    }
    
    if (input.height_min === "") {
        // console.log("height_min", typeof(input.height_min))
        errors.height_min = 'Minimun height is required';
    }

    if (input.height_max === "") {
        errors.height_max = 'Maximun height is required';
    }

    if (input.weight_min === "") {
        errors.weight_min = 'Minimun weight is required';
    }

    if (input.weight_max === "") {
        errors.weight_max = 'Maximun weight must be a number';
    }

    if (input.life_span === "") {
        errors.life_span = 'Life_span is required';
    }
    
    return errors;
   };
  

 export default function DogCreate() {
    const dispatch = useDispatch()
    const temperaments = useSelector ((state) => state.temperaments) // nos traemos el estado de los temperamentos del reducer. 
    //console.log(temperaments)
    const navigate= useNavigate();

    const [input, setInput] = useState ({
        name:"",
        image:"",
        height_min:"",
        height_max:"",
        weight_min:"",
        weight_max:"",
        life_span:"",
        temperament:[] 
    })
    
    const [errors, setErrors]=useState({}) // Metes los errores en un estado porq depende del input
   // console.log(errors)
    function handleOnChange (e) {  // El input va variando segun lo q ponga el usuario y va cambiando su estado. 
        setInput ({
            ...input,
            [e.target.name] : e.target.value
            
        })
        
        setErrors(validate({   // Se arma un estado de errores q adentro se le pone la funcion realizada arriba de validacion. 
            ...errors,
            [e.target.name] : e.target.value
          }))
        // console.log(errors)
        //  console.log(input)
    }
    
    function handleOnSelector (e) {  // Para el selector de las temperaments, el usuario va eligiendo el q quiere. 
        setInput ({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }
    
    
    function handleTempDelete(e) {
        setInput ({
            ...input,
            temperament: input.temperament.filter((temp)=> temp !== e )
        })
    }
    
    function handleOnSubmit (e) { // Se Despacha la accion q manda a crear el dog al back. 
        e.preventDefault()
        
        
        
        dispatch(postDog(input))
        alert("Dog created succesfully") // esto cambiarlo
        setInput({   // retorna todo a 0
            name:"",
            image:"",
            height_min:"",
            height_max:"",
            weight_min:"",
            weight_max:"",
            life_span:"",
            temperament:[]
        })
        navigate("/dogs")

    }

    useEffect (()=> {
        dispatch(getTemps()) // se despacha la action de traerte todos los temperamentos de los perros. 
        
    }, [dispatch])


    return (
         <div>
            <Link to= '/dogs'> 
            <button>Volver</button>
            </Link>
            <h1>Create your dog</h1>
            <form onSubmit= {(e)=>handleOnSubmit(e)}>
                <div>
                <label>Name: </label>
                <input 
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e)=>handleOnChange(e)}
                />
                 {errors.name && (
                    <p className='error'>{errors.name}</p>
                )}
                </div>

                <div>    
                <label>Min height: </label>
                <input
                    type="number"
                    value={input.height_min}
                    name="height_min"
                    onChange={(e)=>handleOnChange(e)}
                />
                {errors.height_min && (
                    <p className='error'>{errors.height_min}</p>
                )}
                
                </div>

                <div>
                <label>Max height: </label>
                <input
                    
                    type="number"
                    value={input.height_max}
                    name="height_max"
                    onChange={(e)=>handleOnChange(e)}
                />
                {errors.height_max && (
                    <p className='error'>{errors.height_max}</p>
                )}
                </div>

                <div>
                <label>Min weight: </label>
                <input
                    type="number"
                    value={input.weight_min}
                    name="weight_min"
                    onChange={(e)=>handleOnChange(e)}
                />
                {errors.weight_min && (
                    <p className='error'>{errors.weight_min}</p>
                )}
                </div>
                
                <div>
                <label>Max weight: </label>
                <input
                    type="number"
                    value={input.weight_max}
                    name="weight_max"
                    onChange={(e)=>handleOnChange(e)}
                />
                {errors.weight_max && (
                    <p className='error'>{errors.weight_max}</p>
                )}
                </div>

                <div>
                <label>Life span: </label>
                <input
                    type="text"
                    value={input.life_span}
                    name="life_span"
                    onChange={(e)=>handleOnChange(e)}
                />
                {errors.life_span && (
                    <p className='error'>{errors.life_span}</p>
                )}
                </div>

                <div>
                <label>Image: </label>
                <input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={(e)=>handleOnChange(e)}
                />
                 
                </div>

                <div>
                <label>Temperaments: </label>
                <input
                    type="text"
                    value={input.temperament}
                    name="temperament"
                />
                </div>

                <select onChange={handleOnSelector}>
                    {temperaments.map((temp) => (
                        <option value={temp.name}>{temp.name}</option> 
                    ))}
                </select>
                <button type="submit" 
               //disabled={Object.keys(errors).length ? true: false}
               > Create Dog </button>

            </form>
                {input.temperament.map(e => 
                    <div className="eliminado">
                        <p>{e}</p>
                        <button className="botonX" onClick={(e)=>handleTempDelete(e)}>x</button>

                    </div>
                                        
                    )}
         </div>   

)

}

// <select> onChange.. llama a la fcion handleOn Selector. El mapeo es para armar la lista de temperamentos y q el usuario pueda elegir entre las distintas opciones 
// EN el <ul><li> renderizas la seleccion del usuario.  Lo saque a la bosta
 
{/* <ul><li>{input.temperament.map( (e) =>  e +"  " )}</li></ul>  */}
