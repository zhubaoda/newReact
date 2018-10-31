import React, { Component } from 'react'
import './home.css'
import classNames from 'classnames';
import interfaces from '../../interfaces/index'
import Global from '../../interfaces/globalname'

import { PullToRefresh, Toast } from 'antd-mobile';
import Head from '../../components/head/head'
import Tab from '../../components/tab/tab'
class Home extends Component {
  state = {
  	title: '首页',
  	tablist: ['选项一', '选项二', '选项三', '选项四', '选项五', '选项六', '选项七', '选项八'],
  	idx: 0,
  	canScroll: 1,
  	itemWidth: 100,
    params: {
			page: 1,
			pageSize: 10,
			tab: 1
		},
		list: [],
		refreshing: false,
		down: true,
		onBottom: false,
		bannerList: []
  }
  render() {
    return (
    	<div className={ classNames('home', {'active': this.state.refreshing === true }) }>
				<div className="top">
					<Head title={this.state.title} />
					<Tab 
						list={this.state.tablist}
						idx={this.state.idx}
						canScroll={this.state.canScroll}
						itemWidth={this.state.itemWidth}
						selectBar={this.selectBar.bind(this)}
					/>
				</div>
			  <div ref="list" className="list">
					<PullToRefresh
							refreshing={this.state.refreshing}
							onRefresh={this.onRefresh.bind(this)}
							direction={this.state.down ? 'down' : 'up'}
						>
						{ this.state.list ? this.state.list.map((d, i) => (
							<div key={i} className="item">
								<div className="image-box">
									 <img src={d.imgUrl} className="image" alt=""/>
								</div>  
								<div className="center">
									<div className="title">{d.name}</div>
									<div className="price">单价: $18/份</div>
								</div>
								<div className="detail-button">查看详情</div>
							</div>
						)) : null }
					</PullToRefresh>
				</div>
      </div>
    );
  }
  async getData () {
    let actiontype = Global.CabinActiveService_GetActivityList
		let res = await interfaces.getActivity(actiontype)
		console.log(res)
  }
  async selectBar (index) {
  	this.setState({
  	  idx: index
  	})	
		const { params } = this.state
		params.tab = this.state.tablist[index].id
		params.page = 1
		this.setState({
			params: params,
			list: []
		})
		Toast.loading('Loading...') 
		await this.getList()
		setTimeout(() => {
			Toast.hide()
		}, 500)	
  }
	async onRefresh () {	
		this.setState({ refreshing: true })
		const { params } = this.state
		params.page = 1
    await this.setState({
			params: params
		})
		await this.getList()
		setTimeout(() => {
			this.setState({ refreshing: false })
		}, 1000)	
	}
	async onBottomHandle (event) {
		const clientHeight = event.target.clientHeight
    const scrollHeight = event.target.scrollHeight
    const scrollTop = event.target.scrollTop
    const isBottom = (clientHeight + scrollTop === scrollHeight)
		if (isBottom) {
			const { params } = this.state
      params.page++
			await this.setState({
				params: params,
				down: false
			})
			this.setState({ refreshing: true })
			await this.getList()
			setTimeout(() => {
				this.setState({ 
				  refreshing: false,
					down: true
				})
			}, 1000)	
		}
	}
	async getBanner () {
		// let bannerList = await interfaces.getHello()
	}
 	async getList () {
//		let goodlist = await interfaces.getGoodList(this.state.params)
//		if (!goodlist.hasError && goodlist.data) {
//			let list = []
//			if (this.state.params.page === 1) {
//				list = goodlist.data
//			} else {
//				list = this.state.list
//				list = list.concat(goodlist.data)
//			}
//			this.setState({
//				list: [...list]
//		  })
//		}
	}
	async getTab () {
		let tablist = await interfaces.getTabList()
		if (!tablist.hasError && tablist.data) {
			let tab = []
			tablist.data.map(d => {
				tab.push(d.title)
				return d
			})
			this.setState({
				tablist: [...tab]
			})
		}
	}
	async componentDidMount () {
		this.refs.list.addEventListener('scroll', this.onBottomHandle.bind(this))
	}
  async componentWillMount () {
    console.log('welcome entering home page!')
    // this.getBanner()
		// this.getList()
		this.getData()
  }
}

export default Home;