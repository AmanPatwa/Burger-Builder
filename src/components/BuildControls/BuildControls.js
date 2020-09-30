import React from 'react';
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import MyModal from '../UI/Modal/Modal'


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = (props) => { 
    return (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>(
        <BuildControl key={ctrl.label} label={ctrl.label} type = {ctrl.type}
            added = {() => props.ingredientAdded(ctrl.type)}
            removed = {() => props.ingredientsRemoved(ctrl.type)}
            disabled = {props.disabled[ctrl.type]}
        />
        ))}
        <button className={classes.OrderButton} disabled={!props.purchaseable}  onClick={() => props.updateShowModal(true)}>ORDER NOW</button>
        <MyModal
                    show={props.showmodal}
                    onHide={() => props.updateShowModal(false)}
                    ingredients = {props.ingredients}
                    purchaseContinue = {props.purchaseContinue}
                />
        
    </div>
)};
export default buildControls;