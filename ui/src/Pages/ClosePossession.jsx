import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
export default function ClosePossession(){


        const {libelle} = useParams()
    fetch(`${import.meta.env.VITE_API_URL}/possession/${libelle}/close`, {
      method: "PUT",
      headers: {"Content-type" : "application/json"}, 
      body: JSON.stringify({ dateFin : new Date()})
    })
    
    console.log("libelle", libelle)
        
      


    return (
      <>
              <h1  className=" m-4">Nice duh, it was closed as well</h1>
                <center><Link to={"/possessions"}><button>home</button></Link></center>
      </>
    )
}