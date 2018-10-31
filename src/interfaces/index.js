import Fetch from './fetch'


export default {
  async fetch () {
  	let fetch = new Fetch()
  	return fetch.fetch(...arguments)
  },
  async wechatLogin (actiontype, args) {
  	return await this.fetch('/webhandler.ashx', actiontype, args)
  },
	async getActivity (actiontype) {
		return await this.fetch('/webhandler.ashx', actiontype)
	}
}
