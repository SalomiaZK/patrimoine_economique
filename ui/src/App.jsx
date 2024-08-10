/**
 * NEED TO CHECK WHAT THE HELL IS FLUX USED FOR ? ✅
 * DO WE REALLY NEED A .JSON FILE COZ IT SEEMS LIKE✅
 * MINE IS WORKING FINE WITHOUT IT;✅
 * 
 * GOTTA CHECK WHEN THE HELL DOES IT BEGIN
 */


import {Table} from "react-bootstrap"
import { useState } from "react"
import patrimoine from "../../models/jsonToObject.js"

// or less ideally




function App() {
  const [value, setValue] = useState(patrimoine.getValeur(new Date()).toFixed(3))
  const [date , setDate] = useState(new Date())

  

 
  
  
  function capture(ev){
    setDate(new Date(ev.target.value))
  }
  
  function changeValue(){
    setValue(patrimoine.getValeur(date))
    
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



  let allPos = [ ...patrimoine.possessions]
  console.log(patrimoine.possessions)

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
      </tr>
    {allPos.map(pos =>
    <tr>
      <td >{pos.libelle}</td>
      <td>{pos.tauxAmortissement}</td>
      <td>{pos.valeurConstante || pos.valeur}</td>
      <td>{JSON.stringify(pos.dateDebut).slice(1, 11)}</td>
      <td>{pos.getValeur(new Date(2024, 9, 30))}</td>
      </tr>

    )}
</table>
<br /><p>La valeur de son patrimoine est :</p>

<h2>{value}</h2>
<div className="change">

<center><input type="date" placeholder="hello" onChange={capture}/> <button onClick={changeValue}>Show</button></center>
</div>
    </div>
  )
}

export default App
