import request from '../utils/request'

const api = {
  login(params) {
    return request.post('nuts/login', params)
  },
  //首页轮播图列表
  GetHomeCarouselList(params) {
    return request.get('system/official/findOneInfoByLocation?location=index_picture')
  },
  //获取轮播图片
  GetCarouselDownload(params) {
    return request.get('nuts/file/download/' + params)
  },
  //首页消息提醒  其他消息页面也可以用这个
  GetNewList(params) {
    //{"rowNumber":0,"pageSize":5}
    return request.post('systemMessageListData?hasHandled=false', params)
  },
  //公司公告列表
  GetCompanyNoticeList(params) {
    return request.post('nuts/crud/find/models_nuts_WebPage', params)
  },
  //消息列表  hasHandled=false已读  hasHandled=true 未读
  getNewListPage(params) {
    return request.get('nuts/crud/list/notHandled_systemMessage' + params)
  },
  //公司公告详情
  GetCompanyNoticeDetail(params) {
    return request.get('internalWeb/findContent' + params)
  },
  //待办事项列表
  GetScheduleList(params) {
    return request.get('nuts/crud/processTask' + params)
  },
  //售电情况总览
  GetTabControlData(params) {
    return request.post('admin/getTabControlData', params)
  },
  //电力用户查询基础数据获取
  GetPowerUserAdvancedSearchOptions(params) {
    return request.get('admin/compamy/getPowerUserAdvancedSearchOptions')
  },
  //电力用户列表
  GetPowerUsersList(params) {
    return request.post('admin/company/crud/advancedSearchListPowerUser', params)
  },
  //电力用户详情基本信息
  GetPowerUsersDetail(params) {
    return request.get('admin/company/crud/getPowerUserByIdForUpdate' + params)
  },
  //户号信息
  GetPowerUsersMemberInfo(params) {
    return request.get('admin/company/crud/getPowerTradeInfoTableData' + params)
  },
  //账号管理
  GetPowerUsersMemberManage(params) {
    return request.get('admin/company/crud/getCompanyStaffTableData' + params)
  },
  //年度预计电量
  GetPowerYearEstimate(params) {
    return request.get('admin/company/crud/getYearPowerTableData' + params)
  },
  //发电厂客户列表
  GetPowerPlantList(params) {
    return request.post('admin/company/crud/supplierlistData', params)
  },
  //发电厂客户详情
  GetPowerPlantDetail(params) {
    return request.get('admin/company/crud/getPowerSupplierByIdForUpdate' + params)
  },
  //机组成本
  GetPowerPlantCost(params) {
    //admin/company/crud/getPowerGeneratorTableData
    return request.get('admin/company/crud/getUnitCostTableData' + params)
  },
  //交易信息
  GetPowerPlantTransactionInfo(params) {
    //admin/company/crud/getUnitCostTableData
    return request.get('admin/company/crud/getTradeInfoTableData' + params)
  },
  //合作方客户列表
  GetPartnersList(params) {
    //return request.post('/admin/company/crud/supplierlistData',params)
    return request.post('admin/getPartnerData', params)
  },
  //合作方客户详情
  GetPartnersUserDetail(params) {
    return request.get('admin/company/crud/getPartnerByIdForUpdate' + params)
  },
  //合作方账号管理
  GetPartnersUserMemberManage(params) {
    return request.get('admin/company/crud/getCompanyStaffTableData' + params)
  },
  //售电公司客户列表
  GetSellingElectricityList(params) {
    return request.post('admin/market/advancedSearchListPowerCompany', params)
  },
  //售电公司客户详情
  GetSellingElectricityDetail(params) {
    return request.get('admin/company/crud/getPowerByIdForUpdate' + params)
  },
  //售电合同列表
  GetContractList(params) {
    return request.post('admin/contract/getPowerUserContract', params)
  },
  //售电合同详情
  GetContractDetail(params) {
    return request.get('admin/contract/powerUserContractView', { params: params })
  },
  //合同word导出
  GetContractDownloadWord(params) {
    return request.get('nuts/crud/contract/wordTransForm' + { params: params })
  },
  //合同Pdf导出
  GetContractDownloadPDF(params) {
    return request.get('nuts/crud/contract/PdfTransform' + params)
  },
  //电量跟踪列表
  GetRealtimePowerTableData(params) {
    return request.post('admin/trade/getRealtimePowerTableData', params)
  },
  //电量对比分析
  GetElecData(params) {
    return request.post('admin/tradeElecAnalysis/getElecData', params)
  },
  //交易电量分析  ---和上面接口一样  待定---
  GetElecData2(params) {
    return request.post('admin/tradeElecAnalysis/getElecData', params)
  },
  //偏差电量分心
  GetSouDianCompanyAnalysis(params) {
    return request.post('admin/business/getSouDianCompanyAnalysis', params)
  },
  //购电成本分析
  GetBuyPowerCostAnalysis(params) {
    return request.post('admin/costAnalysis/getData', params)
  },
  //收益分析
  GetRevenueAnalysis(params) {
    return request.post('admin/business/getAnnualProfitAnalysis', params)
  },
  //考勤列表
  GetLeaveTableData(params) {
    return request.post('admin/attendance/getLeaveTableData', params)
  },
  //获取考勤部门信息
  GetDefaultPersonalInfo(params) {
    return request.get('admin/attendance/getDefaultPersonalInfo', { params: params })
  },
  //请假类型
  GetleaveTypeOptions(params) {
    return request.get('admin/attendance/getleaveTypeOptions', params)
  },

  //加班类型
  GetOvertimeTypeOptions(params) {
    return request.get('admin/attendance/getOvertimeTypeOptions', params)
  },

  //外出类型
  GetEgressTypeOptions(params) {
    return request.get('admin/attendance/getEgressTypeOptions', params)
  },

  //请假审批状态
  GetAuditTypeOptions(params) {
    return request.get('admin/attendance/getAuditTypeOptions', params)
  },
  //保存请假
  GetSaveLeave(params) {
    return request.post('admin/attendance/oneleaveSave', params)
  },
  //提交请假
  GetSubmitLeave(params) {
    return request.post('admin/attendance/submitSign?id='+params)
  },

  //获取外出管理列表
  GetvEgressTableData(params) {
    return request.post('admin/attendance/getvEgressTableData', params)
  },

  //获取外出信息详细1
  GetDefaultEgressInfo(params) {
    return request.get('admin/attendance/getDefaultEgressInfo', { params: params })
  },

   //获取外出信息详细2
  GetEgressUserTableData(params) {
    return request.post('admin/attendance/getEgressUserTableData',params)
  },


  //保存外出
  OneEgressSave(params) {
    return request.post('admin/attendance/oneEgressSave', params)
  },

  //提交外出
  EgressSubmitSign(params) {
    return request.post('admin/attendance/egressSubmitSign?id='+params)
  },

  //获取加班管理列表
  GetOvertimeInfoTableData(params) {
    return request.post('admin/attendance/getOvertimeInfoTableData', params)
  },

  //获取加班信息详细1
  GetDefaultOvertimeInfo(params) {
    return request.get('admin/attendance/getDefaultOvertimeInfo', { params: params })
  },

   //获取外出管理列表
   GetvOvertimeTableData(params) {
    return request.post('admin/attendance/getvOvertimeTableData', params)
  },

  //加班结算方式
  GetSettlementTypeOptions(params) {
    return request.get('admin/attendance/getSettlementTypeOptions', { params: params })
  },

   //保存加班
   OneOvertimeSave(params) {
    return request.post('admin/attendance/oneOvertimeSave', params)
  },

  //提交加班
  OvertimeSubmitSign(params) {
    return request.post('admin/attendance/overtimeSubmitSign?id='+params)
  },



  //信息列表
  GetInfoPublishData(params) {
    return request.post('admin/getInfoPublishData', params)
  },
  //信息详情   新建时候发布位置type=create  修改时候发布位置type=modify
  GetInfoPublishDataDetail(params) {
    return request.get('/admin/system/getOneInfoPublishData' + params)
  },
  //撤销发布
  CencalpublishSubmit(params) {
    return request.get('admin/system/cencalpublishSubmit' + params)
  },
  //修改保存
  SetSaveEdit(params) {
    return request.post('nuts/crud/save/models_system_InfoPublish', params)
  },
  //附件、图片上传
  UploadFile(params) {
    return request.post('nuts/file/upload', params)
  },
  //消息状态
  getByEnum(params) {
    return request.get('selectOption/getByEnum' + params)
  },
  //公告信息列表
  getNoticeList(params) {
    return request.get('/market/trade/notice/search' + params)
  },
  //结果信息列表
  getResultList(params) {
    return request.get('/market/trade/result/search' + params)
  },
  //结果信息详情
  getResultDetail(params) {
    return request.get('market/trade/unified/search' + params)
  },
  //备用信息列表
  GetBackupList(params) {
    return request.get('market/trade/backup/search' + params)
  },
  //输变电检修信息列表
  GetSubstationList(params) {
    return request.get('market/trade/substation/search' + params)
  },
  //阻塞信息列表
  GetBlackList(params) {
    return request.get('market/trade/black/search' + params)
  },
  //必开必停信息列表
  GetBeginAndStopList(params) {
    return request.get('/market/trade/start_stop/search' + params)
  },
  //结算管理批发市场
  getWholesaleMarket(params) {
    return request.post('/admin/settlement/listOfficialBill?type=0', params)
  },
  //结算管理零售市场
  getRetailMarket(params) {
    return request.post('/admin/settlement/listOfficialBill?type=1', params)
  },
  //结算管理售电公司
  getElectricitySaleCompany(params) {
    return request.post('/admin/settlement/listOfficialBill?type=2', params)
  },
  //待办事项流程类型
  getmodelsNutsWorkflowProcessTask(params) {
    return request.get('/nuts/crud/audit/models_nuts_workflow_ProcessTask' + params)
  },
  //信息发布是否需要审核
  CheckInfoPublishStatus(params){
    return request.post('/admin/system/checkInfoPublishStatus' , params)
  },
  //信息发布2
  UpdateInfoPublishStatus(params){
    return request.post('/admin/system/updateInfoPublishStatus' , params)
  },
  //信息发布  --- 这个
  saveAndSubmit(params){
    return request.post('/admin/system/saveAndSubmit?isAudit=true' , params)
  },
  //中长期合同收益-合同电量
  contractPower(params){
    return request.get('/trade/match/userFind'+params)
  },
  //中长期合同收益-合同电量
  contractRevenue(params){
    return request.post('/admin/settlement/listOfficialBill?type=2', params)
  }
}

export default api
