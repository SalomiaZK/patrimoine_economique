import { Link } from "react-router-dom"

export default function Lost(){
    return (
        <>
        <h1>Sorry dude ☹️, you got lost 🤕 </h1>
        <p >You could go back to :</p>
        <Link className="text-center" to={"/"}>Home</Link>
                <p>or</p>
        <Link to={"/possessions"}>Converter</Link>
        </>
    )
}