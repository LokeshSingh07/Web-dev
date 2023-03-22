import { useState } from 'react'
import Card from './Card'

export default ({tours,removeTour})=>{

    



    return (
        <div className='max-w-[1080px] flex flex-row justify-center flex-wrap mx-auto'>
            {
                tours.map((tour) => {
                    return <Card key={tour.id} {...tour} removeTour={removeTour}></Card>
                })
            }
        </div>
    )
}