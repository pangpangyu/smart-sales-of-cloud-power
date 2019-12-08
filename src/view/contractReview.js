import React, { Fragment } from 'react';
import Header from '../components/header';
import api from '../api/index';
class ContractReview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            html:'<html>↵ <head></head> ↵ <body> ↵  <p class="western" align="center">&nbsp;</p> ↵  <p class="western" align="center">&nbsp;</p> ↵  <p class="western" align="center"><span lang="zh-CN"><strong>电力直接交易委托协议</strong></span></p> ↵  <p class="western" align="center">&nbsp;</p> ↵  <p class="western" align="center">&nbsp;</p> ↵  <p class="western" align="center">&nbsp;</p> ↵  <p class="western" align="center"><span lang="zh-CN"><strong>补充协议</strong></span></p> ↵  <p class="western" align="center">&nbsp;&nbsp;</p> ↵  <p class="western" align="center">&nbsp;</p> ↵  <p class="western" align="center">2018<span lang="zh-CN">年</span>9<span lang="zh-CN">月</span></p> ↵  <p class="western" align="center">&nbsp;</p> ↵  <p class="western" align="left">&nbsp;</p> ↵  <p class="western"><span lang="zh-CN">委托方（以下简称“甲方”）：&nbsp;&nbsp;<u>山西星宇视控科技有限公司</u>&nbsp;&nbsp;</span></p> ↵  <p class="western">&nbsp;</p> ↵  <p class="western"><span lang="zh-CN">受托方（以下简称“乙方”）：山西阳煤电力销售有限公司</span></p> ↵  <h1 class="western" align="center"><span lang="zh-CN"><strong>总 则</strong></span></h1> ↵  <p class="western"><span lang="zh-CN">第一条 甲、乙双方根据国家有关法律、法规，按照山西省政府相关部门电力体制改革政策文件精神，本着平等、自愿、公平和诚信的原则，经协商一致，签订本协议。</span></p> ↵  <p class="western"><span lang="zh-CN">第二条 本协议作为双方签订《电力直接交易委托协议》补充协议，重点明确委托交易价格及违约责任。</span></p> ↵  <p class="western"><span lang="zh-CN">第三条 乙方协助甲方获得参与交易的准入条件，代理甲方参与市场交易，甲方在同一委托期限内不能同时委托其他售电公司。</span></p> ↵  <p class="western"><span lang="zh-CN">第四条 若政府对电力市场运营规则、结算方式、电价等发生变化，则应视具体情况，依据国家有关政策及法规的约定，调整本协议的相关条款和约定，必要时重新签订协议。</span></p> ↵  <p class="western">&nbsp;</p> ↵  <h1 class="western" align="center"><span lang="zh-CN"><strong>第二章 代理期限、电量、电价</strong></span></h1> ↵  <p class="western"><span lang="zh-CN">第五条 甲方若</span>2018<span lang="zh-CN">年准入，乙方代理期限为</span>2018<span lang="zh-CN">年</span>9<span lang="zh-CN">月至</span>12&nbsp;<span lang="zh-CN">月，代理期限为</span>4<span lang="zh-CN">月；若</span>2019<span lang="zh-CN">年准入后，乙方代理期限为</span>2019<span lang="zh-CN">年</span>1&nbsp;<span lang="zh-CN">月至</span>12&nbsp;<span lang="zh-CN">月。代理期间，根据交易中心的要求，双方每年以签订的《电力直接交易委托协议》时间为准。</span></p> ↵  <p class="western"><span lang="zh-CN">第六条 代理电量：在代理年度内，甲方委托乙方交易电量不得超过电力主管部门核定的年度交易上限。代理电量以《电力直接交易委托协议》为准。</span></p> ↵  <p class="western"><span lang="zh-CN">甲方在每月规定时间前通过纸质方式向乙方报送和确认次月计划用电量，作为乙方参与月度交易和后续年度分月电量调整的申报依据，甲方授权为《委托交易电量确认函》签署人。</span></p> ↵  <p class="western"><span lang="zh-CN">第七条 委托电价</span></p> ↵  <p class="western" align="left"><span lang="zh-CN">交易代理电价：甲方委托乙方交易电价为<u>&nbsp;&nbsp;&nbsp;<u>0.7</u>&nbsp;&nbsp;</u></span><span lang="zh-CN">元</span>/<span lang="zh-CN">兆瓦时。</span></p> ↵  <p class="western" align="left"><span lang="zh-CN">（交易电价</span>=<span lang="zh-CN">销售目录电价</span>-<span lang="zh-CN">输配电价</span>-<span lang="zh-CN">政府基金和附加</span>-<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u><span lang="zh-CN">元</span>/<span lang="zh-CN">兆瓦时</span>,<span lang="zh-CN">当目录电价</span>,<span lang="zh-CN">输配电价</span>,<span lang="zh-CN">政府基金和附加变化时</span>,<span lang="zh-CN">双方可协商交易代理价格</span>)<span lang="zh-CN">。</span></p> ↵  <p class="western">&nbsp;</p> ↵  <h1 class="western" align="center"><span lang="zh-CN"><strong>第三章 偏差电量与超用电量</strong></span></h1> ↵  <p class="western" align="left"><span lang="zh-CN">第八条 经双方协商，对偏差电量及超用电量责任约定如下：</span></p> ↵  <p class="western" align="left">1.<span lang="zh-CN">对甲方偏差电量及超用电量导致的考核由甲方承担。</span></p> ↵  <p class="western" align="left">2.<span lang="zh-CN">乙方免费对甲方偏差电量及超用电量通过内部平衡、联保、互保、合同转移等方式进行调整平衡。</span></p> ↵  <h1 class="western" align="center"><span lang="zh-CN"><strong>第四章　协议违约和补偿</strong></span></h1> ↵  <p class="western" align="left"><span lang="zh-CN">第九条 违约电量为乙方未按照甲方委托要求成交的电量差额部分（由电网安全约束条件原因导致的电量差额除外），违约责任由乙方承担，违约电量的赔偿约定如下：</span></p> ↵  <p class="western" align="left"><span lang="zh-CN">成交电量低于委托电量的未成交部分（如乙方当月结算电量少于委托电量，则成交电量低于结算电量的未成交部分），委托电量与成交电量的相差部分的偏差由乙方承担。</span></p> ↵  <h1 class="western" align="center"><span lang="zh-CN"><strong>第五章 结算</strong></span></h1> ↵  <p class="western" align="left"><span lang="zh-CN">第十条 经双方协商，用以下方式结算：</span></p> ↵  <p class="western" align="left">1.<span lang="zh-CN">代理交易电价、偏差电费及违约赔偿等均折算为结算电价，由电网公司代为结算。</span></p> ↵  <p class="western" align="left">2.<span lang="zh-CN">每月电网公司与购售电各方结算时，由乙方根据交易中心公布的交易结果出具交易确认单，甲乙双方签字确认后，向交易中心确认电量、电价，由电网公司代为结算。</span></p> ↵  <p class="western" align="left">3.<span lang="zh-CN">因本合同产生的相关费用，在委托结束未清算完成或无法折入电价的费用，甲乙双方抵扣税费后以现金汇款方式结算或双方协商其他方式结算。</span></p> ↵  <h1 class="western" align="center"><span lang="zh-CN"><strong>第六章　协议变更</strong></span></h1> ↵  <p class="western" align="left"><span lang="zh-CN">第十一条 本协议的任何修改、补充或变更必须以书面的形式进行，双方法定代表人或授权代理人签字盖章后方为有效。</span></p> ↵  <p class="western" align="left"><span lang="zh-CN">第十二条 因国家法律、法规发生变化或者政府有关部门、监管机构出台有关规定、规则，导致双方不能正常履行协议约定时，双方应相应变更本协议。</span></p> ↵  <p class="western" align="left"><span lang="zh-CN">第十三条 在委托期内，如山西省内发电企业标杆上网电价、目录电价、输配电价、基金及附加费用调整，或电力直接交易规则发生重大变动，应依据市场形势，经双方协商一致后，另行签订补充协议对原先商定的交易价格做出相应调整。</span></p> ↵  <h1 class="western" align="center"><span lang="zh-CN"><strong>第七章 协议解除</strong></span></h1> ↵  <p class="western" align="left"><span lang="zh-CN">第十四条 如任何一方发生下列事件，则另一方有权在发出解除通知后解除本协议：</span></p> ↵  <p class="western" align="left">1.<span lang="zh-CN">一方被申请破产、清算或被吊销营业执照；</span></p> ↵  <p class="western" align="left">2.<span lang="zh-CN">一方与另一实体联合、合并或将其所有或大部分资产转移给另一实体，而该存续的企业不能合理地承担其在本协议项下的所有义务。</span></p> ↵  <p class="western" align="left"><span lang="zh-CN">第十五条 甲、乙双方均不得擅自解除协议。如果因甲方原因导致协议解除，则甲方应赔偿乙方因此而遭受的损失；如果因乙方原因导致协议解除，则乙方应赔偿甲方因此而遭受的损失。</span></p> ↵  <h1 class="western" align="center"><span lang="zh-CN"><strong>第八章　不可抗力</strong></span></h1> ↵  <p class="western" align="left"><span lang="zh-CN">第十六条 不可抗力按照《中华人民共和国合同法》有关规定执行。</span></p> ↵  <p class="western" align="left"><span lang="zh-CN">第十七条 甲、乙双方中任何一方由于不可抗力的原因不能履行协议时，因在不可抗力发生后尽快补救，并于发生时起</span>24<span lang="zh-CN">小时内向对方通报不能履行或不能完全履行的理由，以减轻可能给对方照成的损失，在取得有关机构证明以后，本协议允许延期履行、部分履行或者解除协议。</span></p> ↵  <h1 class="western" align="center"><span lang="zh-CN"><strong>第九章　争议的解决</strong></span></h1> ↵  <p class="western" align="left"><span lang="zh-CN">第十八条 凡因执行本协议所发生的与本协议有关的一切争议，双方应协商解决，也可提请电力监管机构和政府电力行业主管部门调解。协商或调解不成的，任何一方依法提请乙方所在地人民法院通过诉讼程序解决。</span></p> ↵  <h1 class="western" align="center"><span lang="zh-CN"><strong>第十章 附则</strong></span></h1> ↵  <p class="western" align="left"><span lang="zh-CN">第十九条 保密</span></p> ↵  <p class="western" align="left"><span lang="zh-CN">甲、 乙双方均应保证其从另一方取得的所有无法自公开渠道获得的资料和文件（包括财务、技术等内容）予以保密。未经该资料和文件的原提供方同意，不得向任何第三 方透露该资料和文件的全部或任何部分，但按照法律、法规规定可做出披露的情况除外。本协议中保密的条款在本协议解除后仍然有效。</span></p> ↵  <p class="western" align="left"><span lang="zh-CN">第二十条 本补充协议依据甲乙双方在电力交易中心备案的《电力直接交易委托协议》签订，具有同等法律效力。甲乙双方签订的《电力直接交易委托协议》失效后，本补充协议自动失效。</span></p> ↵  <p class="western" align="left"><span lang="zh-CN">第二十一条 本协议共陆份，甲、乙双方各执叁份。</span></p> ↵  <p class="western" align="left"><span lang="zh-CN">第二十二条 本协议自签约之日起执行。</span></p> ↵  <p class="western">&nbsp;</p> ↵  <p class="western"><span lang="zh-CN">甲方：&nbsp;&nbsp;<u>山西星宇视控科技有限公司</u>&nbsp;&nbsp;</span></p> ↵  <p class="western"><span lang="zh-CN">法定代表人（委托人）</span>:</p> ↵  <p class="western"><span lang="zh-CN">签字日期： 年 月 日</span></p> ↵  <p class="western"><span lang="zh-CN">乙方：山西阳煤电力销售有限公司</span></p> ↵  <p class="western"><span lang="zh-CN">法定代表人（委托人）</span>:</p> ↵  <p class="western"><span lang="zh-CN">签字日期：&nbsp;&nbsp;&nbsp;<u>2019-12-2</u>&nbsp;&nbsp;</span></p>  ↵ </body>↵</html>',
            
        }
        //console.log(this.props.match.params.id)
    }

    

    componentDidMount() {
       const that=this;
       let n=that.state.html.replace(/↵/g,'');
       that.setState(()=>{
        return{
            html:n
        }
       })
       that.GetContractDetail();
    }

    //售电合同详情
    GetContractDetail(){
        const that = this
        let params = {
            //id:that.state.contractId,
            id:283,
            templId: 0,

        };
        api.GetContractDetail(params).then(res=>{
            console.log("售电合同详情",res);
            if(res.status===0){
                that.setState(()=>{
                    return({
                        contractDetail:res.data
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