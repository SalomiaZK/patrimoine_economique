import express from 'express';

import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { writeFile , readFile} from './data/index.js';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(bodyParser())

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://patrimoine-eco-ui.onrender.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("/", (req, res) => {
    res.send("it's working");
});



app.get('/possessions', (req, res) => {
    const filePath = path.join(__dirname, './data/data.json');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Erreur lors de l\'envoi du fichier:', err);
            res.status(500).send('Erreur lors de l\'envoi du fichier');
        }
    });
});

app.post('/possessions', async (req, res) => {
    let newData = req.body
     const filePath = path.join(__dirname, './data/data.json');
       
    await readFile(filePath).then(data => {
    data.data[1].data.possessions.push(newData)

       console.log(data.data[1].data.possessions)
      return data.data
      })
      .then(response => {
       writeFile("./data/data.json", response)
    })


    });











    app.put("/possessions/:libelle/update", async (req, res)=>{
        console.log(req.body)
        console.log(req.params.libelle.slice(1))

        const filePath = path.join(__dirname, './data/data.json');
        await readFile(filePath).then(data => {

            data.data[1].data.possessions = data.data[1].data.possessions.map(d => d.libelle == req.params.libelle.slice(1) ? req.body : d)
            return data.data
        })
         .then(response =>{
             writeFile("./data/data.json", response)

        })
    
        res.json({message: "updating..."})
    })


app.put("/possession/:libelle/close", async (req, res)=>{
    console.log(req.body)
    console.log(req.params)
    const filePath = path.join(__dirname, './data/data.json');
    await readFile(filePath).then(data => {
        for(let i = 0; i< data.data[1].data.possessions.length; i++){
            let alldata = data.data[1].data.possessions

            if(alldata[i].libelle == req.params.libelle.slice(1)){
                alldata[i].dateFin = req.body.dateFin
            }
        }
        console.log(data.data)

         return data.data
    })
    
     .then(response => {
         writeFile("./data/data.json", response)
     })
    
})

// Démarrer le serveur
app.listen(port, () => {
    console.log("App running on port : " + port);
});
