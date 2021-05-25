import React from 'react';
import './Marker.css';

const Marker = (props) => {
    const { color, title, id } = props;
    return (
        <div>
            <div
                className="pin bounce"
                style={{ backgroundColor: color, cursor: 'pointer' }}
                title={title}
            />
            <div className="pulse" />
        </div>
    );
};

export default Marker;