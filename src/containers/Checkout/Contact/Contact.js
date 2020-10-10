import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'

import classes from './Contact.module.css'

import axios from '../../../axios-order';

import  Spinner from '../../../components/UI/Modal/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input';
import input from '../../../components/UI/Input/Input';


class Contact extends Component {

    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode :{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options : [{value: 'fastest', displayValue : 'Fastest'},
                                {value: 'cheapest', displayValue : 'Cheapest'} ]
                },
                valid:true
            },
        },
        formIsValid: false,
        loading: false
    }

    orderHander = (event) => {
            event.preventDefault();        
        //positing to the firebase. creating object to store our data.
                this.setState({loading : true});

                //retrieving the data from the order form.
                const formData = {};
                for(let formElementIdentifier in this.state.orderForm) {
                    //setting keyvalue = to the value of the key.
                    formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
                }


                const order = {
                    ingredients : this.props.ingredients,
                    price: this.props.price,
                    orderData: formData

                }
                axios.post('/orders.json', order)
                .then(response => {
                   //closed the spinner
                   this.setState({loading: false});
                   //alert message
                   alert("Thank you, your order was sucessful");
                   this.props.history.push('/');
          
        
                })
                .catch(error => {
                 alert("Your order was not successful please try again");
                 //hide spinner and modal
                 this.setState({loading : false});
                })

    }


    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.minLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //updating value of our field by getting the ID.
        //updating in an immutable way.
        const updatedofForm = {
            ...this.state.orderForm
        }
        //getting the key that is passed to the method in immutable way.
        const updatedFormElement = { ...updatedofForm[inputIdentifier] }

        //setting value of the element to what is typed into field.
        updatedFormElement.value = event.target.value;

        //adding layer of validation.
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        //updating the copy of element to actual form.
        updatedofForm[inputIdentifier] = updatedFormElement;
        //setting state.
        
        let formIsValid = true;

        for(let inputIdentifier in updatedofForm) {
            formIsValid = updatedofForm[inputIdentifier].valid && formIsValid;
        }


        this.setState({orderForm: updatedofForm, formIsValid: formIsValid});


    }

    render () {
        //converting our order form js object to array.
        const formElementsArray = [];
        //looping over the keys in form to create input object ie , name, address, zipcode etc.
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHander}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id} 
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    valueType={formElement.id}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} /> 
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
           
        </form>

        );
        if(this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
              

            </div>


        );
    }
}


export default Contact;