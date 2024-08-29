import { Link, Outlet } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'

import Row from "react-bootstrap/Row"

export default function HomePage() {
    return (
        <>
            <div class="p-3  cyanBg text-white d-flex justify-content-around">
                <Link className="text-white" to={"/possessions"}> Possessions List</Link>
                <Link className="text-white" to={"/patrimoine/range"}> Patrimoine Chart</Link>
                <Link className="text-white" to={"/patrimoine"}> Patrimoine</Link>

            </div>


            <Row><Outlet /></Row>


        </>
    )
}