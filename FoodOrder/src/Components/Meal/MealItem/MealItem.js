import { useContext } from 'react';
import cartContext from '../../store/cart-context';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const ctx = useContext(cartContext)
  const AddtoCartHandler = (amount)=>{
    const item ={
      name:props.name,
      amount:amount,
      price:props.price,
      id:props.id
    }
    ctx.addItem(item)
  }
  return (
   <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <MealItemForm id={props.id} onAddtoCart={AddtoCartHandler}/>
    </li>
  );
};

export default MealItem