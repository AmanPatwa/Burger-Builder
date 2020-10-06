import React, { Component } from 'react';
import BuildControls from "../../components/BuildControls/BuildControls";
import Aux from '../../hoc/Hux'
import Burger from '../../components/Burger/Burger'
import axios from '../../axios-orders'
import MyModal from '../../components/UI/Modal/Modal'
import ModalHeader from '../../components/UI/Modal/ModalHeader'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import Modal from 'react-bootstrap/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        showmodal: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data , error:false });
            })
            .catch(error => {
                this.setState({error:error})
            })
    }

    updatePurchaseState = (ingredients) => {
        // const ingredients = {
        //     ...this.state.ingredients
        // }
        const sum = Object.keys(ingredients).map(ingr => {
            return ingredients[ingr]
        }).reduce((sum, el) => {
            return sum + el
        }, 0)
        this.setState({ purchaseable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const addPrice = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const updatedPrice = oldPrice + addPrice
        this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const subPrice = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const updatedPrice = oldPrice - subPrice
        this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients)
    }

    updateModalState = (state) => {
        this.setState({ showmodal: state })
    }

    purchaseHandler = () => {
        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Aman Patwa",
                address: {
                    street: "teststreet",
                    zipCode: "401101",
                    email: "test@test.com"
                },
                deliveryMethod: 'fastest'
            }

        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, showmodal: false })
            })
            .catch(error => {
                this.setState({ loading: false, showmodal: false })
            });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let burger = this.state.error? <p>Ingredients cant be loaded</p> :<Spinner />
        let orderSummary = null

        if (this.state.ingredients) {
            burger = (
                <>
                    <div>
                        <Burger ingredients={this.state.ingredients} />
                    </div>
                    <BuildControls ingredientsRemoved={this.removeIngredientHandler} ingredientAdded={this.addIngredientHandler}
                        disabled={disabledInfo} price={this.state.totalPrice} purchaseable={this.state.purchaseable}
                        updateShowModal={this.updateModalState}
                    />
                </>
            );
            orderSummary = <OrderSummary price={this.state.totalPrice}
                onHide={() => this.updateModalState(false)}
                purchasecontinue={this.purchaseHandler}
                ingredients={this.state.ingredients}
            />
            if (this.state.loading) {
                orderSummary = <Spinner />
            }
        }




        return (
            <Aux>
                <MyModal
                    show={this.state.showmodal}
                    onHide={() => this.updateModalState(false)}
                >
                    <ModalHeader modalheader="Your Order" />
                    <Modal.Body>
                        {orderSummary}
                    </Modal.Body>
                </MyModal>
                {burger}
            </Aux >
        );

    }
}

export default WithErrorHandler(BurgerBuilder, axios)