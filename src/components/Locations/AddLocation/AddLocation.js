import React, {useCallback, useState, useMemo} from 'react';
import {connect} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {toast} from "react-toastify";
import Toolbar from "../Toolbar/Toolbar";
import * as actionTypes from '../../../store/actions';
import Select from 'react-select';
import GoogleMap from "../../GoogleMap/GoogleMap";

const AddLocation = ({
                         categories,
                         onAddLocation,
                         history
                     }) => {

    const [coordinates, setCoordinates] = useState([]);

    const notify = useCallback(() => toast.success("added new location"),
        []);

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        onAddLocation({
            ...data,
            categories: data.categories.map(category => category.value)
        });
        notify();
        history.push('/locations');
    }

    const handleMap = (data) => {
        setCoordinates([
            {
                lng: data.lng,
                lat: data.lat,
                title: ''
            }
        ]);
        setValue('lng', data.lng);
        setValue('lat', data.lat);
    }

    return (
        <>
            <Toolbar title={'Add Location'} action={''} />
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
                        <input type={'hidden'} className={'bg-gray-100 w-full p-2 mb-2'} {...register('lng',{ required: true })} />
                        <input type={'hidden'} className={'bg-gray-100 w-full p-2 mb-2'} {...register('lat',{ required: true })} />
                        <GoogleMap
                            onClick={handleMap}
                            lng={34.772688258004685}
                            lat={32.08625973554081}
                            zoom={8}
                            markers={coordinates}
                        />
                        {errors.lng && errors.lat && <p className={'text-red-600'}>Coordinates is required</p>}
                        <label>Categories</label>
                        <Controller
                            name="categories"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <Select
                                {...field}
                                isMulti={true}
                                className={'mt-1'}
                                options={categories.map(category => (
                                    {
                                        value: category.id,
                                        label: category.name
                                    }
                                ))}
                            />}
                        />
                        {errors.categories && <p className={'text-red-600'}>Category is required</p>}
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
        categories: state.categories.items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddLocation: (location) => dispatch({type: actionTypes.ADD_LOCATION, location: location})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLocation);