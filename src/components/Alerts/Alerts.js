import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import * as actionTypes from "../../store/actions";
import Alert from "./Alert/Alert";

const Alerts = ({
                    alerts = []
}) => {
    return (
        <>
            {alerts.length > 0 &&
            <div className={'bg-green-300 rounded p-2 border-l-4 border-green-500'}>
                {alerts.map(alert => <Alert key={alert.id} id={alert.id} text={alert.text} />)}
            </div>
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        alerts: state.alerts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveAlerts: () => dispatch({type: actionTypes.REMOVE_ALERT})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);;