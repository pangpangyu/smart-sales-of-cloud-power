import React from 'react';

class ContractManage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          
        }
    }

    render(){
        return(
           <div className="contract-manage-wrap">
               <ul className="contract-manage-list">
                   <li className="item">
                      <div className="tit">01信息技术公司2019补充协议</div> 
                      <div className="mes">
                          <span>签约电量：</span>1000兆瓦时
                      </div>
                      <div className="mes">
                          <span>合同时间：</span>2018-01-01~2019-12-30
                      </div>
                   </li>
               </ul>
           </div> 
        )
    }
}

export default ContractManage;