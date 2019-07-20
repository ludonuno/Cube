import React, { Component } from 'react';
import SliderCelebrityWork from './SliderCelebrityWork'
class CelebrityWork extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return (
            <React.Fragment>
                <SliderCelebrityWork list={this.props.CelebrityWorkMovie} href='Movie' header='Filmes em que trabalhou.'/>
                <SliderCelebrityWork list={this.props.CelebrityWorkGame} href='Game' header='Jogos em que trabalhou.'/>
                <SliderCelebrityWork list={this.props.CelebrityWorkSeries} href='Series' header='Séries em que trabalhou.'/>
                <SliderCelebrityWork list={this.props.CelebrityWorkBook} href='Book' header='Livros em que trabalhou.'/>
            </React.Fragment>
        )
    }
}
 
export default CelebrityWork;