import { Col } from 'react-bootstrap'
import Possession from '../../models/possessions/Possession'
import { useState } from 'react'
import { Link } from 'react-router-dom'
export default function CreatePossession() {

  const [name, setname] = useState("")
  const [ratio, setRatio] = useState(0)
  const [value, setValue] = useState(0)
  const [date, setDate] = useState(new Date())


  const handleSubmit = (ev) => {
    let newPossession = new Possession({"nom": "John Doe"}, name, value, date, null, ratio)


    

    if (name == "" || value == "") {
      ev.preventDefault()
      alert("name and value shouldn't be empty")
    } else {
      fetch(`${import.meta.env.VITE_API_URL}/possessions`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newPossession)
      }).then(response => response.json())
    };

  }



  return (
    <center><form >
      <h2>Adding Possessions</h2>
      <Col xs={6}><input type="text" placeholder='name' onChange={(e) => setname(e.target.value)} /></Col>
      <Col>      <input type="text" placeholder='Taux d amortissement' onChange={(e) => setRatio(e.target.value)} /> </Col>
      <Col>

        <Col><input type="text" placeholder='Valeur' onChange={(e) => setValue(e.target.value)} /></Col>
        <input type="date" placeholder='Date de debut' onChange={(e) => setDate(e.target.value)} /></Col>
<Link to={"/possessions"}>
     <button onClick={handleSubmit}>Add</button></Link>
    </form></center>
  )
}