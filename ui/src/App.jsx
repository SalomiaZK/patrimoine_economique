import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Today from "./Today"
import HomePage from "./HomePage"
import Lost from "./Lost"
import CreatePossession from "./CreatePossession"
import UpdatePossession from "./UpdatePossession"
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
   
])

export default function App (){
    return (
        <RouterProvider router={route}/>
    )
}