import Fetch from './fetch'


export default {
  async fetch () {
  	let fetch = new Fetch()
  	return fetch.fetch(...arguments)
  },
  async login (params) {
  	return await this.fetch('/api/login/cellphone', {params: params})
  },
  async getBanner () {
  	return await this.fetch('/api/banner')
  }
}
