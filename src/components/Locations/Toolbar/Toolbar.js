import React, {useCallback, useMemo, useState} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import { ReactComponent as PaperClipIcon } from '../../../asset/img/paper-clip.svg';
import { ReactComponent as MenuIcon } from '../../../asset/img/menu.svg';
import * as actionTypes from "../../../store/actions";

const Toolbar = ({
                     locationId,
                     locations,
                     action,
                     title,
                     onRemoveLocation
                 }) => {

    const [menu, setMenu] = useState(false);

    const currentLocation = useMemo(() => locations.find(loc => loc.id === locationId),
        [locations, locationId]);

    const notify = useCallback(() => toast.success("Location successfully deleted"),
        []);

    const removeLocation = useCallback(() => {
        if(!currentLocation) {
            return;
        }
        onRemoveLocation(currentLocation.id)
        setMenu(false);
        notify();
    }, [currentLocation]);

    const renderNavbar = useCallback(() => (
        <>
            <Link className={'bg-blue-400 text-white rounded p-1 px-2 mt-2 md:mt-0 hover:bg-blue-500'} to={`/locations`}>list</Link>
            <Link className={'bg-blue-400 text-white rounded p-1 px-2 hover:bg-blue-500'} to={`/locations/add`}>add</Link>
            {
                !!currentLocation && action === 'select' && (
                    <>
                        <Link className={'bg-blue-400 text-white rounded p-1 px-2 hover:bg-blue-500'} to={`/locations/edit`}>edit</Link>
                        <Link className={'bg-blue-400 text-white rounded p-1 px-2 hover:bg-blue-500'} to={`/locations/show`}>view details</Link>
                        <button className={'bg-blue-400 text-white rounded p-1 px-2 text-left hover:bg-blue-500'} onClick={removeLocation}>delete</button>
                    </>
                )
            }

        </>
    ), [currentLocation, action]);

    return (
        <div className={'md:flex bg-blue-200 border-b-4 border-blue-600 rounded shadow-xl p-2 mb-6'}>
            <div className={'flex flex-wrap items-center'}>
                <PaperClipIcon />
                <span className={'font-bold ml-2'}>{title}</span>
                <span className={'bg-blue-400 text-white rounded p-1 px-2 ml-auto hover:bg-blue-500 md:hidden'} onClick={() => setMenu(!menu)}><MenuIcon /></span>
            </div>
            <div className={[
                'flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 md:px-2 cursor-pointer overflow-hidden max-h-0 md:max-h-screen transition-height ease-in-out duration-500',
                menu && 'max-h-screen'
            ].filter(Boolean).join(' ')}>
                {renderNavbar()}
            </div>
        </div>
    )
}

Toolbar.defaultProps = {
    locationId: null,
    locations: [],
    action: 'no-select',
    title: '',
    onRemoveLocation: null,
};

const mapStateToProps = state => {
    return {
        locationId: state.locations.itemId,
        locations: state.locations.items,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveLocation: (id) => dispatch({type: actionTypes.REMOVE_LOCATION, id: id})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);