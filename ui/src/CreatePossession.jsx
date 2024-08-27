import { Col } from 'react-bootstrap'
import Possession from '../../models/possessions/Possession'
import { useState } from 'react'
export default function CreatePossession() {

  const [name, setname] = useState("")
  const [ratio, setRatio] = useState(0)
  const [value, setValue] = useState(0)
  const [date, setDate] = useState(new Date())


  const handleSubmit = (e) => {
    e.preventDefault();
    let newPossession = new Possession("Ilo", name, value, date, ratio)



     fetch("http://localhost:3000/possessions", {
      method: "POST", 
      headers : { "Content-type" : "application/json"}, 
      body: JSON.stringify(newPossession)
     }).then(response => response.json()).then(data =>{
      console.log(data)
     })
  };
  




  return (
    <center><form >
      <h2>Adding Possessions</h2>
      <Col xs={6}><input type="text" placeholder='name' onChange={(e) => setname(e.target.value)} /></Col>
      <Col>      <input type="text" placeholder='Taux d amortissement' onChange={(e) => setRatio(e.target.value)} /> </Col>
      <Col>

        <Col><input type="text" placeholder='Valeur'  onChange={(e) => setValue(e.target.value)}/></Col>     
         <input type="date" placeholder='Date de debut'  onChange={(e) => setDate(e.target.value)}/></Col>

      <button onClick={handleSubmit}>Add</button>
    </form></center>
  )
}