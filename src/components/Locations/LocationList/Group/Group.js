import React from 'react';
import Location from "../Location/Location";

const Group = ({
                   locations,
                   location,
                   choose,
                   group,
               }) => (
    <div className={'border-b-2 border-gray-100'}>
        <div className={'bg-blue-600 text-white border-l-4 border-blue-400 p-2'}>
            {group.name}
        </div>
        {!locations.length && <div className={'text-gray-400 py-2 ml-4'}>Empty Locations</div>}
        {locations.length > 0 && <div className={'bg-white border border-gary-100 ml-4'}>
            {locations && locations.map(loc => <Location
                key={loc.id}
                name={loc.name}
                active={location && loc.id === location.id}
                choose={() => choose(loc.id)} />)}
        </div>}
    </div>
);

Group.defaultProps = {
    locations: [],
    location: null,
    choose: null,
    group: null
}

export default Group;