import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Today from "./Today"
import HomePage from "./HomePage"
import Lost from "./Lost"
import AddPossession from "./AddPossession"
const route = createBrowserRouter([
    {
        path: "/",
        element : <HomePage/>, 
        children : [
            {
                path : "/today", 
                element : <Today/>
            }
        ]
    }, 

    {
        path : "*", 
        element : <Lost/>
    },
    {
        path: "/addPossession", 
        element : <AddPossession/>
    }
   
])

export default function App (){
    return (
        <RouterProvider router={route}/>
    )
}