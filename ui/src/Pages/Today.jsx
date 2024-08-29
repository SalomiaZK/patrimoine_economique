


import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Patrimoine from "../../../models/Patrimoine"
import Possession from "../../../models/possessions/Possession"
import Flux from "../../../models/possessions/Flux"


let id = 1

export default function Today() {
  const [date , setDate] = useState(new Date())
  const [pos, setPos] = useState([]);
  const [realDate, setRealDate] = useState(new Date())
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


   
   let patrimoine = new Patrimoine("Ilo", pos)


 
   if(isloading == false){
    let p = pos.map(p => p.getValeur(new Date()))
    console.log(p);
   }

  
  function capture(ev){
    setDate(new Date(ev.target.value))
  }
  
  function changeValue(){
    setRealDate(date)
    setValue(patrimoine.getValeur(realDate))
    
  }


  




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

      <table striped bordered hover>
      <tr>
      <th >{head.libelle}</th>
      <th>{head.tauxAmortissement}</th>
      <th>{head.valeurConstante || head.valeur}</th>
      <th>{JSON.stringify(head.dateDebut).slice(1, 11)}</th>
      <th>{head.getValeur(new Date(2024, 9, 30))}</th>
      <th>Date fin</th>

      </tr>
    {pos.map(pos =>
    <tr>
      <td >{pos.libelle}</td>
      <td>{pos.tauxAmortissement}</td>
      <td>{pos.valeurConstante || pos.valeur}</td>
      <td>{JSON.stringify(pos.dateDebut).slice(1, 11)}</td>
      <td>{pos.getValeur(new Date(2024, 9, 30))}</td>
      <td>{pos.dateFin}</td>



      <Link to={"/possession/:"+ pos.libelle +"/update"}><button>edit</button></Link>
     <Link to={"/possession/:"+ pos.libelle +"/close"}><button>Close</button></Link>
      </tr>

    )}
</table>
    <Link to={"/patrimoine/range"}>Patrimoine</Link>
    <Link to="/possession/create"><button>add pos</button></Link>
<br /><p>La valeur de son patrimoine est :</p>

<h2>{patrimoine.getValeur(realDate)  }</h2>
<div className="change">

<center><input type="date"  onChange={capture}/> <button onClick={changeValue}>Show</button></center>
</div>
    </div>
  )
}

