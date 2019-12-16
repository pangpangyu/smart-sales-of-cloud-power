import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from '../App.js';
import Index from '../view/index';
import NewList from '../view/newList';
import ContractManage from '../view/contractManage';
import ContractDetail from '../view/contractDetail';
import ContractReview from '../view/contractReview';
import AttendanceList from '../view/attendanceList';
import AttendanceAdd from '../view/attendanceAdd';
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
import InfoDeliveyDetail from '../view/infoDeliveyDetail';
import InfoDeliveyAdd from '../view/infoDeliveyAdd';
import BsinessAnalysis from '../view/businessAnalysis';
import PowerTracking from '../view/powerTracking';
import ActualPowerRecord from '../view/actualPowerRecord';
import SpotDeclarationDetDay from '../view/spotDeclarationDetDay';
import SpotDeclarationDetMonth from '../view/spotDeclarationDetMonth';
import PowerTrackingDet from '../view/powerTrackingDet';
import TradingCenter from '../view/tradingCenter';
import MediumAndLongTermDet from '../view/mediumAndLongTermDet';
import UnifiedLoadRegulationDet from '../view/unifiedLoadRegulationDet';
import ProvincialNetworkDet from '../view/provincialNetworkDet';
import OutwardDeliveryPlanDet from '../view/outwardDeliveryPlanDet';
import PowerUserDetails from '../view/powerUserDetails';
import PowerGenerationEnterprise from '../view/powerGenerationEnterprise';
import DetailsPartners from '../view/detailsPartners';
import ElectricitySaleCompany from '../view/electricitySaleCompany';
import ImaView from '../view/imgView';
import ErrorPage from '../view/ErrorPage';


export default class ROUTER extends React.Component {
  render() {
    return (
      <Router>
        <Route>
          <App>
            <Switch>
              <Route exact path="/" component={Index}></Route>
              <Route path="/newList/:type" component={NewList}></Route>
              {/*type  1为公司公告  2为消息提醒  */}
              <Route path="/newDetaile/:type/:id" component={NewDetaile}></Route>
              <Route path="/survey" component={Survey}></Route>
              <Route path="/contractManage" component={ContractManage}></Route>
              <Route path="/contractDetail/:id" component={ContractDetail}></Route>
              <Route path="/contractReview/:id" component={ContractReview}></Route>
              <Route path="/attendanceList" component={AttendanceList}></Route>
              <Route path="/attendanceAdd/:type/:id" component={AttendanceAdd}></Route>
              <Route path="/electricityCompany/:type" component={ElectricityCompany}></Route>
              {/*type  1为电力用户信息  2为发电厂信息  3为合作方信息  4为售电公司信息  */}
              <Route path="/electricityCompanyDetail/:type/:id" component={HouserNum}></Route>
              <Route path="/account/:id" component={Account}></Route>
              <Route path="/customer" component={Customer}></Route>
              <Route path="/settlementManage" component={SettlementManage}></Route>
              <Route path="/todolist" component={TodoList}></Route>
              <Route path="/infoDelivey" component={InfoDelivey}></Route>
              <Route path="/infoDeliveyDetail/:id" component={InfoDeliveyDetail}></Route>
              <Route path="/infoDeliveyAdd" component={InfoDeliveyAdd}></Route>
              <Route path="/bsinessAnalysis" component={BsinessAnalysis}></Route>
              <Route path="/todoDet/:id" component={TodoDet}></Route>
              <Route path="/todoDetLc/:id" component={TodoDetLc}></Route>
              <Route path="/todoDetList/:id" component={TodoDetList}></Route>
              <Route path="/powerTracking" component={PowerTracking}></Route>
              <Route path="/actualPowerRecord" component={ActualPowerRecord}></Route>
              <Route path="/spotDeclarationDetDay" component={SpotDeclarationDetDay}></Route>
              <Route path="/spotDeclarationDetMonth" component={SpotDeclarationDetMonth}></Route>
              <Route path="/powerTrackingDet" component={PowerTrackingDet}></Route>
              <Route path="/tradingCenter" component={TradingCenter}></Route>
              <Route path="/mediumAndLongTermDet" component={MediumAndLongTermDet}></Route>
              <Route path="/unifiedLoadRegulationDet" component={UnifiedLoadRegulationDet}></Route>
              <Route path="/provincialNetworkDet" component={ProvincialNetworkDet}></Route>
              <Route path="/outwardDeliveryPlanDet" component={OutwardDeliveryPlanDet}></Route>
              <Route path="/powerUserDetails" component={PowerUserDetails}></Route>
              <Route path="/powerGenerationEnterprise" component={PowerGenerationEnterprise}></Route>
              <Route path="/detailsPartners" component={DetailsPartners}></Route>
              <Route path="/electricitySaleCompany" component={ElectricitySaleCompany}></Route>
              {/* 查看图片页面图片 */}
              <Route path="/imaView" component={ImaView}></Route>
              <Route component={ErrorPage}></Route>
            </Switch>
          </App>
        </Route>
      </Router>
    )
  }
}