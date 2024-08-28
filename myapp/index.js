import express from 'express';

import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { writeFile , readFile} from '../data/index.js';

const app = express();
const port = 3000;

// Obtenir le répertoire du fichier actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(bodyParser())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("/", (req, res) => {
    res.send("it's working");
});



app.get('/possessions', (req, res) => {
    const filePath = path.join(__dirname, '../data/data.json');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Erreur lors de l\'envoi du fichier:', err);
            res.status(500).send('Erreur lors de l\'envoi du fichier');
        }
    });
});

app.post('/possessions', async (req, res) => {
    let newData = req.body
     const filePath = path.join(__dirname, '../data/data.json');
       
    await readFile(filePath).then(data => {
       data.data.push(newData)
       return data.data
       })
       .then(response => {
        writeFile("../data/data.json", response)
    })


    });


    app.put("/possessions/:libelle/update", async (req, res)=>{
        console.log(req.body)
        console.log(req.params.libelle.slice(1))

        const filePath = path.join(__dirname, '../data/data.json');
        await readFile(filePath).then(data => {

            data.data = data.data.map(d => d.libelle == req.params.libelle.slice(1) ? req.body : d)

            return data.data
            // console.log(data.data)
        })
         .then(response =>{
             writeFile("../data/data.json", response)

        })
    
        res.json({message: "updating..."})
    })


app.put("/possession/:libelle/close", async (req, res)=>{
    console.log(req.body)
    console.log(req.params)
    const filePath = path.join(__dirname, '../data/data.json');
    await readFile(filePath).then(data => {
        for(let i = 0; i< data.data.length; i++){
            let alldata = data.data

            if(alldata[i].libelle == req.params.libelle.slice(1)){
                alldata[i].dateFin = req.body.dateFin
            }
        }
        console.log(data.data.length)

         return data.data
    })
    
     .then(response => {
         writeFile("../data/data.json", response)
     })
    
})

// Démarrer le serveur
app.listen(port, () => {
    console.log("App running on port : " + port);
});
