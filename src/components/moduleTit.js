import React, { Fragment } from 'react';

class ModuleTit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <Fragment>
                <div className="module-tit-wrap">
                    <img src={this.props.imgurl} alt="" className="img-icon"/>
                    <span className="tit">{this.props.title}</span>
                </div>
            </Fragment>
        )
    }
}

export default ModuleTit;