import { Form, Col } from "react-bootstrap"
export default function AddPossession (){
    return (
       <Form>
        <input type="text" placeholder="Possession libellé" /> 
       <Col> <input type="text" placeholder="Possession value" /></Col>
       <Col> <input type="date" placeholder="Date debut" /></Col>
       <Col> <input type="text" placeholder="taux amortissement" /></Col>


        <button>Add</button>
       </Form>
    )
}