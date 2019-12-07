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
import Customer from '../view/customer';
import ElectricityCompany from '../view/electricityCompany';
import Survey from '../view/survey';
import ElectricityCompanyDetail from '../view/electricityCompanyDetail';
import ErrorPage from '../view/ErrorPage';

export default class ROUTER extends React.Component{
  render(){
    return (
      <Router>
        <Route>
          <App>
            <Switch>
              <Route exact path="/" component={Index}></Route>
              <Route path="/newList/:type" component={NewList}></Route>
              <Route path="/survey" component={Survey}></Route>
              <Route path="/contractManage" component={ContractManage}></Route>
              <Route path="/contractDetail/:id" component={ContractDetail}></Route>
              <Route path="/contractReview" component={ContractReview}></Route>
              <Route path="/newDetaile/:id" component={NewDetaile}></Route>
              <Route path="/newDetaile/:type/:id" component={NewDetaile}></Route>
              {/*type  1为公司公告  2为消息提醒  */}
              <Route path="/electricityCompany/:type" component={ElectricityCompany}></Route>
              {/*type  1为电力用户信息  2为发电厂信息  3为合作方信息  4为售电公司信息  */}
              <Route path="/electricityCompanyDetail/:type/:id" component={ElectricityCompanyDetail}></Route>
              <Route path="/customer" component={Customer}></Route>
              <Route path="/todolist" component={TodoList}></Route>
              <Route path="/todoDet" component={TodoDet}></Route>
              <Route path="/todoDetLc" component={TodoDetLc}></Route>
              <Route path="/todoDetList" component={TodoDetList}></Route>
              <Route component={ErrorPage}></Route>
            </Switch>
          </App>
        </Route>
      </Router>
    )
  }
}