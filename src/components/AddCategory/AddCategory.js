import React, { useState} from 'react';
import { useForm } from 'react-hook-form';

import { elements } from '../../handlers/utility';
import Toolbar from "../Toolbar/Toolbar";

const AddCategory = props => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <>
            <Toolbar />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Add Category</span>
            </div>
            <div className={'bg-white border rounded shadow'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={'p-2'}>
                        <input className={'bg-gray-100 w-full p-2'} {...register('firstName')} /> {/* register an input */}
                    </div>
                    <div className={'p-2'}>
                        <input className={'bg-gray-100 w-full p-2'} {...register('lastName', { required: true })} />
                        {errors.lastName && <p>Last name is required.</p>}
                    </div>
                    <div className={'p-2'}>
                        <input className={'bg-gray-100 w-full p-2'} {...register('age', { pattern: /\d+/ })} />
                        {errors.age && <p>Please enter number for age.</p>}
                    </div>
                    <div className={'p-2'}>
                        <input className={'rounded p-3 bg-pink-600 text-white'} type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCategory;