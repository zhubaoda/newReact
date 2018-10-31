import axios from 'axios'
import Global from './globalname'
export default function Fetch() {
  this.fetch = async (url, actiontype="", args={}) => {
  	let res = await this._request(url, actiontype, args)
		if (res.data.ErrorCode === 0) {
			res.data.Result = JSON.parse(res.data.Result)
	    res.data.Result.code = 200
		  return res
		} if (res.data.ErrorCode === 100010) {
		  window.location = '/login'
		}
  } 
  this._request = async (url, actionType, args) => { 	
  	let paras = {
  		ActionType: "",
  		SessionId: "",
  		Args: args
    }
  	paras.Args.SaleChannel =  Global.H5AppSaleChannel
  	paras.ActionType = actionType
  	paras.MethodName = paras.ActionType
    paras.AppID = 'ClientService'
    paras.Parameters = paras.Args = JSON.stringify(paras.Args) 	
  	paras = 'paras=' + JSON.stringify(paras)
  	let res = await axios.post(url, paras)
  	return res
  }
}
