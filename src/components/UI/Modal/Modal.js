import Modal from 'react-bootstrap/Modal'
import React from 'react'
import Button from 'react-bootstrap/Button'

const modal = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(ingr => {
    return <li key={ingr}><span style={{textTransform: 'capitalize'}}>{ingr}</span>: {props.ingredients[ingr]}</li>
    })
    return (
        <>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Your Order
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to checkout?</p>
                <Button variant="outline-danger" onClick={props.onHide}>CANCEL</Button>{' '}
                <Button variant="outline-success" onClick={props.purchaseContinue}>CONTINUE</Button>
            </Modal.Body>
            
        </Modal>
        </>
    );
}

export default modal