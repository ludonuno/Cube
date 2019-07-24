import React, { Component } from 'react';
import SliderSagaRelated from './SliderSagaRelated'
class SagaRelated extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        if((this.props.sagaMovie && this.props.sagaMovie[0]) || (this.props.sagaGame && this.props.sagaGame[0]) || (this.props.sagaSeries && this.props.sagaSeries[0]) || (this.props.sagaBook && this.props.sagaBook[0])) {
            return (
                <React.Fragment>
                    <SliderSagaRelated list={this.props.sagaMovie} href='Movie' header='Filmes da mesma saga'/>
                    <SliderSagaRelated list={this.props.sagaGame} href='Game' header='Jogos da mesma saga'/>
                    <SliderSagaRelated list={this.props.sagaSeries} href='Series' header='Séries da mesma saga'/>
                    <SliderSagaRelated list={this.props.sagaBook} href='Book' header='Livros da mesma saga'/>
                </React.Fragment>
            )
        } else return(<p>Não existem outros registos com a mesma Saga</p>)
    }
}
 
export default SagaRelated;