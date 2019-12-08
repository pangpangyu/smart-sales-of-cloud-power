import React, { Fragment } from 'react';
import Header from '../components/header';
import Search from '../components/search';
import NoData from '../components/noData';
import { Link } from 'react-router-dom';
import api from '../api/index';
import { PullToRefresh } from 'antd-mobile';

class ContractManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contractManageList: [],
            isNoData: false,
            isNoMore: false,
            searchInput: "",
            currentPage: 1,
            prt: null,
            refreshing: false,
            down: false

        }
    }

    componentDidMount() {
        const that = this;
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        that.GetContractList(1);
    }

    GetContractList = (page) => {
        const that = this
        let params = {
            "userName": this.state.searchInput,
            "dateType": 0,
            "currentPage": page,
            "sizePrePage": 10
        }
        api.GetContractList(params).then(res => {
            console.log('售电合同列表:', res)
            if (res.status === 0) {
                if (page > res.data.currentPage) {//这时候已经没有数据了
                    console.log("没有更多数据了");
                } else if (res.data.rows.length === 0) {
                    that.setState({
                        isNoData: true
                    });
                } else {
                    that.setState(preState => {
                        return ({
                            isNoData:false,
                            contractManageList: [...preState.contractManageList, ...res.data.rows],
                            currentPage: page + 1
                        })
                    })
                }
            }
            that.setState({ refreshing: false });
        })
    }

    handleSearchInput=e=>{
        console.log(e.target.value);
        this.setState({
            searchInput:e.target.value
        })
    }
    handleSearchSubmit=e=>{
        console.log(this.state.searchInput);
        this.setState({
            contractManageList:[]
        })
        this.GetContractList(1);
    }

    



    render() {
        return (
            <Fragment>
                <Header title={'售电合同'} back={true} search={false} />
                <Search title={'搜合同名称'} onInput={this.handleSearchInput} onSubmit={this.handleSearchSubmit} />
                <div className="contract-manage-wrap" >
                    <div className="bg bg-gray"></div>
                    {this.state.isNoData ? <NoData /> : ''}
                    <PullToRefresh
                        damping={60}
                        ref={el => this.ptr = el}
                        style={{ display: this.state.isNoData ? 'none' : 'block' }}
                        className="pulldown-box"
                        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                        direction={this.state.down ? 'down' : 'up'}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true });
                            this.GetContractList(this.state.currentPage);
                        }}
                    >
                        <ul className="contract-manage-list">
                            {
                                this.state.contractManageList.map((item, index) => {
                                    return (
                                        <li className="item" key={index}>
                                            <Link to={`/contractDetail/${item.id}`}>
                                                <div className="tit">{item.participantName}</div>
                                                <div className="mes">
                                                    <span>签约电量：</span>{item.contractPower}兆瓦时
                                </div>
                                                <div className="mes">
                                                    <span>合同时间：</span>{item.createDateTime}
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </PullToRefresh>

                </div>
            </Fragment>
        )
    }

    //
    handleItem = () => {
        console.log(this)
    }
}

export default ContractManage;