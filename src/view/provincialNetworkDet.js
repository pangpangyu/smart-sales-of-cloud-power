import React from 'react'
import Header from '../components/header'

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Header title='省网直调负荷预测曲线' back={true} search={false}></Header>
                <div className="tardingCenterDet">
                    <div className="contract-mes">
                        <div className="module-list">
                            <ul>
                                <li className="item">
                                    <span className="l">时间</span>
                                    <span className="r">2019年10月10日</span>
                                </li>
                                <li className="item">
                                    <span className="l">00:00</span>
                                    <span className="r">320</span>
                                </li>
                                <li className="item">
                                    <span className="l">00:15</span>
                                    <span className="r">110</span>
                                </li>
                                <li className="item">
                                    <span className="l">00:30</span>
                                    <span className="r">280</span>
                                </li>
                                <li className="item">
                                    <span className="l">00:45</span>
                                    <span className="r">225</span>
                                </li>
                                <li className="item">
                                    <span className="l">01:00</span>
                                    <span className="r">320</span>
                                </li>
                                <li className="item">
                                    <span className="l">01:15</span>
                                    <span className="r">280</span>
                                </li>
                                <li className="item">
                                    <span className="l">01:30</span>
                                    <span className="r">225</span>
                                </li>
                                <li className="item">
                                    <span className="l">01:45</span>
                                    <span className="r">321</span>
                                </li>
                                <li className="item">
                                    <span className="l">02:00</span>
                                    <span className="r">280</span>
                                </li>
                                <li className="item">
                                    <span className="l">02:30</span>
                                    <span className="r">225</span>
                                </li>
                                <li className="item">
                                    <span className="l">02:45</span>
                                    <span className="r">321</span>
                                </li>
                                <li className="item">
                                    <span className="l">03:00</span>
                                    <span className="r">308</span>
                                </li>
                                <li className="item">
                                    <span className="l">03:15</span>
                                    <span className="r">295</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
