import React, {Fragment} from 'react';
import Header from '../components/header';
import Search from '../components/search';
import { Link } from 'react-router-dom';

class ContractManage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            contractManageList:[
                {
                    tit:'01信息技术公司2019补充协议',
                    m1:'1000',
                    m2:'2018-01-01~2019-12-30'
                },
                {
                    tit:'01信息技术公司2019补充协议',
                    m1:'1000',
                    m2:'2018-01-01~2019-12-30'
                },
            ],
        }
    }

    render(){
        return(
           <Fragment>
            <Header title={'售电合同'} back={true} search={false}/>
            <Search title={'搜合同名称'}/>
            <div className="contract-manage-wrap">
               <div className="bg bg-gray"></div>
               <ul className="contract-manage-list">
                  {
                   this.state.contractManageList.map((item,index)=>{
                       return(
                        <li className="item" key={index}>
                            <Link to="/">
                                <div className="tit">{item.tit}</div> 
                                <div className="mes">
                                    <span>签约电量：</span>{item.m1}兆瓦时
                                </div>
                                <div className="mes">
                                    <span>合同时间：</span>{item.m2}
                                </div>
                            </Link>
                        </li>
                        )
                   })
                }
               </ul>
           </div> 
           </Fragment> 
        )
    }

    //
    handleItem = () =>{
        console.log(this)
    }
}

export default ContractManage;