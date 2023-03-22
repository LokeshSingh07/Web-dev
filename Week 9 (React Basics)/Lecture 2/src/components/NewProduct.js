import './NewProduct.css'
import ProductForm from './ProductForm';

function NewProduct(props) {

    function saveProduct(product){
        console.log("I am inside a new prouduct");
        console.log(product);

        // calling parent function
        props.printProduct(product);
    }



    return (
    <div className='new-product'>
        <ProductForm onSaveProduct={saveProduct}/>
    
    </div>)
}

export default NewProduct;