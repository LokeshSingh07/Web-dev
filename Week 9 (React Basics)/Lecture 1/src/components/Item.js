import './Item.css'


function Item(props){
    const ItemName = props.name;
    return ( 
        <div>
            <p>{ItemName}</p>

            {/* to show the content which is present in item tag */}
            {props.children}
        </div>
    )

}

export default Item;







