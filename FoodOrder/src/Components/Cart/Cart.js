import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import React, {  useContext, useState } from 'react';
import CartContext from '../store/cart-context';
import CartItem from './CartItem'
import Checkout from './Checkout';

const Cart = (props) =>{
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`
  const hasItems = ctx.items.length > 0
  const [isCheckout, setisCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit]=useState(false);
  const orderHandler = ()=>{
    setisCheckout(true)
  }

  const CartItemRemoveHandler = (id)=>{
    ctx.removeItem(id)
  }
  const CartItemAddHandler =(item)=>{
    ctx.addItem({...item,amount:1})
  }
  const submitHandler = async userData =>{
    await fetch('https://food-order-react-app-5d529-default-rtdb.firebaseio.com/orders.json',
    {method:'POST',
    body:JSON.stringify({
      userData:userData,
      ordersItems:ctx.items
    })})
    setIsSubmitting(false)
    setDidSubmit(true)
    ctx.clearCart();
    
  }
  const cartItems = (<ul className={classes['cart-items']}>
     {ctx.items.map((item) => (
        <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} 
          onRemove={CartItemRemoveHandler.bind(null,item.id)} 
          onAdd={CartItemAddHandler.bind(null,item)}>
          </CartItem>
  ))}
    </ul>)

    const ModalActions = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>
  const cartModalContent =<React.Fragment>
     {cartItems}
       {isCheckout && <Checkout onConfirm={submitHandler} onCancel={props.onClose}/>}
       <div className={classes.total}>
         <span>Total Amount</span>
         <span>{totalAmount}</span>
       </div>
       {!isCheckout && ModalActions}
  </React.Fragment>

  const isSubmittingModalContent =<p>Submiting ...</p>
  const didSubmitModalContent =<React.Fragment> <p>Submitted!!</p><div className={classes.actions}>
  <button className={classes['button--alt']} onClick={props.onClose}>Close</button></div></React.Fragment>
  
return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitModalContent}
    </Modal>
   );
   };
export default Cart;