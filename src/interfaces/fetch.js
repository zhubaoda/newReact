import axios from 'axios'

export default function Fetch() {
  this.fetch = async (url, params={}) => {
  	let response = await this._request(url, params)
  	if (response.data) {
  	  return response.data
  	} else {
  	  return response
  	}
  }
  
  this._request = async (url, params) => {
  	let res = await axios.get(url, params)
  	return res
  }
}
