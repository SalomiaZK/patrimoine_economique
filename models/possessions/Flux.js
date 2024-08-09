// THIS MAY CHANGE IN THE FUTURE
// dateDebut = 01/01/2024
// montant = 400_000
// jour = 1
import Possession from "./Possession.js";
export default class Flux extends Possession {
  // Si salaire => +
  // Si train de vie => -
  constructor(possesseur, libelle, valeurConstante, dateDebut, tauxAmortissement, jour) {
    super(possesseur, libelle, dateDebut, tauxAmortissement)
    this.valeur = 0;
    this.jour = jour;
    this.tauxAmortissement = tauxAmortissement
    // this.source = source; // null || Compte
    // this.destination = destination; // Compte
    this.dateDebut = dateDebut;
    this.valeurConstante = valeurConstante 
  }


  getValeur(date) {

    if(this.dateDebut >date){
      return 0
    }
    const nombreDeMois = (debut, dateEvaluation, jourJ) => {
        
        let compteur = 0; // a quoi ca sert
  
        // si le jour est inferieur au jour angalana an le truc du coup y a deja un mois de passé
        if (debut.getDate() < jourJ ) {
            compteur++;
        }
        
        // si tsy mitovy ny année de debut et l année de la date d evale alors ca fait aussi un mois
        if ((dateEvaluation.getDate() >= jourJ && !(debut.getFullYear() === dateEvaluation.getFullYear() && debut.getMonth() === dateEvaluation.getMonth())) ) {
            compteur++;
        }
        let totalMois = (dateEvaluation.getFullYear() - debut.getFullYear()) * 12 + (dateEvaluation.getMonth() - debut.getMonth()) - 1;
    
        compteur += Math.max(0, totalMois);
    
        return compteur;
    }

    // calcul montant total
        //ty le ovaina date today ihany    //picker      //le jour pour le calculer
                              //today          today     today
    this.valeur = nombreDeMois(this.dateDebut, date, this.jour) * this.valeurConstante;
return this.valeur     

  }
}