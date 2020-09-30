import React, { Component } from 'react';
import BuildControls from "../../components/BuildControls/BuildControls";
import Aux from '../../hoc/Hux'
import Burger from '../../components/Burger/Burger'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchaseable: false,
        showmodal: false,
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
        this.setState({showmodal:state})
    }

    purchaseContinueHandler = () => {
        var name= "Aman";
        alert(name)
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <div>
                    <Burger ingredients={this.state.ingredients} />
                </div>
                <BuildControls ingredientsRemoved={this.removeIngredientHandler} ingredientAdded={this.addIngredientHandler}
                    disabled={disabledInfo} price={this.state.totalPrice} purchaseable={this.state.purchaseable}
                    showmodal = {this.state.showmodal}
                    updateShowModal = {this.updateModalState}
                    purchaseContinue = {this.purchaseContinueHandler}
                    ingredients = {this.state.ingredients}
                />
            </Aux>
        );

    }
}

export default BurgerBuilder