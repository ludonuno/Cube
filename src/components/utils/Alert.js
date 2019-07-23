import React from 'react';
import { Alert as AlertBootstrap } from 'react-bootstrap'

const Alert = React.forwardRef((props, ref) => {
    if(props.visible) {
        return ( 
            <React.Fragment>
                <div ref={ref} >
                    <AlertBootstrap variant={props.variant}>
                        {props.message}
                    </AlertBootstrap>
                </div>
            </React.Fragment>
        )
    } else {
        return null
    }
}) 
export default Alert;