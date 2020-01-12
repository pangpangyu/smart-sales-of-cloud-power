import React from 'react';
// import { List, Picker } from 'antd-mobile';
import { PickerView, Button } from 'antd-mobile';
import api from '../api/index';
/**
 * 年预计电量
 */

// const CustomChildren = props => (
//   <div
//     onClick={props.onClick}
//     style={{ backgroundColor: '#fff', paddingLeft: 15 }}
//   >
//     <div className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
//       <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
//       <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</div>
//     </div>
//   </div>
// );

export default class annualEstimatedPower extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pickerList: [
        {
          label: '2013',
          value: '2013',
        },
        {
          label: '2014',
          value: '2014',
        },
      ],
      value: ['2013'],
      year: '2013',
      open: false,
      yearPowerTab: [],
      electricTotal:0
    }
  }
  onScrollChange = (value) => {
    this.setState({
      value: value
    })
  }
  getDate = () => {
    const that = this
    this.setState({
      year: this.state.value[0],
      open: false
    })
  }
  componentWillMount() {
    const that = this
    that.getYearPowerTableData()
  }
  //年度预计电量
  getYearPowerTableData = () => {
    let params = `?participantId=${this.props.participantId}`
    api.GetPowerYearEstimate(params).then(res => {
      if (res.status === 0) {
        let yearPowerTab = []
        yearPowerTab[0] = res.data.rows[0].jan
        yearPowerTab[1] = res.data.rows[0].feb
        yearPowerTab[2] = res.data.rows[0].mar
        yearPowerTab[3] = res.data.rows[0].apr
        yearPowerTab[4] = res.data.rows[0].may
        yearPowerTab[5] = res.data.rows[0].jun
        yearPowerTab[6] = res.data.rows[0].jul
        yearPowerTab[7] = res.data.rows[0].aug
        yearPowerTab[8] = res.data.rows[0].sep
        yearPowerTab[9] = res.data.rows[0].oct
        yearPowerTab[10] = res.data.rows[0].nov
        yearPowerTab[11] = res.data.rows[0].dec_
        this.setState({
          yearPowerTab: yearPowerTab,
          electricTotal:res.data.rows[0].total,
          year:res.data.rows[0].yearDate
        })
      }
    })
  }
  powerUsersDet = () => {
    return (
      <div>
        <div className="power-totle" style={{ textAlign: 'center', fontSize: '11px', color: '#999999', padding: '30px 0', lineHeight: '18px' }}>
    <p><span style={{ fontSize: '16px', color: '#2b2a30', marginRight: '3px' }}>{this.state.electricTotal}</span>兆瓦时</p>
          <p>电量合计</p>
        </div>
        <div className="m-list">
          <ul>
            {this.state.yearPowerTab && this.state.yearPowerTab.map((item, index) => {
              return <li key={index}><p className="p1">{index+1}月</p><p className="p2">{item}</p></li>
            })}
            {/* <li><p className="p1">1月</p><p className="p2">102</p></li>
            <li><p className="p1">2月</p><p className="p2">102</p></li>
            <li><p className="p1">3月</p><p className="p2">102</p></li>
            <li><p className="p1">4月</p><p className="p2">102</p></li>
            <li><p className="p1">5月</p><p className="p2">102</p></li>
            <li><p className="p1">6月</p><p className="p2">102</p></li>
            <li><p className="p1">7月</p><p className="p2">102</p></li>
            <li><p className="p1">8月</p><p className="p2">102</p></li>
            <li><p className="p1">9月</p><p className="p2">102</p></li>
            <li><p className="p1">10月</p><p className="p2">102</p></li>
            <li><p className="p1">11月</p><p className="p2">102</p></li>
            <li><p className="p1">12月</p><p className="p2">102</p></li> */}
          </ul>
          <div className="clear"></div>
        </div>
      </div>
    )
  }
  electricityGenerationDet = () => {
    return (
      <div>
        <div className="transactioninfo">
          <div className="l">
            <h3>时间</h3>
            <ul>
              <li>2019-01</li>
              <li>2019-02</li>
              <li>2019-03</li>
              <li>2019-04</li>
              <li>2019-05</li>
            </ul>
          </div>
          <div className="r">
            <div style={{ overflowX: "auto" }}>
              <div className="list">
                <ul>
                  <li>基数电量</li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <div className="list">
                <ul>
                  <li>省内电量</li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <div className="list">
                <ul>
                  <li>省外电量</li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <div className="list">
                <ul>
                  <li>议价期期望</li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="annualEstimatedPower">
        <div className="chooes-year">
          <div className="l">选择年份</div>
          <div className="r" onClick={() => this.setState({ open: true })}>
            {this.state.year}<i className="iconfont iconxiala-copy" style={{ fontSize: '10px', color: '#cccccc' }}></i>
          </div>
        </div>
        {this.props.type === '1' && this.powerUsersDet()}
        {this.props.type === '2' && this.electricityGenerationDet()}
        <div className={this.state.open ? 'modal on' : 'modal'}>
          <div className="modal_bg" onClick={() => this.setState({ open: false })}></div>
          <div className="pick_box">
            <PickerView
              onChange={this.onChange}
              onScrollChange={this.onScrollChange}
              value={this.state.value}
              data={this.state.pickerList}
              cascade={false}
            />
            <div className="module-space"></div>
            <div className="btns">
              <Button className="btn" type="primary" onClick={() => this.setState({ open: false })}>取消</Button>
              <Button className="btn btn1" type="primary" onClick={this.getDate}>确定</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
