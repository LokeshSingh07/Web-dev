import { useNavigate } from "react-router-dom";

function Labs(){

    const Navigate = useNavigate();

    function clickHandler(){
        // move to about page
        Navigate("/labs");
    }
    function backHandler(){
        Navigate(-1);
    }


    return (
        <div>
            Labs Page
            <button onClick={clickHandler}>Move to Lab page</button>
            <button onClick={backHandler}>Go back</button>
        </div>
    )
}
export default Labs;