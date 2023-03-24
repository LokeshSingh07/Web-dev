import Card from "./Card";




function Cards({courses}){

    let allCourses = [];

    const getCourses = ()=>{
        console.log("Printing courses");
        console.log(courses);
        Object.values(courses).forEach((courseCategory)=>{
            courseCategory.forEach((course)=>{
                allCourses.push(course)
            })
        })
        return allCourses;
    }


    return (
        <div>
            {
                getCourses()?.map((course)=>{
                    return <Card course={course} key={course.id}/>
                })
            }
        </div>
    )
}
export default Cards;