import React, { Component } from 'react';
import classNames from 'classnames';


class Logo extends Component {

    getTitleStyle() {
        return (
            classNames({
                title: true
            })
        );
    }

    render() {

        return (
            <div className={this.getTitleStyle()} style={{ margin: "25px auto" }}>
                <img
                    src={require("../../images/shards-dashboards-logo.svg")}
                    alt=""
                />
                <h6> {this.props.title} </h6>
            </div>
        );
    }
}

Logo.defaultProps = {
    title: '',
};

export default Logo;
