import { useState, useEffect } from "react";
import { Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import Possession from "../../models/possessions/Possession"
import Flux from "../../models/possessions/Flux"

export default function UpdatePossession() {
    const { libelle } = useParams()

    const [pos, setPos] = useState([])
    const [newLibelle, setNewLieblle] = useState(libelle.slice(1))
    const [newDate, setNewDate] = useState(null)
    const [isloading, setLoading] = useState(true)





    useEffect(() => {
        const dofetch = async () => {
            const donne = await fetch(`${import.meta.env.VITE_API_URL}/possessions`, { method: "GET" })
            const datas = await donne.json()
            let possession = datas.map(l => Object.hasOwn(l, "jour") ? new Flux(l.possesseur, l.libelle, l.valeurConstante || l.valeur, new Date(l.dateDebut), null, l.tauxAmortissement, l.jour) : new Possession(l.possesseur, l.libelle, l.valeurConstante || l.valeur, new Date(l.dateDebut), null, l.tauxAmortissement))
            setPos(possession)
            setLoading(false)


        }
        dofetch()
    }, []);




    function handleSubmit() {



        if (isloading == false) {
            let thePoss = pos.filter(p => p.libelle == libelle.slice(1, libelle.length))[0]
            let updatePossession = new Possession("Ilo", newLibelle, thePoss.valeur || thePoss.valeurConstante, thePoss.dateDebut, newDate, thePoss.tauxAmortissement)

            fetch(`${import.meta.env.VITE_API_URL}/possessions/${libelle}/update`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(updatePossession)

            })


        }
    }


    return (
        <center><form >
            <h1>Possession : {libelle.slice(1)}</h1>
            <h2>Update Possession</h2>
            {

                isloading ? "loading..." : pos.map(p => p.libelle == libelle.slice(1, libelle.length) ?
                    <h5>valeur : {p.getValeur(new Date())}</h5> : console.log(libelle)
                )}
            <Col>
                <span className="darker "> nouveau nom: </span> <br />
                <input className="mb-2 " type="text" placeholder="Libellé" onChange={e => e.target.value == "" ? setNewLieblle(libelle.slice(1)) :setNewLieblle(e.target.value) } />
            </Col>
            <Col>
                <span className=" darker"> date fin:
                </span><br />
                <input className="mb-3" type="date" placeholder="date fin" onChange={e => setNewDate(e.target.value)} />
                <br />
            </Col>
            <Link to={"/possessions"} ><button onClick={handleSubmit}>update</button></Link>
        </form>
        </center>
    )
}