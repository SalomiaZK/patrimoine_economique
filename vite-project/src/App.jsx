/**
 * NEED TO CHECK WHAT THE HELL IS FLUX USED FOR ? ✅
 * DO WE REALLY NEED A .JSON FILE COZ IT SEEMS LIKE✅
 * MINE IS WORKING FINE WITHOUT IT;✅
 * 
 * GOTTA CHECK WHEN THE HELL DOES IT BEGIN
 */


import {Table} from "react-bootstrap"
import patrimoine from "../../models/data"
import { useState } from "react"
// or less ideally




function App() {
  const [value, setValue] = useState(patrimoine.getValeur(new Date()))
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
  type : "type"
}
  let allPos = [head, ...patrimoine.possessions]

  
  return(
      <>
          <h1>Patrimoineee heheh</h1>
      <Table>
    {allPos.map(pos =>
    <tr>
      <th>{pos.libelle}</th>
      <th>{pos.tauxAmortissement}</th>
      <th>{pos.type}</th>
      <th>{pos.valeur}</th>
      </tr>

    )}
</Table>

<br />La valeur de son patrimoine est :

<h1>{value}</h1>

<input type="date" onChange={capture}/> <button onClick={changeValue}>Show</button>
    </>
  )
}

export default App
