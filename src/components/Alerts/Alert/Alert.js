import React from "react";
import * as actionTypes from "../../../store/actions";
import {connect} from "react-redux";

const Alert = ({
                   id = '',
                   text = '',
                   onRemoveAlerts = null
                  }) => {

    return (
        <div className={'flex items-center justify-between'}>
            <span>
                {text}
            </span>
            <span className={'text-green-600 cursor-pointer'} onClick={() => onRemoveAlerts(id)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </span>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onRemoveAlerts: (id) => dispatch({type: actionTypes.REMOVE_ALERT, id: id})
    }
};


export default connect(null, mapDispatchToProps)(Alert);;