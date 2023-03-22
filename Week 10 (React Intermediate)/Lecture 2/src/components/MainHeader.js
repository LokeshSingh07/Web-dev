import { Outlet } from "react-router-dom";

function MainHeader(){
    return (
        <div>
            {/* child route ko render hone ki permission de di */}
            <Outlet></Outlet>
        </div>
    )
}
export default MainHeader;