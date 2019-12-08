import React, { Fragment } from 'react';

/*
客户管理-详情
*/

class PowerDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <Fragment>
                <div>
                    <div className="contract-mes">
                        <div className="module-list">
                            <ul>
                                <li className="item">
                                    <span className="l">营销计费号1</span>
                                    <span className="r"><label>所属交易单元</label><label>所属用电单元</label></span>
                                </li>
                                <li className="item">
                                    <span className="l">营销计费号1</span>
                                    <span className="r"><label>所属交易单元</label><label>所属用电单元</label></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default PowerDetails;