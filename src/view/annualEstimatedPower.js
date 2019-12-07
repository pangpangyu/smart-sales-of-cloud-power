import React from 'react';
import { Picker } from 'antd-mobile';
/**
 * 年预计电量
 */
export default class annualEstimatedPower extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      year: '2019',
      pickerList: ['2019','2018']
    }
  }
  render(){
    const CustomChildren = props => (
      <div>123</div>
    );
    return(
      <div>
        <div className="chooes-year">
          <div className="l">选择年份</div>
          <div className="r">
          <Picker
            data={this.state.pickerList}
            cols={1}
          >
            <CustomChildren>Customized children</CustomChildren>
          </Picker>
            {/* {this.state.year}<i className="iconfont iconxiala-copy" style={{fontSize:'10px',color:'#cccccc'}}></i> */}
          </div>
        </div>
      </div>
    )
  }
}
