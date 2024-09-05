import { useState, useEffect } from "react";
import Patrimoine from "../../models/Patrimoine";
import Possession from "../../models/possessions/Possession";
import Flux from "../../models/possessions/Flux";

export default function PatrimoineConverter(){
  const [date , setDate] = useState(new Date())
  const [pos, setPos] = useState([]);
  const [realDate, setRealDate] = useState(new Date())
  const [isloading, setLoading] = useState(true)

  function capture(ev){
    setDate(new Date(ev.target.value))
  }
  
  function changeValue(){
    setRealDate(date)
    setValue(patrimoine.getValeur(realDate))
    
  }
    

    useEffect( () => {

        const  dofetch = async () =>{
          const donne = await fetch(`${import.meta.env.VITE_API_URL}/possessions`, {method : "GET"})
          const datas = await donne.json()
    
          let possession =datas[1].data.possessions.map(l => Object.hasOwn(l, "jour") ? new Flux(l.possesseur, l.libelle, l.valeurConstante, new Date(l.dateDebut), l.dateFin, l.tauxAmortissement, l.jour) : new Possession(l.possesseur, l.libelle, l.valeur, new Date(l.dateDebut),l.dateFin, l.tauxAmortissement ))
          setPos(possession)
          setLoading(false)
        
        }
         dofetch()
       }, []);

       let patrimoine = new Patrimoine({"nom": "John Doe"}, pos)

       
       if(isloading == false){
        let p = pos.map(p => p.getValeur(new Date()))
        console.log(p);
       }
    

       return (

        <>
        <p>La valeur de son patrimoine est :</p>
        <h2>{patrimoine.getValeur(realDate)  }</h2>
<div className="change">

<center><input type="date"  onChange={capture}/> <button onClick={changeValue}>Show</button></center>
</div></>
       )

}