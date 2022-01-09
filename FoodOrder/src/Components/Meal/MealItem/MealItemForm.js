import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import {useRef ,useState} from 'react';


 const MealItemForm = props => {
    const [amountisValid,setamountisValid] = useState(true)
    const amountInputRef = useRef();

    const submitHandler = (event)=>{
        event.preventDefault()
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount
        if(enteredAmount.trim().length ===0 ||enteredAmountNumber<1 || enteredAmountNumber>5){
            setamountisValid(false);
            return
        }
        props.onAddtoCart(enteredAmountNumber)
    }
    
  return <form className={classes.form} onSubmit={submitHandler}>
    <Input label="amount" ref={amountInputRef}
        input={{
            id:'amount_' + props.id,
            type:'number',
            min:'1',
            max:'5',
            defaultValue:'1',
            step:'1'
        }}
        />
    <button >+ Add</button>
    {!amountisValid && <p>Please enter valid Amount(1 -5)</p> }
 </form>
};
export default MealItemForm;