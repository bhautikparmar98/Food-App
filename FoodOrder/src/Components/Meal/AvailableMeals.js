import Card from '../UI/Card'
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import { useState, useEffect } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];

const AvailableMeals = () => {
    
const [Meals, setMeals] = useState([]);
const [isLoading, setisLoading] = useState(true);
const [error, setError] = useState()
useEffect(()=>{
    const fetchMeals = async ()=>{
    const response = await fetch('https://food-order-react-app-5d529-default-rtdb.firebaseio.com/meals.json');
    
    if(!response.ok){
        throw new Error("Failed to Fetch")
    }
    
    const responseData = await response.json();
    console.log(responseData)
    const loadedMeals= []
    for(const key in responseData){
        loadedMeals.push({
            id:key,
            name:responseData[key].name,
            description:responseData[key].description,
            price:responseData[key].price
        })
    }
    console.log(loadedMeals);
    setMeals(loadedMeals);
    setisLoading(false)
    }
    fetchMeals().catch(error=>{
        setError(true);
        setisLoading(false)
       
    });
   
},[])
    const mealsList = Meals.map(meal => <MealItem 
        key={meal.id} 
        id={meal.id}
        name={meal.name} 
        description={meal.description} 
        price={meal.price} />);
    return <Fragment>
        {isLoading && <p className={classes.isLoading}>Loading...</p>}
        {error && <p className={classes.error}>Failed to Fetch!</p>}
        {!isLoading && !error && <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>}
    </Fragment>
    
};
export default AvailableMeals;