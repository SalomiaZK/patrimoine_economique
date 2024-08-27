import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Today from "./Today"
import HomePage from "./HomePage"
import Lost from "./Lost"
import CreatePossession from "./CreatePossession"
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
        path: "/createPossession", 
        element : <CreatePossession/>
    }
   
])

export default function App (){
    return (
        <RouterProvider router={route}/>
    )
}