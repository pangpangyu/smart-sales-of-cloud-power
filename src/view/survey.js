import React from 'react';
import Header from '../components/header';
import api from '../api/index';
import echarts from 'echarts';
/**
 * 售电概况
 */

class Survey extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      year: 2019,
      contractNum: 0,
      cusCount: 0,
      earnings: 0,
      electricQuantity: 0,
      data: {}
    }
  }

  componentDidMount() {
    const that = this
    that.getTitleData()
    that.getDataChart1()
    that.getDataChart2()
    that.getDataChart3()
    that.getDataChart4()
    that.getDataChart5()
  }
  //售电情况总览
  getTitleData = () => {
    //const that = this
    let params = { "electricQuantity": 48178, "cusCount": 12, "earnings": 0.01, "year": 2019, "contractNum": 5 }
    api.GetTabControlData(params).then(res => {
      this.setState({
        contractNum: res.contractNum,
        cusCount: res.cusCount,
        earnings: res.earnings,
        electricQuantity: res.electricQuantity,
        year: res.year,
      })
    })
  }
  getDataChart1 = () => {
    api.getConractNumByYearMonth().then(res => {
      let keyArr = Object.keys(res.data)
      let totle = 0
      keyArr.map((item,index) => {
        totle += res.data[item]
        return totle
      })
      let data = [
        { value: res.data['1m'], name: '1月', percentage: totle === 0 ? '0%' : ((parseInt(res.data['1m'] / totle * 100)) + '%') },
        { value: res.data['2m'], name: '2月', percentage: totle === 0 ? '0%' : ((parseInt(res.data['2m'] / totle * 100)) + '%') },
        { value: res.data['3m'], name: '3月', percentage: totle === 0 ? '0%' : ((parseInt(res.data['3m'] / totle * 100)) + '%') },
        { value: res.data['4m'], name: '4月', percentage: totle === 0 ? '0%' : ((parseInt(res.data['4m'] / totle * 100)) + '%') },
        { value: res.data['5m'], name: '5月', percentage: totle === 0 ? '0%' : ((parseInt(res.data['5m'] / totle * 100)) + '%') },
        { value: res.data['6m'], name: '6月', percentage: totle === 0 ? '0%' : ((parseInt(res.data['6m'] / totle * 100)) + '%') },
        { value: res.data['7m'], name: '7月', percentage: totle === 0 ? '0%' : ((parseInt(res.data['7m'] / totle * 100)) + '%') },
        { value: res.data['8m'], name: '8月', percentage: totle === 0 ? '0%' : ((parseInt(res.data['8m'] / totle * 100)) + '%') },
        { value: res.data['9m'], name: '9月', percentage: totle === 0 ? '0%' : ((parseInt(res.data['9m'] / totle * 100)) + '%') },
        { value: res.data['10m'], name: '10月', percentage: totle === 0 ? '0%' : ((parseInt(res.data['10m'] / totle * 100)) + '%') },
        { value: res.data['11m'], name: '11月', percentage: totle === 0 ? '0%' : ((parseInt(res.data['11m'] / totle * 100)) + '%') },
        { value: res.data['12m'], name: '12月', percentage: totle === 0 ? '0%' : ((parseInt(res.data['12m'] / totle * 100)) + '%') }
      ]
      this.paintingChart1(data)
    })
  }
  paintingChart1 = (data) => {
    var myChart = echarts.init(document.getElementById('myChart1'));
    // let data = [
    //   { value: '5', name: '1月', percentage: '6%' },
    //   { value: '5', name: '2月', percentage: '6%' },
    //   { value: '5', name: '3月', percentage: '6%' },
    //   { value: '5', name: '4月', percentage: '6%' },
    //   { value: '5', name: '5月', percentage: '6%' },
    //   { value: '5', name: '6月', percentage: '6%' },
    //   { value: '5', name: '7月', percentage: '6%' },
    //   { value: '5', name: '8月', percentage: '6%' },
    //   { value: '5', name: '9月', percentage: '6%' },
    //   { value: '5', name: '10月', percentage: '6%' },
    //   { value: '5', name: '11月', percentage: '6%' },
    //   { value: '5', name: '12月', percentage: '6%' },
    // ]
    let option = {
      color: ['#616fd8', '#dc6142', '#6dcfce', '#ddc275', '#e1a26d', '#b3b273', '#7aa0ca', '#c380a6', '#44c489', '#288dfd', '#f9a30c', '#ac663d'],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        itemHeight: 8,
        itemWidth: 8,
        icon: "circle",
        itemGap: 10,
        formatter: function (name) {
          let arr = data.filter(item => item.name === name)[0]
          return name + ' ' + arr.value + '份 ' + arr.percentage + ' ';
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['80%', '50%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '15',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: data
        }
      ]
    };
    myChart.setOption(option)
  }

  getDataChart2 = () => {
    this.paintingChart2()
  }
  paintingChart2 = () => {
    var myChart = echarts.init(document.getElementById('myChart2'));
    let option = {
      color: ['#288dfd'],
      dataset: {
        source: [
          [90, 2017],
          [103, 2018],
          [124, 2019]
        ]
      },
      grid: {
        top: '10%',
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
            }
          }
        },
      ],
      yAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            type: 'solid',
            color: '#eeeeee',
            width: '1'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#666666',//坐标值得具体的颜色
          }
        }
      },
      series: [
        {
          type: 'bar',
          encode: {
            x: '',
            y: ''
          },
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 10
            },
            emphasis: {
              barBorderRadius: 10
            }
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#000'
              }
            }
          }
        }
      ]
    }
    myChart.setOption(option)
  }

  getDataChart3 = () => {
    let params = `?rowNumber=0&pageSize=1000&year=2019`
    let data = {
      data1: [],
      data2: [],
      dataX: []
    }
    let yearMon = ''
    let arrPromise = []
    new Promise((resolve, reject) => {
      arrPromise.push(api.contractPower(params))
    })
    for (let i = 1; i < 13; i++) {
      yearMon = `2019-` + i
      let params1 = {
        rowNumber: 0,
        pageSize: 1000,
        yearMon1: 1,
        yearMon: yearMon
      }
      new Promise((resolve, reject) => {
        arrPromise.push(api.contractRevenue(params1))
      })
    }
    Promise.all(arrPromise).then(res => {
      if (res.length === 13) {
        res.map((item, index) => {
          if (index === 0) {
            let dataArr = item.data.rows
            let mon1 = dataArr.reduce(function (total, currentValue, currentIndex, arr) {
              return total + currentValue.mon1;
            }, 0);
            let mon2 = dataArr.reduce(function (total, currentValue, currentIndex, arr) {
              return total + currentValue.mon2;
            }, 0);
            let mon3 = dataArr.reduce(function (total, currentValue, currentIndex, arr) {
              return total + currentValue.mon2;
            }, 0);
            let mon4 = dataArr.reduce(function (total, currentValue, currentIndex, arr) {
              return total + currentValue.mon2;
            }, 0);
            let mon5 = dataArr.reduce(function (total, currentValue, currentIndex, arr) {
              return total + currentValue.mon2;
            }, 0);
            let mon6 = dataArr.reduce(function (total, currentValue, currentIndex, arr) {
              return total + currentValue.mon2;
            }, 0);
            let mon7 = dataArr.reduce(function (total, currentValue, currentIndex, arr) {
              return total + currentValue.mon2;
            }, 0);
            let mon8 = dataArr.reduce(function (total, currentValue, currentIndex, arr) {
              return total + currentValue.mon2;
            }, 0);
            let mon9 = dataArr.reduce(function (total, currentValue, currentIndex, arr) {
              return total + currentValue.mon2;
            }, 0);
            let mon10 = dataArr.reduce(function (total, currentValue, currentIndex, arr) {
              return total + currentValue.mon2;
            }, 0);
            let mon11 = dataArr.reduce(function (total, currentValue, currentIndex, arr) {
              return total + currentValue.mon2;
            }, 0);
            let mon12 = dataArr.reduce(function (total, currentValue, currentIndex, arr) {
              return total + currentValue.mon2;
            }, 0);
            data.data1 = [mon1, mon2, mon3, mon4, mon5, mon6, mon7, mon8, mon9, mon10, mon11, mon12]
          } else {
            let sum = item.data.rows.reduce(function (total, currentValue, currentIndex, arr) {
              return total + currentValue.totalFee;
            }, 0);
            data.data2.push(sum)
          }
        })
      }
    }).then(res => {
      for (let i = 0; i < 12; i++) {
        data.dataX.push(i + 1 + '月')
      }
      this.paintingChart3(data)
    })
  }

  paintingChart3 = (data) => {
    console.log(data)
    let option = {
      color: ['#288dfd', '#f9a30c'],
      legend: {
        data: ['合同电量', '合同收益']
      },
      grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      legend: {
        itemHeight:8,
        itemWidth: 20,
        borderRadius:[5,5,5,5],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            color: '#000'
          }
        },
        formatter: function (params) {
          var result = ''
          params.forEach(function (item) {
            result += item.seriesName + ':' + item.value + "</br>"
          })
          return result
        }
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: data.dataX,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
            }
          }
        },
        {
          type: 'category',
          boundaryGap: true,
          data: data.dataX,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          min: 0,
          boundaryGap: data.dataX,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
            }
          }
        },
        {
          type: 'value',
          scale: true,
          min: 0,
          boundaryGap: data.dataX,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
            }
          }
        }
      ],
      series: [
        {
          name: '合同电量',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data.data1,
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 10
            },
            emphasis: {
              barBorderRadius: 10
            }
          }
        },
        {
          name: '合同收益',
          type: 'line',
          symbolSize:8,
          data: data.data2
        }
      ]
    };
    var myChart = echarts.init(document.getElementById('myChart3'));
    myChart.setOption(option)
  }

  getDataChart4 = () => {
    this.paintingChart4()
  }
  paintingChart4 = () => {
    var myChart = echarts.init(document.getElementById('myChart4'));
    let data = {
      "data1": [],
      "data2": [],
      "delta": [],
      "names": []
    }
    for (let i = 0; i < 31; i++) {
      data.data1.push(parseInt(Math.random() * 100))
      data.data2.push(parseInt(Math.random() * 200))
      data.delta.push(i)
      data.names.push(i + 1 + '日')
    }
    let option = {
      color: ['#288dfd', '#f9a30c'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            color: '#000'
          }
        }
      },
      calculable: true,
      legend: {
        data: ['申报电量', '实时电量'],
        itemHeight: 8,
        itemWidth: 20,
        itemStyle: {},
        formatter: function (name) {
          return name;
        }
      },
      grid: {
        top: '15%',
        left: '1%',
        right: '3%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: data.names,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
              formatter: function (a) {
                a = +a;
                return isFinite(a) ? echarts.format.addCommas(+a / 1000) : '';
              }
            }
          }
        }
      ],
      dataZoom: [
        {
          show: true,
          start: 0,
          end: 31,
          type: 'inside',
        }
      ],
      series: [
        {
          name: '申报电量',
          type: 'bar',
          data: data.data2,
          barWidth: 9,
          barGap: 0,
          itemStyle: {
            normal: {
              barBorderRadius: 10
            },
            emphasis: {
              barBorderRadius: 10
            }
          }
        },
        {
          name: '实时电量',
          type: 'bar',
          data: data.data1,
          barWidth: 9,
          itemStyle: {
            normal: {
              barBorderRadius: 10
            },
            emphasis: {
              barBorderRadius: 10
            }
          }
        }
      ]
    };

    myChart.setOption(option);
  }

  getDataChart5 = () => {
    this.paintingChart5()
  }
  paintingChart5 = () => {
    var myChart = echarts.init(document.getElementById('myChart5'));
    let data = {
      "data1": [],
      "data2": [],
      "delta": [],
      "names": []
    }
    for (let i = 0; i < 31; i++) {
      data.data1.push(parseInt(Math.random() * 100))
      data.data2.push(parseInt(Math.random() * 200))
      data.delta.push(i)
      data.names.push(i + 1 + '日')
    }
    let option = {
      color: ['#288dfd', '#f9a30c'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            color: '#000'
          }
        }
      },
      calculable: true,
      legend: {
        data: ['日前均价', '实时均价'],
        itemHeight:8,
        itemWidth: 20,
        formatter: function (name) {
          //return name === '申报电量' ? '申报电量 ' + (data.data1[index - 1]) : '实时电量 ' + (data.data2[index - 1]);
          return name;
        }
      },
      grid: {
        top: '15%',
        left: '1%',
        right: '3%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: data.names,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
              formatter: function (a) {
                a = +a;
                return isFinite(a) ? echarts.format.addCommas(+a / 1000) : '';
              }
            }
          }
        }
      ],
      dataZoom: [
        {
          show: true,
          start: 0,
          end: 31,
          type: 'inside',
        }
      ],
      series: [
        {
          name: '日前均价',
          type: 'line',
          data: data.data2,
          barGap: 0,
          symbolSize:8,
          itemStyle: {
            normal: {
              barBorderRadius: 10
            },
            emphasis: {
              barBorderRadius: 10
            }
          }
        },
        {
          name: '实时均价',
          type: 'line',
          symbolSize:8,
          data: data.data1,
        }
      ]
    };

    myChart.setOption(option);
  }

  render() {
    return (
      <div className="survey-page" style={{ minHeight: '100vh', background: '#f0f1f3', paddingBottom: '20px' }}>
        <Header title={'售电概况'} back={true} search={false} />
        <div className="top-totls">
          <div className="item" style={{ background: '#3778f5' }}>
            <p><span style={{ fontSize: '19px' }}>{this.state.contractNum}</span>个</p>
            <p style={{ paddingTop: '10px' }}>合同总数</p>
          </div>
          <div className="item" style={{ background: '#288dfd' }}>
            <p><span style={{ fontSize: '19px' }}>{this.state.electricQuantity}</span>兆瓦时</p>
            <p style={{ paddingTop: '10px' }}>合同电量</p>
          </div>
          <div className="item" style={{ background: '#3aaafb' }}>
            <p><span style={{ fontSize: '19px' }}>{this.state.earnings}</span>万元</p>
            <p style={{ paddingTop: '10px' }}>合同收益</p>
          </div>
          <div className="item" style={{ background: '#4fcdfd' }}>
            <p><span style={{ fontSize: '19px' }}>{this.state.cusCount}</span>个</p>
            <p style={{ paddingTop: '10px' }}>客户总数</p>
          </div>
        </div>
        <div style={{ height: '10px', color: '#f0f1f3' }}></div>
        <div className="charts-map">
          <div className="title" style={{ borderBottom: '1px solid #eeeeee' }}>
            <img src={require('../assets/img/img020.png')} style={{width:'17px',display:'inline-block',verticalAlign:'middle',margin:'-3px 3px 0 0'}} alt=""/>合同数量（2019年）
            {/* <i className="iconfont iconhetong"></i> */}
          </div>
          <div className="chear-view">
            <div style={{ fontSize: '12px', color: '#2b2a30', margin: '20px 0 10px 0' }}>各月份合同数据</div>
            <div id="myChart1" style={{ height: '140px' }}></div>
            <div style={{ fontSize: '12px', color: '#2b2a30', marginTop: '10px' }}>近三年合同数量</div>
            <div id="myChart2" style={{ height: '120px' }}></div>
          </div>
        </div>
        <div style={{ height: '10px', background: '#f0f1f3' }}></div>
        <div className="charts-map">
          <div className="title" style={{ borderBottom: '1px solid #eeeeee', marginBottom: '10px' }}>
            {/* <i className="iconfont iconjiage"></i> */}
            <img src={require('../assets/img/img021.png')} style={{width:'17px',display:'inline-block',verticalAlign:'middle',margin:'-3px 3px 0 0'}} alt=""/>
            中长期合同收益（2019年）
          </div>
          <div className="chear-view">
            <div id="myChart3" style={{ height: '230px' }}></div>
          </div>
        </div>
        <div style={{ height: '10px', background: '#f0f1f3' }}></div>
        <div className="charts-map">
          <div className="title" style={{ borderBottom: '1px solid #eeeeee', marginBottom: '10px' }}>
            {/* <i className="iconfont icondianliang"></i> */}
            <img src={require('../assets/img/img022.png')} style={{width:'17px',display:'inline-block',verticalAlign:'middle',margin:'-3px 3px 0 0'}} alt=""/>
            现货电量（2019年11月）
          </div>
          <div className="chear-view" style={{ paddingBottom: '10px' }}>
            <div id="myChart4" style={{ height: '230px' }}></div>
          </div>
        </div>
        <div style={{ height: '10px', background: '#f0f1f3' }}></div>
        <div className="charts-map">
          <div className="title" style={{ borderBottom: '1px solid #eeeeee', marginBottom: '10px' }}>
            {/* <i className="iconfont iconshouyi"></i> */}
            <img src={require('../assets/img/img023.png')} style={{width:'17px',display:'inline-block',verticalAlign:'middle',margin:'-3px 3px 0 0'}} alt=""/>
            现货价格（2019年）
          </div>
          <div className="chear-view">
            <div id="myChart5" style={{ height: '230px' }}></div>
          </div>
        </div>
      </div>
    )
  }

}

export default Survey;






