import React from 'react';
import { Alert as AlertBootstrap } from 'react-bootstrap'

const Alert = (props) => {
    if(props.visible) {
        return ( 
            <React.Fragment>
                <AlertBootstrap variant={props.variant}>
                    {props.message}
                </AlertBootstrap>
            </React.Fragment>
        )
    } else {
        return null
    }
}
 
export default Alert;