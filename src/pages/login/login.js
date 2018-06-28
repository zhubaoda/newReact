import React, { Component } from 'react';
import interfaces from '../../interfaces/index';
import './login.css';
import Head from '../../components/head/head'
import { Toast } from 'antd-mobile';
class Login extends Component {
  state = {
  	title: '登录',
    formData: {
	  phone: '',
	  password: ''
    }
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
      window.location = '/home'
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
  render() {
    return (
      <div className="login">
        <Head title={this.state.title} />
        <div className="main">
	  	  <div className="box">
	  	    <div className="box-item display_box_t">
	  	    	   <img src={require("../../static/icon/phone.svg")} className="phone-img" alt=""/>
	  	    	   <input type="number" onChange={this.changePhone.bind(this)} value={this.state.formData.phone} placeholder="+86 请输入手机号" className="item-input"/>
	  	    	   {this.state.formData.phone ? <span onClick={this.clearPhone.bind(this)}>X</span> : null}
	  	    </div>
	  	    <div className="box-item display_box_t">
	  	    	   <img src={require("../../static/icon/password.svg")} className="phone-img" alt=""/>
	  	    	   <input type="password" onChange={this.changePassWord.bind(this)} value={this.state.formData.password} placeholder="请输入密码" className="item-input" />
	  	    	   {this.state.formData.password ? <span onClick={this.clearPassWord.bind(this)}>X</span> : null}
	  	    </div>
	  	    <div className="submit" onClick={this.login.bind(this)}>
	  	    	   <span>登录</span>
	  	    </div>
	  	  </div>
	  	</div>
      </div>
    );
  }
  async componentDidMount () {
  	console.log('come in login page!')
  }
}

export default Login;