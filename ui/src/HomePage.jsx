import { Link, Outlet } from "react-router-dom"
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.min.js'
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

export default function HomePage() {
    return (
        <>
            <Container>
                <Row>
               
                  <Row><Link to={"/today"}> <h3> today</h3></Link></Row>  

                  <Row><Link to={"/"}> <h3> Home</h3></Link></Row>  
                </Row>

                <Row><Outlet /></Row>
            </Container>


            
        </>
    )
}