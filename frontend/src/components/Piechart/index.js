import React, { Component } from 'react';
import { LabeledArc } from './Arc';
import * as d3 from 'd3';

class Piechart extends Component {
    constructor() {
		super();

        this.pie = d3.pie().value((d) => d.value);
        this.colors = d3.scaleLinear().range(['green', 'orange']);
    }

    arcGenerator(d, i) {
		return (
            <LabeledArc key={`arc-${i}`}
                        data={d}
                        innerRadius={this.props.innerRadius}
                        outerRadius={this.props.outerRadius}
                        color={this.colors(i)} />
        );
    }

    render() {
		let pie = this.pie(this.props.data);
		let translate = `translate(${this.props.x}, ${this.props.y})`;

				return (
                    <svg id="canvas">
    					<g transform={translate}>
    						{pie.map((d, i) => this.arcGenerator(d, i))}
    					</g>
                    </svg>
				)
    }
}

export default Piechart;
