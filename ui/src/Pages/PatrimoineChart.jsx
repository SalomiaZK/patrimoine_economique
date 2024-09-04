import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';



import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

import { useState, useEffect } from 'react'
import Patrimoine from '../../../models/Patrimoine'
import Possession from '../../models/possessions/Possession'
import Flux from '../../models/possessions/Flux'



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default function PatrimoineChart() {
    const [theDay, setTheDay] = useState(1)
    const [beginningDate, setBeginningDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [pos, setPos] = useState([]);
    const [isloading, setLoading] = useState(true)
    const [realStartDate , setStartRealDate] = useState(new Date())
    const [realEndDate , setRealEndDate] = useState(new Date())

    const defaultData = {
        labels: [] ,
        datasets: [
            {
                label: 'Valeur du Flux',
                data: [],
                borderColor: "cyan",
                backgroundColor: "white"
            }
        ]
    }



    const day = ["day",
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30
    ]



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

    if(isloading == false){

    let patrimoine = new Patrimoine("Ilo", pos)
    let listeDate = getDatesWithDayBetweenDates(realStartDate, realEndDate, theDay).map(d => new Date(d).toLocaleDateString())
    let listValue = listeDate.map(l => patrimoine.getValeur(new Date(l)))


    const linearData = {
        labels: listeDate ,
        datasets: [
            {
                label: 'Valeur du Patrimoine',
                data: listValue,
                borderColor: "cyan",
                backgroundColor: "white"
            }
        ]
    }


   

    const option = {}


  


    function getDatesWithDayBetweenDates(startDate, endDate, day) {
        const start = new Date(startDate);
        const end = new Date(endDate);
      
        if (end < start) {
          alert('La date de fin doit être après la date de début.');
        }
      
        const dates = [];
      
        let currentMonth = start.getMonth();
        let currentYear = start.getFullYear();
      
        while (currentYear < end.getFullYear() || (currentYear === end.getFullYear() && currentMonth <= end.getMonth())) {
          const date = new Date(currentYear, currentMonth, day);
      
          if (date >= start && date <= end) {
            dates.push(date);
          }
      
          if (currentMonth === 11) {
            currentMonth = 0;
            currentYear += 1;
          } else {
            currentMonth += 1;
          }
        }
      
        return dates;
      }



     

   

   


    

    return (
        <>
            <div className='d-flex justify-content-around'>
                <div>
                <span>Date debut</span> <br />
                <input type="date"  onChange={(e)=> setBeginningDate(e.target.value)}/>
                </div>
                <div>
                <span>Date fin</span> <br />
                <input type="date" onChange={(e)=> setEndDate(e.target.value)} />
                </div>


                <div>
                    <span>day</span><br />
                <select className='bg-dark' onChange={(e) => setTheDay(e.target.value)} >
                    {day.map(d =>
                        <option>{d}</option>
                    )}

                </select>
                <Badge bg="primary" as={Button} onClick={()=>{
                    setRealEndDate(endDate)
                    setStartRealDate(beginningDate)


                }} >Set</Badge>
                </div>
            </div>
            <div className='line'>
           <center><Line className='line' options={option} data={linearData} /></center> 
           </div>
        </>
    )}

    return (
        <h1>Loading...</h1>
    )
}