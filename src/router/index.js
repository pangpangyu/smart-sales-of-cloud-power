import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from '../App.js';
import Index from '../view/index';
import NewList from '../view/newList';
import ContractManage from '../view/contractManage';
import ContractDetail from '../view/contractDetail';
import ContractReview from '../view/contractReview';
import TodoList from '../view/todolist';
import TodoDet from '../view/todoDet';
import TodoDetLc from '../view/todoDetLc';
import TodoDetList from '../view/todoDetList';
import NewDetaile from '../view/newDetaile';
import HouserNum from '../view/houseNum';
import Customer from '../view/customer';
import ElectricityCompany from '../view/electricityCompany';
import Survey from '../view/survey';
import Account from '../view/accountInfo';
import SettlementManage from '../view/settlementManage';
import InfoDelivey from '../view/infoDelivery';
import ErrorPage from '../view/ErrorPage';
import { Provider } from 'react-keep-alive';

export default class ROUTER extends React.Component{
  render(){
    return (
      <Router>
        <Route>
          <Provider include="electricityCompany">
            <App>
              <Switch>
                <Route exact path="/" component={Index}></Route>
                <Route path="/newList/:type" component={NewList}></Route>
                <Route path="/newDetaile/:type/:id" component={NewDetaile}></Route>
                <Route path="/survey" component={Survey}></Route>
                <Route path="/contractManage" component={ContractManage}></Route>
                <Route path="/contractDetail/:id" component={ContractDetail}></Route>
                <Route path="/contractReview/:id" component={ContractReview}></Route>
                {/*type  1为公司公告  2为消息提醒  */}
                <Route path="/electricityCompany/:type" component={ElectricityCompany}></Route>
                {/*type  1为电力用户信息  2为发电厂信息  3为合作方信息  4为售电公司信息  */}
                <Route path="/electricityCompanyDetail/:type/:id" component={HouserNum}></Route>
                <Route path="/account/:id" component={Account}></Route>
                <Route path="/customer" component={Customer}></Route>
                <Route path="/settlementManage" component={SettlementManage}></Route>
                <Route path="/todolist" component={TodoList}></Route>
                <Route path="/infoDelivey" component={InfoDelivey}></Route>
                <Route path="/todoDet/:id" component={TodoDet}></Route>
                <Route path="/todoDetLc/:id" component={TodoDetLc}></Route>
                <Route path="/todoDetList/:id" component={TodoDetList}></Route>
                <Route component={ErrorPage}></Route>
              </Switch>
            </App>
          </Provider>
        </Route>
      </Router>
    )
  }
}