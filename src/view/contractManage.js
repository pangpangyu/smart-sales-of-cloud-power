import React, { Fragment } from 'react';
import Header from '../components/header';
import Search from '../components/search';
import NoData from '../components/noData';
import { Link } from 'react-router-dom';
import api from '../api/index';
// import { PullToRefresh } from 'antd-mobile';
import Scroll from 'react-bscroll';
import 'react-bscroll/lib/react-scroll.css';

class ContractManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contractManageList: [],
            isNoData: false,
            total:0,
            searchInput: "",
            currentPage: 1,
        }
    }

    componentDidMount() {
        const that = this;
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        that.GetContractList(1);
    }

    GetContractList = (page, loadmoreResolve) => {
        const that = this
        let params = {
            "userName": this.state.searchInput,
            "dateType": 0,
            "currentPage": page,
            "sizePrePage": 1000
        }
        api.GetContractList(params).then(res => {
            console.log('售电合同列表:', res)
            if (res.status === 0) {
                that.setState(preState => {
                    return ({
                        total: res.data.dataTotalSize,
                        contractManageList: [...preState.contractManageList, ...res.data.rows],
                        isNoData: res.data.dataTotalSize === 0 ? true : false,
                        currentPage: page + 1
                    })
                })
                loadmoreResolve && loadmoreResolve();
            }



        })
    }

    handleSearchInput = e => {
        // console.log(e.target.value);
        this.setState({
            searchInput: e.target.value
        })
    }
    handleSearchSubmit = e => {
        //console.log(this.state.searchInput);
        this.setState({
            contractManageList: []
        })
        this.GetContractList(1);
    }

    //加载下一页
    loadMoreData = () => {
        return new Promise((resolve, reject) => {
            if (this.state.contractManageList.length < this.state.total) {
                this.GetContractList(this.state.currentPage, resolve);
            } else {
                resolve()
            }
        })
    }

    render() {
        return (
            <Fragment>
                <Header title={'售电合同'} back={true} search={false} />
                <Search title={'搜合同名称'} style={{ zIndex: 1 }} onInput={this.handleSearchInput} onSubmit={this.handleSearchSubmit} />
                <div className="contract-manage-wrap" >
                    <div className="bg bg-gray"></div>

                    {/* <PullToRefresh
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
                    </PullToRefresh> */}
                    {this.state.isNoData ? <NoData /> :
                        <Scroll
                            ref='scroll'
                            pullUpLoad
                            pullUpLoadMoreData={this.loadMoreData}
                            isPullUpTipHide={false}
                            bounce={false}
                            click={true}>
                            <div style={{ height: '115px' }}></div>
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

                        </Scroll>
                    }
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