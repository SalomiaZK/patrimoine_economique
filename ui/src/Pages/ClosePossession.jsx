import { useParams } from "react-router-dom"


export default function ClosePossession(){

        const {libelle} = useParams()
    
    
    fetch(`http://localhost:3000/possession/${libelle}/close`, {
      method: "PUT",
      headers: {"Content-type" : "application/json"}, 
      body: JSON.stringify({ dateFin : new Date()})
    })
    
    console.log("libelle", libelle)
        
      


    return (
        <h1>Nice duh, it was closed as well</h1>
    )
}