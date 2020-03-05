const axios = require('axios');
//var baseUrl = 'http://shareameal.ribes.ovh/api';
var baseUrl = 'http://127.0.0.1:8000/api';
function authH()
{
    return {Authorization: 'Basic '+localStorage.getItem('auth_token')}
}
export let listEvents = ()=>{return axios.get(baseUrl+'/event/');}
export let listAssos = ()=>{return axios.get(baseUrl+'/asso/');}
export let getMyAsso = ()=>{return axios.get(baseUrl+'/asso/mine/', {headers:authH()});}
export let createEvent = (data)=>{return axios.post(baseUrl+'/event/', data, {headers:authH()}); }

export function toDateTime(date,time)
{
    return date+'T'+time+':00Z';
}

export default listEvents;
