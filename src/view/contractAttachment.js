import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ModuleTit from '../components/moduleTit';
import img1 from '../assets/img/img102.png';

/*
附件信息
*/

class ContractAttachment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <Fragment>
                <div className="contract-attachment">
                    <ModuleTit title="合同附件" imgurl={img1} />
                    <ul className="contract-attachment-list">
                        <Link to={`/contractReview/1`} className="item">
                            <span className="l">合同扫描件</span>
                            <span className="m">合同附件.doc</span>
                            <span className="r">点击查看</span>
                        </Link>
                        <Link to={`/contractReview/1`} className="item">
                            <span className="l">营业执照附件</span>
                            <span className="m">合同附件.doc</span>
                            <span className="r">点击查看</span>
                        </Link>
                        <Link to={`/contractReview/1`} className="item">
                            <span className="l">甲方授权委托书</span>
                            <span className="m">合同附件.doc</span>
                            <span className="r">点击查看</span>
                        </Link>
                        <Link to={`/contractReview/1`} className="item">
                            <span className="l">乙方授权委托书</span>
                            <span className="m">合同附件.doc</span>
                            <span className="r">点击查看</span>
                        </Link>
                        <Link to={`/contractReview/1`} className="item">
                            <span className="l">开户许可证</span>
                            <span className="m">合同附件.doc</span>
                            <span className="r">点击查看</span>
                        </Link>
                        <Link to={`/contractReview/1`} className="item">
                            <span className="l">其它附件</span>
                            <span className="m">合同附件.doc</span>
                            <span className="r">点击查看</span>
                        </Link>

                    </ul>

                </div>
            </Fragment>
        )
    }
}

export default ContractAttachment;