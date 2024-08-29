import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Today from "./Pages/Today"
import HomePage from "./Pages/HomePage"
import Lost from "./Pages/Lost"
import CreatePossession from "./Pages/CreatePossession"
import ClosePossession from "./Pages/ClosePossession"
import UpdatePossession from "./Pages/UpdatePossession"
import PatrimoineChart from "./Pages/PatrimoineChart"
import Welcome from "./Pages/Welcome"
import PatrimoineConverter from "./Pages/PatrimoineConverter"


const route = createBrowserRouter([
    {
        path: "/",
        element : <HomePage/>, 
        children : [
            {
                path : "/possessions", 
                element : <Today/>
            },
            {
                path : "/", 
                element : <Welcome/>
            },
            {
                path: "/possession/create", 
                element : <CreatePossession/>
            }
            , 
            {
                path : '/possession/:libelle/update', 
                element : <UpdatePossession/>
            }
            , 
    {
        path : '/patrimoine/range', 
        element : <PatrimoineChart/>
    }
    , 
    {
        path : '/possession/:libelle/close', 
        element : <ClosePossession/>
    }, 
    {
        path: '/patrimoine', 
        element: <PatrimoineConverter/>
    }
            
        ]
    }, 

    {
        path : "*", 
        element : <Lost/>
    }
   
    
    
])

export default function App (){
    return (
        <RouterProvider router={route}/>
    )
}