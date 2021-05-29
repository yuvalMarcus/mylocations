import React from 'react';

const Marker = ({
                    title
                }) => (
    <div>
        <div
            className={'w-7 h-7 rounded-full rounded-bl-none bg-red-600 absolute -rotate-45 left-1/2 top-1/2 -mt-10 -ml-4 animate-bounce-one cursor-pointer after:empty-content after:h-3 after:w-3 after:mt-2 after:ml-2 after:absolute after:bg-gray-200 after:rounded-full'}
            title={title}
        />
        <div className={'rounded-full h-4 w-4 absolute left-1/2 top-1/2 -mt-3 -ml-2 rotate-x-55 z-0 after:empty-content after:rounded-full after:h-10 after:w-10 after:absolute after:-mt-3 after:-ml-3 after:opacity-0 after:shadow-marker after:animate-pulsate-out'} />
    </div>
);

Marker.defaultProps = {
    title: ''
}

export default Marker;