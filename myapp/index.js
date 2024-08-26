import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Obtenir le répertoire du fichier actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware pour gérer les CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Route principale
app.get("/", (req, res) => {
    res.send("it's working");
});

// Route pour le téléchargement de fichier
app.get('/possessions', (req, res) => {
    const filePath = path.join(__dirname, '../data/data.json');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Erreur lors de l\'envoi du fichier:', err);
            res.status(500).send('Erreur lors de l\'envoi du fichier');
        }
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log("App running on port : " + port);
});
