import React ,{Component} from 'react';
export class Header  extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-1 col-xs-offset-11">
                        <h1>{this.props.homeLink}</h1>
                    </div>
                </div>
            </div>
        )
    }
}