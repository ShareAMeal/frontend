const axios = require('axios');
//var baseUrl = 'http://shareameal.ribes.ovh/api';
var baseUrl = 'http://127.0.0.1:8000/api';

export let listEvents = ()=>{return axios.get(baseUrl+'/event/');}
export let listAssos = ()=>{return axios.get(baseUrl+'/asso/');}
export let getMyAsso = ()=>{return axios.get(baseUrl+'/asso/mine/', {headers:{Authorization: 'Basic '+localStorage.getItem('auth_token')}});}

export default listEvents;
