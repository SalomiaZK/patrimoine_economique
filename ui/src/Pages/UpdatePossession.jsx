import { useState, useEffect } from "react";
import { Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Possession from "../../../models/possessions/Possession"
import Flux from "../../../models/possessions/Flux"

export default function UpdatePossession() {
    const { libelle } = useParams()

    const [pos, setPos] = useState([])
    const [newLibelle, setNewLieblle] = useState('')
    const [newDate, setNewDate] = useState(new Date())
    const [isloading, setLoading] = useState(true)




    useEffect(() => {
        const dofetch = async () => {
            const donne = await fetch('http://localhost:3000/possessions', { method: "GET" })
            const datas = await donne.json()
            let possession = datas.map(l => Object.hasOwn(l, "jour") ? new Flux(l.possesseur, l.libelle, l.valeurConstante || l.valeur, new Date(l.dateDebut), null,l.tauxAmortissement, l.jour) : new Possession(l.possesseur, l.libelle, l.valeurConstante || l.valeur, new Date(l.dateDebut),null,  l.tauxAmortissement))
            setPos(possession)
            setLoading(false)


        }
        dofetch()
    }, []);




    function handleSubmit(e) {
        e.preventDefault()



        if (isloading == false) {
            let thePoss = pos.filter(p => p.libelle == libelle.slice(1, libelle.length))[0]
            let updatePossession = new Possession("Ilo", newLibelle, thePoss.valeur || thePoss.valeurConstante, thePoss.dateDebut, newDate, thePoss.tauxAmortissement)

            fetch(`http://localhost:3000/possessions/${libelle}/update`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(updatePossession)

            })

            
        }
    }


    return (
        <center><form action="">
            <h1>Poosseesion {libelle}</h1>
            <h2>Update Possession</h2>
            {
            
          isloading ? "loading..." : pos.map(p => p.libelle == libelle.slice(1, libelle.length) ?
                <h3>valeur : {p.getValeur(new Date())}</h3> : console.log(libelle)
            )}
            <Col>
                <input type="text" placeholder="Libellé" onChange={e => setNewLieblle(e.target.value)} />
            </Col>
            <Col>
                <input type="date" placeholder="date fin" onChange={e => setNewDate(e.target.value)} />
            </Col>
            <button onClick={handleSubmit}>update</button>
        </form>
        </center>
    )
}