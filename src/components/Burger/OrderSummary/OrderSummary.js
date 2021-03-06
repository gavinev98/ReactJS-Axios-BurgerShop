import React from 'react';

import Aux from '../../../hoc/Aux';


//importing custom button
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    //taking in the ingredients in via props and using object.keys to etract string values.
    const ingredientSummary = Object.keys(props.ingredients)
                                .map(igKey => {
                                    return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
                                });


    return (
        <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients</p>
        <ul>
            {ingredientSummary}

        </ul>
        <p>Continue to checkout ?</p>
        <p><strong>Total Price : </strong> {props.totalPrice.toFixed(2)} </p>
        <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>

        <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
        </Aux>
    );

};

export default orderSummary;