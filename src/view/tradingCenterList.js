import React from 'react'

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zcqTabs:this.props.zcqTabs
        }
    }
    render() {
        return (
            <div className="tradingCenterList">
                {this.state.zcqTabs && this.state.zcqTabs.map(item => {
                    return <div className="item" key={item.id}>
                        <h3>{item.title}</h3>
                        <div className="list">
                            <ul>
                                <li><p><span>交易品种：</span>{item.n1}</p></li>
                                <li><p><span>交易规模：</span>{item.n2}</p></li>
                                <li><p><span>交易开始：</span>{item.n3}</p></li>
                                <li><p><span>交易结束：</span>{item.n4}</p></li>
                            </ul>
                        </div>
                    </div>
                })}
            </div>
        )
    }
}
