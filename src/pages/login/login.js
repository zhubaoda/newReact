import React, { Component } from 'react'
import interfaces from '../../interfaces/index'
import './login.css';
import Head from '../../components/head/head'
import { Toast } from 'antd-mobile';
class Login extends Component {
  state = {
  	title: '登录',
    formData: {
	    phone: '',
	    password: ''
    },
    base64: ''
  }
  render() {
    return (
      <div className="login">
        <Head title={this.state.title} />
        <div className="main">
	  	  <div className="box">
	  	    <div className="box-item display_box_t">
	  	    	   <img src={require("../../static/icon/phone.svg")} className="phone-img" alt=""/>
	  	    	   <input type="number" onChange={this.changePhone.bind(this)} value={this.state.formData.phone} placeholder="+86 请输入手机号" className="item-input"/>
	  	    	   { this.state.formData.phone ? <span onClick={this.clearPhone.bind(this)}>X</span> : null }
	  	    </div>
	  	    <div className="box-item display_box_t">
	  	    	   <img src={require("../../static/icon/password.svg")} className="phone-img" alt=""/>
	  	    	   <input type="password" onChange={this.changePassWord.bind(this)} value={this.state.formData.password} placeholder="请输入密码" className="item-input" />
	  	    	   { this.state.formData.password ? <span onClick={this.clearPassWord.bind(this)}>X</span> : null }
	  	    </div>
	  	    <div className="submit" onClick={this.login.bind(this)}>
	  	    	   <span>登录</span>
	  	    </div>
	  	  </div>
	  	</div>
	  	<a href={this.state.base64} download="tttt">下载图片</a>
      </div>
    );
  }
  async login () {
  	const { formData } = this.state
  	if (!formData.phone) {
      Toast.info('请输入手机号')
  	  return
  	}
  	
  	if (formData.phone) {
  	  let pat = /^[1][3,4,5,7,8][0-9]{9}$/
  	  if (!pat.test(formData.phone)) {
  	  	Toast.info('手机号格式不正确')
  	  	return
  	  }
  	}
  	
  	if (!formData.password) {
  	  Toast.info('请输入密码')
  	  return
  	}
  	
  	let res = await interfaces.login(formData)
  	if (res && res.msg) {
  	  let msg = res.msg.toString()
  	  Toast.info(msg)
  	}
  	if (res && res.code === 200) { 
    	  if (res.bindings && res.bindings[1] && res.bindings[1].tokenJsonStr) {
    	  	let info = JSON.parse(res.bindings[1].tokenJsonStr)
    	  	info.userId = res.bindings[1].userId;
    	  	localStorage.setItem('info', JSON.stringify(info))
    	  }
    	  Toast.info('登录成功！')
      window.location = '/'
    }   
  }
  async changePhone (e) {
  	const { formData } = this.state
  	formData.phone = e.target.value
  	await this.setState({ formData: formData })
  }
  async clearPhone (e) {
  	const { formData } = this.state
  	formData.phone = ''
  	await this.setState({ formData: formData })
  }
  async changePassWord (e) {
  	const { formData } = this.state
  	formData.password = e.target.value
  	await this.setState({ formData: formData })
  }
  async clearPassWord (e) {
  	const { formData } = this.state
  	formData.password = ''
  	await this.setState({ formData: formData })
  }
  async getBaseImg (img) {
	let canvas = document.createElement('canvas')
  	canvas.width = img.width
  	canvas.height = img.height 	
    let ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height)
	let ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase()
  	let dataURL = canvas.toDataURL('image/'+ext)
  	return dataURL
  }
  async componentDidMount () {
  	console.log('welcome entering login page!')
    let that = this
  	let image = new Image()
  	image.src = '/weapp/shop/fenxiao/member/22.jpg'
  	this.crossOrigin = 'anonymous' 	
  	image.onload = async function() {
	    let base64 = await that.getBaseImg(image)
	    that.setState({
	  	  base64: base64
	    }) 
  	}	
  }
}

export default Login;