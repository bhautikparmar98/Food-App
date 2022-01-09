import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items:[],
    totalAmount:0
}
const ReducerFunc =(state,action)=>{
    if(action.type === "ADD" ){
        const existingcartItemIndex = state.items.findIndex((item)=>{
            return item.id === action.item.id
        })
        const existingcartItem = state.items[existingcartItemIndex];
        let updatedItems
        if(existingcartItem){   
            const updatedCartItem={
                ...existingcartItem,
                amount:existingcartItem.amount + action.item.amount
            }
            updatedItems=[...state.items];
            updatedItems[existingcartItemIndex]= updatedCartItem;
        }else{
             updatedItems = state.items.concat(action.item);
        }
        const totalAmount = state.totalAmount + action.item.amount * action.item.price
        return {
            items:updatedItems,
            totalAmount:totalAmount
        }
    }
    if(action.type === "REMOVE"){
        const existingcartItemIndex = state.items.findIndex((item)=>{
            return item.id === action.id
        })
        const existingcartItem = state.items[existingcartItemIndex];
        const UpdatedtotalAmount = state.totalAmount - existingcartItem.price;
        let updatedItems
        console.log(existingcartItem)
        if(existingcartItem.amount === 1){
            updatedItems=state.items.filter(item=>item.id !== action.id);
        }else{
            const UpdatedItem ={...existingcartItem, amount:existingcartItem.amount-1}
            updatedItems = [...state.items]
            updatedItems[existingcartItemIndex]= UpdatedItem;
            console.log(UpdatedItem)
        }
        return {
            items:updatedItems,
            totalAmount:UpdatedtotalAmount
        }
    }
    if(action.type==="CLEAR"){
        return defaultCartState
    }
    return defaultCartState
}

const CardProvider = (props)=>{
    const [CartState,dispatchCartAction] = useReducer(ReducerFunc,defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({
            type:"ADD",
            item:item
        })
    };
    const removeItemFromCartHandler = id => {
        dispatchCartAction({type:"REMOVE",id:id})
    };
    const clearCartHandler = ()=>{
        dispatchCartAction({type:"CLEAR"})
    }
    
    const cartContext = {
        items: CartState.items,
        totalAmount: CartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    };
    return(
        <CartContext.Provider value={cartContext} >
            {props.children}
        </CartContext.Provider>
    )
}
export default CardProvider