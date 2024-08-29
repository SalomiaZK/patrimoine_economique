

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Possession from "../../../models/possessions/Possession"
import Flux from "../../../models/possessions/Flux"


let id = 1

export default function Today() {
  const [pos, setPos] = useState([]);
  const [isloading, setLoading] = useState(true)




  useEffect( () => {

    const  dofetch = async () =>{
      const donne = await fetch('http://localhost:3000/possessions', {method : "GET"})
      const datas = await donne.json()

      console.log(datas)
      let possession = datas.map(l => Object.hasOwn(l, "jour") ? new Flux(l.possesseur, l.libelle, l.valeurConstante, new Date(l.dateDebut), l.dateFin, l.tauxAmortissement, l.jour) : new Possession(l.possesseur, l.libelle, l.valeur, new Date(l.dateDebut),l.dateFin, l.tauxAmortissement ))
      setPos(possession)
      setLoading(false)
    
    }
     dofetch()
   }, []);

   if(isloading == false){
    
  

   


 
 
  



  




const head = {
  possesseur: "possesseur",
  libelle : "libellé",
  valeur : "valeur",  
  dateDebut : "date Debut",
  tauxAmortissement : "taux d'amortissement en %",
  valeurConstante :"valeur de base",

 getValeur(){
    return "valeur Maintenant";
  }
}





  return(
      <div>
          <h1>Patrimoine Economique de : Ilo</h1>
          <p className="today">La date actuelle est {JSON.stringify(new Date(2024, 7, 10)).slice(1,11)}</p>

     <center> <table >
      <tr>
      <th className="text-center mt-1 bg-black h-10 w-10" >{head.libelle}</th>
      <th className="text-center mt-1 bg-black h-10 w-10">{head.tauxAmortissement}</th>
      <th className="text-center mt-1 bg-black h-10 w-10">{head.valeurConstante || head.valeur}</th>
      <th className="text-center mt-1 bg-black h-10 w-10">{JSON.stringify(head.dateDebut).slice(1, 11)}</th>
      <th className="text-center mt-1 bg-black h-10 w-10">{head.getValeur(new Date(2024, 9, 30))}</th>
      <th className="text-center mt-1 bg-black h-10 w-10">Date fin</th>
      <th className="text-center mt-1 bg-black h-10 w-10">Action</th>

      </tr>
    {pos.map(pos =>
    <tr>
      <td className="text-center w-5 h-5 border-bottom border-black" >{pos.libelle}</td>
      <td className="text-center w-5 h-5 border-bottom border-black">{pos.tauxAmortissement}</td>
      <td className="text-center w-5 h-5 border-bottom border-black">{pos.valeurConstante || pos.valeur || 0}</td>
      <td className="text-center w-5 h-5 border-bottom border-black">{new Date(pos.dateDebut).toLocaleDateString()}</td>
      <td className="text-center w-5 h-5 border-bottom border-black">{pos.getValeur(new Date())}</td>
      <td className="text-center w-5 h-5 border-bottom border-black">{pos.dateFin}</td>



      <Link to={"/possession/:"+ pos.libelle +"/update"}><Badge bg="primary" className='lilButton' as={Button}>edit</Badge></Link>
     <Link to={"/possession/:"+ pos.libelle +"/close"}><Badge bg="danger" className='lilButton' as={Button}>Close</Badge></Link>
      </tr>

    )}
</table>
</center>
    <center><Link to="/possession/create"><Badge className='align-self-center bigButton mt-3' as={Button}>Ajouter une Possession</Badge></Link></center>
<br />


    </div>
  ) }

  return(
   <h1>Loading...</h1>
  )
}

