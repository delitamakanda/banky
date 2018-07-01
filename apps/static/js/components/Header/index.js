import React, { Component } from 'react';
import { render } from 'react-dom';
import '../../App.css';
import classNames from 'classnames';
import BackButton from './BackButton';


class Header extends Component {

    constructor(props) {
        super(props);
    }

    getHeaderStyle(){
        return classNames({
            header:true
        });
    }

    getTitleStyle(){
    	return(
    		classNames({
                title:true,
                noSubtitle:this.props.subtitle === '',
                noBackButton: !this.props.hasBackButton
            })
        );
    }

    getSubtitleStyle(){
        return(
            classNames({
                subtitle:true,
				mediumText:true,
				hide:this.props.subtitle === '',
                noBackButton: !this.props.hasBackButton
    		})
    	);
    }

    render() {

        return (
            <div className={this.getHeaderStyle() + ' '}>
                <div className='container '>
                    {this.props.hasBackButton ? <BackButton icon={'leftArrow'} url={this.props.urlBack}/> : ''}
                    <div className={this.getTitleStyle() + ' '}>
                        <div className=" "> {this.props.title} </div>
                    </div>
                    {this.props.subtitle === '' ? '' : <div className={this.getSubtitleStyle()}>{this.props.subtitle}</div>}
                </div>
            </div>
        );
    }
}

Header.defaultProps = {
    title:'',
    subtitle:'',
    hasBackButton:false
};

export default Header;
