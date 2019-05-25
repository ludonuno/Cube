import React, { Component } from 'react';
import { Alert as AlertBootstrap } from 'react-bootstrap'

const Alert = (props) => {
    return ( 
        <React.Fragment>
            <AlertBootstrap variant={props.variant}>
                {props.message}
            </AlertBootstrap>
        </React.Fragment>
    )
}
 

export default Alert;