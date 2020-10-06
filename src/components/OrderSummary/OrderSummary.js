import React from 'react'
import Button from 'react-bootstrap/Button'


const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
            .map(ingr => {
                return <li key={ingr}><span style={{ textTransform: 'capitalize' }}>{ingr}</span>: {props.ingredients[ingr]}</li>
            })
    return(
    <>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button variant="outline-danger" onClick={props.onHide}>CANCEL</Button>{' '}
        <Button variant="outline-success" onClick={props.purchasecontinue}>CONTINUE</Button>
    </>
)};

export default orderSummary;