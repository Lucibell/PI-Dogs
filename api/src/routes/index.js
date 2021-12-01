const express = require ('express');
const router = express.Router()
//const { Router } = require('express');
const axios = require('axios');
const {Dog, Temperament, dog_temperament}= require ('../db.js')
const {API_KEY} = process.env;
//const {getAllDogs, getDataApi, getDataDb} = require ('./Controllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//const router = Router();
router.use(express.json())


// Funcion para traer la info de la API
    const getDataApi = async () => {
        const dataDogs= await axios.get('https://api.thedogapi.com/v1/breeds', {
           headers:{'x-api-key': `${API_KEY}`}})
             // const dataApi= await fetch(url) ;
             // const dataDog= await dataApi.json();
        const dogApi= await dataDogs.data.map((e) => {
                       
            
            return {
                name:e.name,
                id:e.id,
                height:e.height.metric,
                weight_min:e.weight.metric.split(" - ")[0],
                weight_max:e.weight.metric.split(" - ")[1],
                life_span:e.life_span,
                temperament:e.temperament,
                image:e.image.url,
                
            } 
        })
        return dogApi
    }
    
  
    // Funcion para traer la info de la base de datos
    const getDataDb = async () => {
        const dogsDb= await Dog.findAll ({
            include:{
                model:Temperament,
                attributes: ["name"],
                through: {
                    attributes:[]
                }
            }
        })
        return dogsDb;
    }
    
    // Funcion que une la info de la API y la de la Base de datos
    const getAllDogs = async () => {
        const dogsApi = await getDataApi();
        const dogsDb = await getDataDb();
        const totalDogs = dogsApi.concat(dogsDb)

        return totalDogs;
    }
    
    //Get Query para obtener todas las razas y cdo se pone la raza en la URL  
    router.get('/dogs', async (req, res) => { 
        const name = req.query.name
        let dogsTotal = await getAllDogs();
        if (name) {
                let dogsByQuery = await dogsTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
                dogsByQuery.length ?
                res.status(200).send(dogsByQuery) :
                res.status(404).send("Raza de perro no encontrado");
            } else {
                res.status(200).send(dogsTotal)
                }
            })
            
    //Funcion que trae todos los temperaments de la API
    const getTemps = async () => {
        const infoApi= await getDataApi()
        const temperaments = infoApi.map (e => e.temperament)
        //console.log(temperaments)
        const alltemps1=temperaments.toString().split(", ").toString().split(",")
        const alltempsfilt= alltemps1.filter( e => e.length>0)
        return alltempsfilt;
    } 
            
    // Get de los temperamentos traidos de la APi y colocados en la base de datos
    router.get('/temperament', async (req,res) => {
        const alltemp=await getTemps();
            for (element of alltemp) {
                Temperament.findOrCreate({
                where:{name: element}
                    })
                }
                const allTemperaments= await Temperament.findAll();
                res.send(allTemperaments)
            })
            
    
            
    // Post de dog 
    router.post('/dog', async (req,res) => { 
        let {name, 
            height_min, 
            height_max, 
            weight_min, 
            weight_max, 
            temperament, 
            life_span, 
            image, 
            createdInDb}= req.body
               
        // Creo la nueva raza en la BD
        let createdDog = await Dog.create ({
            name,
            height_min,
            height_max,
            weight_min,
            weight_max,
            life_span,
            image,
            createdInDb
        })
                
        // El temperamento lo saco de la base de datos cargada previamente con la info de la API
        
        let temperamentDb = await Temperament.findAll (
            {
            where: {
                name:temperament } 
            })
            
        // Agrega el temperamento a la raza creada
            createdDog.addTemperament(temperamentDb)

            res.send (createdDog)
                })


    router.get("/dogs/:id", async (req, res) => {
            const {id}=req.params; 
                //console.log (id)
                
            const dogsTotal= await getAllDogs();
            if (id) {
                let dogxId= dogsTotal.filter(e=> e.id==id)
                dogxId.length ?
                res.status(200).send(dogxId) : 
                res.status(404).json("No se encontro el Id del perro solicitado")
        }
        })

            // router.get("/dogs/:id", async (req, res) => {
            //     const { id } = req.params;
              
            //     try {
            //       if (id) {
            //         const dbData = apiObjFormat(
            //           await Dog.findOne({ where: { id }, include: [Temperament] })
            //         );
              
            //         if (dbData) {
            //           return res
            //             .status(200)
            //             .json({ message: "Perro encontrado", results: dbData });
            //         }
            //       }
              
            //       const apiData = await axios.get((`https://api.thedogapi.com/v1/breeds/search?q=${id}`
            //        , {headers:{'x-api-key': `${API_KEY}`}}
            //         ));
                
            //         console.log (apiData)

            //       if (!apiData) throw Error("Dog not found");
              
            //       return res.status(200).json({ message: "Dog found", results: apiData });
            //     } catch (err) {
            //       return res.status(404).json({ message: "Dog not found", err });
            //     }
            //   });


                
                
                
                
                
                
                
                
                
                
                
                
                
                
    
    
    // Configurar los routers()
    // Ejemplo: router.use('/auth', authRouter);
    
    
    module.exports = router;
    
    
    