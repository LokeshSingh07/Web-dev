import { useNavigate } from "react-router-dom";

function About(){

    const Navigate = useNavigate();

    function clickHandler(){
        // move to About page
        Navigate("/support");

    }


    return (
        <div>
            Labs Page
            <button onClick={clickHandler}>Move to support page</button>
        </div>
    )
}
export default About;