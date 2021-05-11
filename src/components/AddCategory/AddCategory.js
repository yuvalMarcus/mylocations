import React, {useContext, useState} from 'react';
import Element from "../../UI/Element/Element";

import { elements } from '../../handlers/utility';

const AddCategory = props => {

    const handleSubmit = (event) => {

    }

    const handleChange = (event, validation, keyIdentifier) => {

    }

    let error = false;

    let formElements = elements.map(element => {

        return (
            <Element
                key={element.elementConfig.name}
                elementType={element.elementType}
                label={element.elementLabel}
                value={''}
                change={event => handleChange(event, element.validation, element.elementConfig.name)}
            />
        )
    });

    return (
        <React.Fragment>
                <div className={'AddTaskContainer'}>
                    <h2>Add Task</h2>
                    <form className={'Form'} onSubmit={handleSubmit}>
                        {formElements}
                        <button className={'AddTaskSubmit'}>Add Task</button>
                    </form>
                </div>
        </React.Fragment>
    )
};

export default AddCategory;