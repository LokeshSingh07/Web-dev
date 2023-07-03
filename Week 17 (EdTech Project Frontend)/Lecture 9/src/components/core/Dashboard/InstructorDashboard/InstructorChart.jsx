import React, { useState } from 'react'
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables);



const InstructorChart = ({courses}) => {

    const [currentChart, setCurrentChart] = useState("students");

    // function to generate random color
    const getRandomColors = (numColors)=>{
        const colors = [];

        for(let i=0; i<numColors; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 
                ${Math.floor(Math.random() * 256)})`;

        colors.push(color);
        }
        return colors;
    }


    // create data for chart displaying student info
    const chartDataForStudents = {
        labels: courses.map((course)=> course.courseName),
        datasets: [
            {
                data: courses.map((course)=> course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }



    // create data for chart displaying income info
    const chartDataForIncome = {
        labels: courses.map((course)=> course.courseName),
        datasets: [
            {
                data: courses.map((course)=> course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }



    // create options
    const options = {

    };





  return (
    <div className='p-5'>
        <p className='font-bold'>Visualise</p>
        <div className='flex gap-2'>
            <button
                onClick={()=> setCurrentChart("students")}
                className={`${currentChart === "students" ? "text-yellow-50 bg-richblack-700" : "text-yellow-300"} 
                px-2 py-1 rounded-md`}
            >
                student
            </button>
            <button
                onClick={()=> setCurrentChart("income")}
                className={`${currentChart === "income" ? "text-yellow-50 bg-richblack-700" : "text-yellow-300"} 
                px-2 py-1 rounded-md`}
            >
                income
            </button>
        </div>


        {/* PIE Chart */}
        <div className='min-h-[500px]'>
            <Pie
                data={currentChart === "students" ? chartDataForStudents : chartDataForIncome}
                options={options}
            />

        </div>

    </div>
  )
}

export default InstructorChart
