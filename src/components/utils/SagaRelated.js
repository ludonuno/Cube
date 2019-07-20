import React, { Component } from 'react';
import SliderSagaRelated from './SliderSagaRelated'
class SagaRelated extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return (
            <React.Fragment>
                <SliderSagaRelated list={this.props.sagaMovie} href='Movie' header='Filmes da mesma saga'/>
                <SliderSagaRelated list={this.props.sagaGame} href='Game' header='Jogos da mesma saga'/>
                <SliderSagaRelated list={this.props.sagaSeries} href='Series' header='Séries da mesma saga'/>
                <SliderSagaRelated list={this.props.sagaBook} href='Book' header='Livros da mesma saga'/>
            </React.Fragment>
        )
    }
}
 
export default SagaRelated;