import React, {useCallback, useMemo, useState} from 'react';
import {connect} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify";
import Toolbar from "../Toolbar/Toolbar";
import * as actionTypes from '../../../store/actions';
import Select from "react-select";
import GoogleMap from "../../GoogleMap/GoogleMap";

const EditLocation = ({
                          categories,
                          locationId,
                          locations,
                          onEditLocation,
                          history
                     }) => {

    const location = useMemo(() => locations.find(loc => loc.id === locationId),
        [locations, locationId]);

    const [coordinates, setCoordinates] = useState([{
        lng: location.lng,
        lat: location.lat,
        title: ''
    }]);

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: location && location.name,
            address: location && location.address,
            lng: location && location.lng,
            lat: location && location.lat,
            category: location && location.category
        }
    });

    const notify = useCallback(() => toast.success("Location successfully edited"),
        []);

    if(!location) {
        return <Redirect to={'/'} />;
    }

    const onSubmit = (data) => {
        onEditLocation(data, location.id);
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
        setValue("lng", data.lng);
        setValue("lat", data.lat);
    }

    return (
        <>
            <Toolbar title={'Edit Location'} action={'select'} />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Edit Location</span>
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
                        <input type={'hidden'} className={'bg-gray-100 w-full p-2 mb-2'} {...register('lat',{ required: true })} />                        <GoogleMap
                            onClick={handleMap}
                            lng={location.lng}
                            lat={location.lat}
                            zoom={8}
                            markers={coordinates}
                        />
                        {errors.lng && errors.lat && <p className={'text-red-600'}>Coordinates is required</p>}
                        <label>Category</label>
                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <Select
                                {...field}
                                isMulti={true}
                                className={'mt-1'}
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
                        <input className={'rounded p-3 bg-pink-600 text-white cursor-pointer hover:bg-pink-700'} type="submit" value={'Edit Category'} />
                    </div>
                </form>
            </div>
        </>
    );
};

EditLocation.defaultProps = {
    categories: [],
    locationId: null,
    locations: [],
    onEditLocation: null,
    history: null
};

const mapStateToProps = state => {
    return {
        locationId: state.locations.itemId,
        locations: state.locations.items,
        categories: state.categories.items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEditLocation: (location, id) => dispatch({type: actionTypes.EDIT_LOCATION, payload: location, id: id}),
        onRemoveLocation: (id) => dispatch({type: actionTypes.REMOVE_LOCATION, id: id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLocation);