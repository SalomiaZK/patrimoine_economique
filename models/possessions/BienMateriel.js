import Possession from "./Possession.js";
export default class BienMateriel extends Possession {
  constructor(possesseur, libelle, valeur, dateDebut, tauxAmortissement) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
  }

  getValeur(date) {
    super.getValeur(date);
  }
}
