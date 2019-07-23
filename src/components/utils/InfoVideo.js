import React from 'react'
import { Jumbotron } from 'react-bootstrap'
const InfoVideo = React.forwardRef((props, ref) => {
    if (props.list[0]) {
        return (
            <Jumbotron className="info-slider" >
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" ref={ref} src="" title="" allowFullScreen></iframe>
                </div>
            </Jumbotron>
        )
    } else return null
})
export default InfoVideo;