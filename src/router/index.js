import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from '../App.js';
import Index from '../view/index';
import NewList from '../view/newList';
import ContractManage from '../view/contractManage';
import TodoList from '../view/todolist';
import TodoDet from '../view/todoDet';
import NewDetaile from '../view/newDetaile';
import ErrorPage from '../view/ErrorPage';

export default class ROUTER extends React.Component{
  render(){
    return (
      <Router>
        <Route>
          <App>
            <Switch>
              <Route exact path="/" component={Index}></Route>
              <Route path="/newList" component={NewList}></Route>
              <Route path="/contractManage" component={ContractManage}></Route>
              <Route path="/newDetaile/:id" component={NewDetaile}></Route>
              <Route path="/todolist" component={TodoList}></Route>
              <Route path="/todoDet" component={TodoDet}></Route>
              <Route component={ErrorPage}></Route>
            </Switch>
          </App>
        </Route>
      </Router>
    )
  }
}