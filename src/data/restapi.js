const axios = require('axios');
//var baseUrl = 'http://shareameal.ribes.ovh/api';
var baseUrl = 'http://127.0.0.1:8000/api';

let listEvents = axios.get(baseUrl+'/event/');
export default listEvents
let listAssos = axios.get(baseUrl+'/asso/');
