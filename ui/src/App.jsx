import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Today from "./Pages/Today"
import HomePage from "./Pages/HomePage"
import Lost from "./Pages/Lost"
import CreatePossession from "./Pages/CreatePossession"
import ClosePossession from "./Pages/ClosePossession"
import UpdatePossession from "./Pages/UpdatePossession"
import PatrimoineChart from "./Pages/PatrimoineChart"


const route = createBrowserRouter([
    {
        path: "/",
        element : <HomePage/>, 
        children : [
            {
                path : "/possessions", 
                element : <Today/>
            }
        ]
    }, 

    {
        path : "*", 
        element : <Lost/>
    },
    {
        path: "/possession/create", 
        element : <CreatePossession/>
    }, 
    {
        path : '/possession/:libelle/update', 
        element : <UpdatePossession/>
    }
    , 
    {
        path : '/possession/:libelle/close', 
        element : <ClosePossession/>
    }
    , 
    {
        path : '/patrimoine/range', 
        element : <PatrimoineChart/>
    }
])

export default function App (){
    return (
        <RouterProvider router={route}/>
    )
}