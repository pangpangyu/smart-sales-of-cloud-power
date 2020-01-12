import React, { Fragment } from 'react';
import Header from '../components/header';
import ContractAttachment from './contractAttachment';
import ContractMes from './contractMes';
import { Tabs, View } from 'antd-mobile';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import api from '../api/index';
import { baseUrl } from '../config/index'
class ContractDetail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tabs: [
				{ id: 0, title: '合同内容' },
				{ id: 1, title: '附件信息' }
			],
			contractId: this.props.match.params.id,
			contractDetail: [],
			botBtnShow: true,
			addStatus: false,
			docType: "doc",//文档类型 
			hetongId:0,
		}
	}

	componentDidMount() {
		const that = this;
		document.documentElement.scrollTop = document.body.scrollTop = 0;
		that.GetContractDetail();
		// that.GetContractDownloadWord();

	}

	//售电合同详情
	GetContractDetail() {
		const that = this
		let params = {
			id: that.state.contractId,
			templId: 0,
		};
		api.GetContractDetail(params).then(res => {
			if (res.status === 0) {
				that.setState(() => {
					return ({
						contractDetail: res.data,
						hetongId: res.data.powerUserContract.contract.id
					})
				})
			} else {

			}


		})
	}

	//导出word pdf

	//合同Pdf导出
	GetContractDownloadPDF() {

	}

	handleCheckChanged = e => {
		this.setState({
			docType: e.target.value
		})
	}

	handleAdd = e => {
		this.setState({
			addStatus: true,
			docType: "doc"
		})

	}

	handleCancel = e => {
		this.setState({
			addStatus: false
		})
	}
	handleOk = e => {
		e.preventDefault()
		const that = this
		if (that.state.docType === "doc") {
			let url = `${baseUrl}/nuts/crud/contract/wordTransForm?contractId=${this.state.hetongId}`
			window.open(url)
		} else if (that.state.docType === "pdf") {//pdf
			let url = `${baseUrl}/nuts/crud/contract/PdfTransform?contractId=${this.state.hetongId}`
			window.open(url)
		}
	}



	//
	handleTabs = (val) => {
		const that = this;
		if (val.id === 0) {
			that.setState({
				botBtnShow: true
			})
		} else {
			that.setState({
				botBtnShow: false
			})
		}
	}

	setDownDoc = () => {
		this.setState({
			docType: 'doc'
		})
	}
	setDownPdf = () => {
		this.setState({
			docType: 'pdf'
		})
	}

	render() {
		let t =
			<div >
				<div className="footer-btn-group-space"></div>
				<div className="footer-btn-group">
					<div className="btn-group">
						<Link to={`/contractReview/${this.state.contractId}`}>预览</Link>
						<Link to='#' onClick={this.handleAdd}>导出</Link>
					</div>
				</div>
			</div>
		let mask =
			<div className="mask">
				<div className="attedance-dialog">
					<div className="tit">请选择导出格式</div>
					<div className="cont">
						<div className="item" onClick={this.setDownDoc}>
							<img className="img" src={require('../assets/img/img210.png')} alt="" />
							<div className="self-radio">
								{/* <input id="r1" type="radio" value={"doc"} name="attedance" checked={this.state.docType === 'doc'}/> */}
								{/* onChange={this.handleCheckChanged}  */}
								<label className={this.state.docType === 'doc'?'on':''} htmlFor="r1">WORD</label>
							</div>
						</div>
						<div className="item" onClick={this.setDownPdf}>
							<img className="img" src={require('../assets/img/img211.png')} alt="" />
							<div className="self-radio">
								{/* <input id="r2" type="radio" value={"pdf"} name="attedance" checked={this.state.docType === 'pdf'}/> */}
								{/* onChange={this.handleCheckChanged}  */}
								<label className={this.state.docType === 'pdf'?'on':''} htmlFor="r2">PDF</label>
							</div>
						</div>
					</div>
					<div className="btn-group">
						<button onClick={this.handleCancel} className="btn-cancel">取消</button>
						<button className="btn-sure" onClick={this.handleOk}>确定</button>
					</div>
				</div>
			</div>
		return (
			<Fragment>
				<Header title={'合同信息'} back={true} search={false} />
				<Tabs
					tabs={this.state.tabs}
					swipeable={false}
					tabBarActiveTextColor="#288dfd"
					onChange={this.handleTabs}
				>
					<View>
						{/*  合同内容  */}
						<ContractMes
							content={this.state.contractDetail}
							contractId={this.state.contractId}
						/>

					</View>
					<View>
						{/*  附件信息  */}
						<ContractAttachment
							content={this.state.contractDetail}
							contractId={this.state.contractId}
						/>
					</View>
				</Tabs>

				{this.state.botBtnShow ? t : ''}
				{this.state.addStatus ? mask : ''}

				{/* <div style={{display:this.state.botBtnShow?'block':'none'}}>
                <div className="footer-btn-group-space"></div>
                <div className="footer-btn-group">
                    <div className="btn-group">
                        <Link to={`/contractReview/${this.state.contractId}`}>
                            预览
                        </Link>
                        <Link to="">
                            导出
                        </Link>
                    </div>
                </div>
            </div> */}

			</Fragment>
		)
	}

}

export default ContractDetail;