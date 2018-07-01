import React, { Component } from 'react';
import { render } from 'react-dom';
import '../../App.css';
import classNames from 'classnames';
import { Link, Router, Route, hashHistory } from 'react-router';

class BackButton extends Component{

    constructor(props){
        super(props);
        if (!props.icon) props.icon = 'leftArrow';
    }

    handleClick (event) {
        if(this.props.url) hashHistory.push(this.props.url);
        else hashHistory.goBack();
    }

    render() {
        return (
            <div onClick={this.handleClick.bind(this)} className={'uiButton backButton'}>
              &laquo;
            </div>
        );
    }
};

export default BackButton;
