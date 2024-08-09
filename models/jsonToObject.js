import data from "../data/data.json" with { type: "json" };
import Patrimoine from "./Patrimoine.js";
import Possession from "./possessions/Possession.js";
import Flux from "./possessions/Flux.js"

const jsonString = JSON.stringify(data[1].data.possessions);


const obj = JSON.parse(jsonString);
let liste = obj.map(o => JSON.parse(JSON.stringify(o)))

let possessions = liste.map(l => Object.hasOwn(l, "jour") ? new Flux(l.possesseur, l.libelle, l.valeurConstante, new Date(l.dateDebut), l.tauxAmortissement, l.jour) : new Possession(l.possesseur, l.libelle, l.valeur, new Date(l.dateDebut), l.tauxAmortissement))
let patrimoine = new Patrimoine("John Doe", possessions)

let flux = new Flux("", "", 500, new Date(), 0, 1)
console.log(flux.getValeur(new Date(2024, 7, 9)));

export default patrimoine;

