import "./productCard.css";
export default function ProductCard(props){
    return(
        <div>
            <img src={props.img}/>
            <span>{props.name}</span><br/>
            <span>{props.price}</span><br />
        </div>
    )
}