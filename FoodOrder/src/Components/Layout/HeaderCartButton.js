import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import { useState } from 'react/cjs/react.development';
import { useContext, useEffect } from 'react';
import cartContext from '../store/cart-context';

const HeaderCartButton = (props) => { 
    const [isButtonHighlighted,setisButtonHighlighted]=useState(false);
    const ctx = useContext(cartContext);
    const NumberOfItemsInCart = ctx.items.reduce((curNumber,item)=>{
      return curNumber + item.amount
    },0)
    const {items} = ctx
    useEffect(()=>{
      if(items.length ===0){
        return
      }
      setisButtonHighlighted(true);
      const timer = setTimeout(()=>{
          setisButtonHighlighted(false)
        },300)
      return ()=>{
        clearTimeout(timer)
      }
    },[items])
    const btnClass = `${classes.button} ${isButtonHighlighted ? classes.bump: ''}`
    return (
      <button className={btnClass} onClick={props.onClick}>
         <span className={classes.icon}>
           <CartIcon />
         </span>
         <span>Your Cart</span>
         <span className={classes.badge}>{NumberOfItemsInCart}</span>
      </button>
    );
  };

export default HeaderCartButton