import React from 'react';
import Location from "../Location/Location";

const Group = ({
                   onSetLocation,
                   location,
                   locations,
                   item,
                   groupedBy
                    }) => {


    return (
        <div className={'border-b-2 border-gray-100 cursor-pointer'}>
            <div className={'bg-gray-300 border border-gray-400 p-2'}>
                {item.name}
            </div>
            <div className={'bg-white border border-gary-100 ml-4'}>
                {locations && locations.filter(loc => loc[groupedBy].find(cat => cat.value === item.id))
                    .map(loc => <Location
                    key={loc.id}
                    name={loc.name}
                    active={location && loc.id === location.id}
                    choose={() => onSetLocation(!location || loc.id !== location.id ? loc.id : null)} />)}
            </div>
        </div>
    )
};

export default Group;