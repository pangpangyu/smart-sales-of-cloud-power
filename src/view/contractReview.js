import React, { Fragment } from 'react';
import Header from '../components/header';
class ContractReview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <Fragment>
                <Header title={'合同预览'} back={true}/>
                <div className="contract-review">
                    <div className="head">
                        <div className="tit">电力直接交易委托协议</div>
                        <div className="tip">补充协议</div>
                    </div>
                    <div className="module-space"></div>
                    <div className="cont">
                    委托方（以下简称“甲方”）：
                    受托方（以下简称“乙方”）：山西阳煤电力销售有
                    限公司
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ContractReview;