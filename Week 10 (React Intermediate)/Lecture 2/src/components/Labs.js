import { useNavigate } from "react-router-dom";


function Labs(){

    const Navigate = useNavigate();

    function clickHandler(){
        // move to about page
        Navigate("/about");

    }


    return (
        <div>
            Labs Page
            <button onClick={clickHandler}>Move to about page</button>
        </div>
    )
}
export default Labs;