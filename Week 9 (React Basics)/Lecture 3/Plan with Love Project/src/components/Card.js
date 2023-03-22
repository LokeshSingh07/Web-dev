import { useState } from "react";


export default (props) => {
    const [readMore, setReadMore] = useState(false);
    
    const image = props.image;
    const  price = props.price;
    const name = props.name;
    const description = readMore ? props.info : `${props.info.substring(0,200)}...`;
    const removeTourHandler = props.removeTour;
    const id = props.id;

    function readMoreHandler(){
        setReadMore(!readMore);
    }




    return (
        <div className="w-[300px] h-full flex flex-col gap-5 border rounded-md p-2 my-5 mx-auto group shadow-2xl">
            <div className="w-full relative ">
                <img src={image} className="aspect-square rounded-lg group-hover:scale-[1.02] duration-200"></img>
            </div>
            <div className="">
                <h4 className="text-2xl text-green-700 font-bold">₹{price}</h4>
                <h4 className="text-xl font-bold">{name}</h4>
            </div>
            <div className="min-h-[170px] text-md text-justify mx-3">
                {description}
                <span className="text-blue-600" onClick={readMoreHandler}>
                    {readMore ? 'show less' : 'show more'}
                </span>
            </div>
            <button className="text-xl bg-red-600 text-white rounded-md py-2 hover:bg-red-500" onClick={()=>removeTourHandler(id)}>Not Interested</button>
            
        </div>
    )
}