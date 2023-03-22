import { useState } from 'react';
import './ProductForm'

function ProductForm(props) {

    const [newTitle, setTitle] = useState("");
    const [newDate, setDate] = useState("");

    function titleChangeHandler(event, PrevState){
        setTitle(event.target.value)
        console.log(event.target.value);
    }
    function dateChangeHandler(event){
        setDate(event.target.value);
        console.log(newDate);
    }
    function submitHandler(event){
        event.preventDefault();
        
        const productData = {
            title : newTitle,
            date : newDate
        }
        // console.log(productData);
        props.onSaveProduct(productData);

        setTitle("");
        setDate("");
    }
    




    return (
        <form className='new-Product__controls' onSubmit={submitHandler}>
            <div className='new-Product__control'>
                <label>Title </label>
                <input type="text" value={newTitle} onChange={titleChangeHandler}></input>
            </div>
            <div className='new-product__control'>
                <label>Date</label>
                <input type="date" value={newDate} onChange={dateChangeHandler} min="2023-01-02" max="2023-12-12"></input>
            </div>

            <div className='new-product-btn'>
                <button type="submit" >Add product</button>
            </div>
        </form>

    );
}

export default ProductForm;