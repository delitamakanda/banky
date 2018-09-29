import React, { Component } from 'react';
import { render } from 'react-dom';

import classNames from 'classnames';


class Logo extends Component {

    constructor(props) {
        super(props);
    }



    getTitleStyle(){
    	return(
    		classNames({
                title: true
            })
        );
    }

    render() {

        return (
            <div className={this.getTitleStyle()}>
                    <h1> {this.props.title} </h1>
            </div>
        );
    }
}

Logo.defaultProps = {
    title:'',
};

export default Logo;
