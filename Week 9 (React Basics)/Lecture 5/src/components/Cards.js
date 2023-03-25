import React, {useState} from "react";
import Card from "./Card";




function Cards(props){
    let courses = props.courses;
    let category = props.category;
    const [isLiked, setIsLiked] = useState([]);
    
    
    function getCourses(){
        if(category==="All"){
            let allCourses = [];
            // console.log("Printing courses");
            // console.log(courses);
    
            Object.values(courses).forEach((array)=>{
                array.forEach((course)=>{
                    allCourses.push(course)
                })
            })
            // console.log(allCourses)
            return allCourses;
        }
        else{
            return courses[category];
        }

    }


    return (
        <div className="flex flex-wrap justify-center gap-4 mb-4">
            {
                getCourses()?.map((course)=>{
                    return <Card course={course} isLiked={isLiked} setIsLiked={setIsLiked} key={course.id}/>
                })
            }
        </div>
    )
}
export default Cards;