import * as React from 'react';
import './Page.css';

export class Page extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}