import React, {useState, useEffect} from "react"
import {Link , useNavigate } from "react-router-dom"
import { getTemps, postDog } from "../actions"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import img from "../assets/perrito.jpg"

const DivFondo = styled.div`
    background-image:url(${img});
    background-size:contain;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
`

const DivPpal = styled.div`
     border-style: solid;
    border-color:black;
    height:500px;
    width: 380px;
    background:linear-gradient(#23dbbc, #ebe0e0);

    border-radius:10px;
    /* display:flex; */
    position:absolute;
    right:34%;
    top:8%;
    `

const Label = styled.label `
    font-size: 20px;
    font-weight:bold;
`

const ButtonCB =styled.button `
    font-family:"Indie Flower", cursive;
    /* margin-top:40px; */
    font-weight:bold;
    font-size:20px;
    padding: 10px;
    background-color: #007ac1;
    border:none; 
    width:auto;
    border-radius:40px;
    color:#FFF;
    position:absolute;
    left:10%;
    top:85%;
    `
const ButtonC = styled.button `
    font-family:"Indie Flower", cursive;
    font-weight:bold;
    font-size:20px;
    padding: 10px;
    background-color: #007ac1;
    border:none; 
    width:auto;
    border-radius:40px;
    color:#FFF;
    position:absolute;
    left:75%;
    top:85%;  
`
const Input = styled.input`
    display: inline-flex;
    font-family:"Raleway";
    font-size:18px;
    height: 20px ;
    width: 200px;
    border-radius: 5px;
`
const P = styled.p`
    color:red;
    font-weight:bold;
`
const Select = styled.select `
    font-family:"Raleway";
    font-size:18px;
    height: 30px ;
    width: 200px;
    border-radius: 5px;
    margin-top:5px;
`

const DivTemp = styled.div`
    display:inline-flex;
    margin-left: 10px;
    /* flex-direction: row; */
    
`
const Div2=styled.div`
    display:inline-flex;
    align-items:center;
    margin-right:3px;
    
`
const Ptemp= styled.p`
    margin-left: 15px;
    font-family:"Raleway";
`
const ButtonX=styled.button`
    height:30px;
    border-radius:9999px;
`

function validate(input) { // declaro una funcion del form de cada uno de los inputs. 
    let errors = {};
    if (input.name === "") {
        errors.name = 'A dog name is required';
    } else if (input.height_min === "" || input.height_min <= 0) {
        errors.height_min = 'Height min is required and has to be different of 0 and positive';
    } else if (input.height_max === ""|| input.height_max <= 0) {
        errors.height_max = 'Maximun height is required and has to be different of 0 and positive';
    } else if (input.weight_min === "" || input.weight_min <= 0) {
        errors.weight_min = 'Minimun weight is required and has to be different of 0 and positive';
    } else if (input.weight_max === "" || input.weight_max <= 0) {
        errors.weight_max = 'Maximun weight is required and has to be different of 0 and positive';
    } else if (input.life_span === "" || input.life_span <= 0) {
        errors.life_span = 'Life_span is required and has to be different of 0 and positive';
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
    const [error, setError]= useState(false)

    function handleOnChange (e) {  // El input va variando segun lo q ponga el usuario y va cambiando su estado. 
        setInput ({
            ...input,
            [e.target.name] : e.target.value
            
        })
        
        setErrors(validate({   // Se arma un estado de errores q adentro se le pone la funcion realizada arriba de validacion. 
            ...errors,
            [e.target.name] : e.target.value
          }))
        
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
        if (input.name==="" || input.height_min==="" || input.height_max==="" || input.weight_min==="" || input.weight_max==="" || input.life_span==="" ) {
            setError(true)
            return 
        } else 
        setError (false)
        dispatch(postDog(input))
        alert("Dog created succesfully") 
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
        <DivFondo>
         <DivPpal>
            <Link to= '/dogs'> 
            <ButtonCB>Go Back</ButtonCB>
            </Link>
            <h1>Create your Dog's Breed</h1>
            <form onSubmit= {(e)=>handleOnSubmit(e)}>
               <P> {error ? "You must complete name, weight, height and life span" : null} </P>
                <div>
                <Label>Name: </Label>
                <Input 
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e)=>handleOnChange(e)}
                />
                 {errors.name && (
                    <P>{errors.name}</P>
                )}
                </div>

                <div>    
                <Label>Min height: </Label>
                <Input
                    type="number"
                    value={input.height_min}
                    name="height_min"
                    onChange={(e)=>handleOnChange(e)}
                />
                {errors.height_min && (
                    <P>{errors.height_min}</P>
                )}
                
                </div>

                <div>
                <Label>Max height: </Label>
                <Input
                    type="number"
                    value={input.height_max}
                    name="height_max"
                    onChange={(e)=>handleOnChange(e)}
                />
                {errors.height_max && (
                    <P>{errors.height_max}</P>
                )}
                </div>

                <div>
                <Label>Min weight: </Label>
                <Input
                    type="number"
                    value={input.weight_min}
                    name="weight_min"
                    onChange={(e)=>handleOnChange(e)}
                />
                {errors.weight_min && (
                    <P>{errors.weight_min}</P>
                )}
                </div>
                
                <div>
                <Label>Max weight: </Label>
                <Input
                    type="number"
                    value={input.weight_max}
                    name="weight_max"
                    onChange={(e)=>handleOnChange(e)}
                />
                {errors.weight_max && (
                    <P>{errors.weight_max}</P>
                )}
                </div>

                <div>
                <Label>Life span: </Label>
                <Input
                    type="text"
                    value={input.life_span}
                    name="life_span"
                    onChange={(e)=>handleOnChange(e)}
                />
                {errors.life_span && (
                    <P>{errors.life_span}</P>
                )}
                </div>

                <div>
                <Label>Image: </Label>
                <Input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={(e)=>handleOnChange(e)}
                />
                 
                </div>

                <div>
                <Label>Temperaments: </Label>
                <Input
                    type="text"
                    value={input.temperament}
                    name="temperament"
                />
                </div>

                <Select onChange={handleOnSelector}>
                    {temperaments.map((temp) => (
                        <option value={temp.name}>{temp.name}</option> 
                    ))}
                </Select>
                <ButtonC type="submit" 
                //disabled={Object.keys(errors).length ? true: false}
               > Create </ButtonC>

                

            </form>
            <DivTemp>
                {input.temperament.map(e => 
                    <Div2>
                        <Ptemp>{e}</Ptemp>
                        <ButtonX onClick={()=>handleTempDelete(e)}>x</ButtonX>
                    </Div2>
                                   
                    )}
            </DivTemp>
         </DivPpal>  
         </DivFondo> 

)

}

// <select> onChange.. llama a la fcion handleOn Selector. El mapeo es para armar la lista de temperamentos y q el usuario pueda elegir entre las distintas opciones 
// EN el <ul><li> renderizas la seleccion del usuario.  Lo saque a la bosta
 
