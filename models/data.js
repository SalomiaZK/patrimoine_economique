import Argent from "./possessions/Argent.js"
import Possession from "./possessions/Possession.js"
import Patrimoine from "./Patrimoine.js"
import Flux from "./possessions/Flux.js"

let salaire = new Argent("Ilo", "salaire", 400000, new Date(),0, "Courant")

let ordi = new Possession("ilo", "ordi", 2000000, new Date(), 10 )
let clothes = new Possession("ilo", "effet Vestimentaires", 1000000, new Date(), 20)
let flux = new Flux("ilo", "depenses", -500000, new Date(), 0, new Date().getDay() )
let posFlux = new Flux ('ilo', "salaire mensuel", 600000, new Date(), 0, new Date().getDay())




let patrimoine= new Patrimoine("Ilo", [ clothes, ordi, salaire, flux, posFlux])

console.log(patrimoine.getValeur(new Date(2024, 8, 4)));
console.log(patrimoine.getValeur(new Date(2024, 8, 4)));
console.log(patrimoine.getValeur(new Date(2024, 11, 4)));


console.log(flux.getValeur(new Date(2024, 8, 4)));
console.log(flux.getValeur(new Date(2024, 8, 4)));
console.log(flux.getValeur(new Date(2024, 8, 4)));

console.log(posFlux.getValeur(new Date(2024, 8, 4)));
console.log(posFlux.getValeur(new Date(2024, 8, 4)));
console.log(posFlux.valeur);
console.log(posFlux.getValeur(new Date(2024, 8, 4)));






export default patrimoine;  