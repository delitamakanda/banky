import React, { Component } from 'react';
import classNames from 'classnames';


class Logo extends Component {

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
