import "./Landing.css"
import Footer from "../../components/Footer/Footer";

const Landing = () => {
    return (
        <div className="container" >
            <div className="container2">
                <h1>Main info</h1>
                <img src="difusor.jpeg" alt="" />
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Landing;