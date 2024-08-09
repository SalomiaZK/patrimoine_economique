export default class Possession {
  constructor(possesseur, libelle, valeur, dateDebut, tauxAmortissement) {
    this.possesseur = possesseur;
    this.libelle = libelle;
    this.valeur = valeur;
    this.dateDebut = dateDebut;
    this.tauxAmortissement = tauxAmortissement;
  }

  // pour avoir la valeur apres amortissement
  getValeur(date) {
    if(date < this.dateDebut){
      return 0
    }
    return this.getValeurApresAmortissement(date);
  }

  getValeurApresAmortissement(dateActuelle) {
    if (dateActuelle < this.dateDebut) {
      return 0;
    }
    const differenceDate = {
      year: dateActuelle.getFullYear() - this.dateDebut.getFullYear(), // soustrait l année
      month: dateActuelle.getMonth() - this.dateDebut.getMonth(), // soustrait le mois
      day: dateActuelle.getDate() - this.dateDebut.getDate(),// soustrait le jours
    };

    // difference => la durée
  
    var raison = differenceDate.year + differenceDate.month / 12 + differenceDate.day / 365; // durée en jours

    const result = this.valeur - this.valeur *(raison * this.tauxAmortissement / 100);
    return result;
  }
}
