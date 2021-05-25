import React, {useCallback} from 'react';
import {connect} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {toast} from "react-toastify";
import Toolbar from "../Toolbar/Toolbar";
import * as actionTypes from '../../../store/actions';
import Select from 'react-select';

const AddLocation = ({
                         categories,
                         onAddLocation,
                         history
                     }) => {

    const notify = useCallback(() => toast.success("added new location"),
        []);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        onAddLocation(data);
        notify();
        history.push('/locations');
    }

    return (
        <>
            <Toolbar title={'Add Location'} />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Add New Location</span>
            </div>
            <div className={'bg-white border rounded shadow'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={'p-2'}>
                        <label>Name</label>
                        <input className={'bg-gray-100 w-full p-2 mb-2'} autoFocus {...register('name',{ required: true })} />
                        {errors.name && <p className={'text-red-600'}>Name is required</p>}
                        <label>Address</label>
                        <input className={'bg-gray-100 w-full p-2 mb-2'} {...register('address',{ required: true })} />
                        {errors.address && <p className={'text-red-600'}>Address is required</p>}
                        <label>Coordinates</label>
                        <input className={'bg-gray-100 w-full p-2 mb-2'} {...register('coordinates',{ required: true })} />
                        {errors.coordinates && <p className={'text-red-600'}>Coordinates is required</p>}
                        <label>Category</label>
                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <Select
                                {...field}
                                isMulti={true}
                                options={categories.map(cat => (
                                    {
                                        value: cat.id,
                                        label: cat.name
                                    }
                                ))}
                            />}
                        />
                        {errors.category && <p className={'text-red-600'}>Category is required</p>}
                    </div>
                    <div className={'p-2'}>
                        <input className={'rounded p-3 bg-pink-600 text-white cursor-pointer hover:bg-pink-700'} type="submit" value={'Add Location'} />
                    </div>
                </form>
            </div>
        </>
    );
};

AddLocation.defaultProps = {
    categories: [],
    onAddLocation: null,
    history: null
};

const mapStateToProps = state => {
    return {
        locations: state.locations.items,
        categories: state.categories.items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddLocation: (location) => dispatch({type: actionTypes.ADD_LOCATION, location: location})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLocation);