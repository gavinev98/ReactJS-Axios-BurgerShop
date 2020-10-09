import React from 'react';

const input = (props) => {

    let inputElement = null;

    //adding some checks to function body.
    switch(props.inputType) {
        case ('input'):
            inputElement = <input {...props} />;
            break;
        case ('textarea'):
            inputElement = <textarea {...props} />;
            break;
        default:
            inputElement = <input {...props} />;
    }


    return (
    <div>
        <label>{props.label}</label>
        {inputElement}
       

    </div>);


};

export default input;