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
    //户号信息
    householdInformation = () => {
        return (
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
        )
    }
    //机组成本
    unitCost = () => {
        return (
            <div className="module-list">
                <ul>
                    <li className="item">
                        <span className="l">机组1</span>
                        <span className="r"><label>机组启动类型</label><label>启动时间</label></span>
                    </li>
                    <li className="item">
                        <span className="l">机组2</span>
                        <span className="r"><label>机组启动类型</label><label>启动时间</label></span>
                    </li>
                </ul>
            </div>
        )
    }

    render() {
        return (
            <Fragment>
                <div>
                {this.props.type === '1' && this.householdInformation()}
                {this.props.type === '2' && this.unitCost()}
                </div>
            </Fragment>
        )
    }
}

export default PowerDetails;