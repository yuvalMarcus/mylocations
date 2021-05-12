import React from 'react';

const Element = ({
                     elementType = 'input',
                     value = '',
                     change = null,
                     label = '',
                     options = []
}) => {

    return (
        <div className={'Field'}>
            <label>{label}</label>
            {elementType === 'input' && <input value={value} onChange={change} />}
            {elementType === 'textarea' && <textarea value={value} onChange={change} />}
            {elementType === 'select' && <select value={value} onChange={change} >
                {options && options.map(option => (
                    <option key={value} value={value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>}
        </div>
    )
}

export default Element;