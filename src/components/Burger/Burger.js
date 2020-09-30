import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngridients'

const burger = (props) => {
    let transformIngredients = Object.keys(props.ingredients)
    .map(ingredientName => {
        return [...Array(props.ingredients[ingredientName])].map((_,i) => {
            return <BurgerIngredients key={ingredientName+i} type={ingredientName}/>
        })
    })
    .reduce((arr,el)=>{
        return  arr.concat(el)
    },[])
    console.log(transformIngredients)
    if (transformIngredients.length === 0){
        transformIngredients = <p>Please Start Adding Ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type = 'bread-top'/>
            {transformIngredients}
            <BurgerIngredients type = 'bread-bottom'/>
        </div>
    );
}

export default burger;