import { useState} from 'react';
import Header from './Components/Layout/Header';
import Meals from './Components/Meal/Meals';
import Cart from './Components/Cart/Cart' ;
import CardProvider from './Components/store/CardProvider';

function App() {
  const [showCart,setShowCart] = useState(false)
  const showCartHandler =()=>{
    setShowCart(true)
  }
  const hideCartHandler = ()=>{
    setShowCart(false)
  }
  return (
    <CardProvider>
      {showCart && <Cart onClose={hideCartHandler}/>}
      <Header showCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CardProvider>
  );
}

export default App;
