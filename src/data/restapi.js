const axios = require('axios');
//var baseUrl = 'http://shareameal.ribes.ovh/api';
export var baseUrl = 'http://127.0.0.1:8000/api';
function authH()
{
    return {Authorization: 'Basic '+localStorage.getItem('auth_token')}
}
export let listEvents = (opt)=>{return axios.get(baseUrl+'/event/',opt);}
export let listAssos = (opt)=>{return axios.get(baseUrl+'/asso/',opt);}
export let getMyAsso = ()=>{return axios.get(baseUrl+'/asso/mine/', {headers:authH()});}
export let createEvent = (data)=>{return axios.post(baseUrl+'/event/', data, {headers:authH()}); }
export let options = (url)=>{return axios.options(url, {headers:authH()}); }
export let post = (url,data)=>{return axios.post(url, data, {headers:authH()}); }
export let put = (url,data)=>{return axios.put(url, data, {headers:authH()}); }

export default baseUrl;
