import React, { Fragment } from 'react';
import Header from '../components/header';
import api from '../api/index';
class ContractReview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            html:'',
            contractId:this.props.match.params.id,//合同id
        }
    }
    componentDidMount() {
       const that=this;
       that.GetContractDetail();
    }

    //售电合同详情
    GetContractDetail(){
        const that = this
        let params = {
            id:that.state.contractId,
            templId: 0,

        };
        api.GetContractDetail(params).then(res=>{
            if(res.status===0){
                let ohtml=res.data.powerUserContract.contract.content;
                that.setState(()=>{
                    return({
                        html:ohtml.replace(/↵/g,'')
                    })
                })
            }else{
                
            }


        })
    }

    render() {
        return (
            <Fragment>
                <Header title={'合同预览'} back={true}/>
                <div className="contract-review">
                    {/* <div className="head">
                        <div className="tit">电力直接交易委托协议</div>
                        <div className="tip">补充协议</div>
                    </div>
                    <div className="module-space"></div> */}
                    <div className="cont" dangerouslySetInnerHTML={{__html:this.state.html}}>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ContractReview;