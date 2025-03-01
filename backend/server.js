const express = require('express');
const cors = require('cors')
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const Patient = require('./routes/patientRoute.js');
const Doctor = require('./routes/doctorRoute.js');
const { default: axios } = require('axios');

app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
app.use('/patient', Patient)
app.use('/doctor', Doctor)
app.get('/', (req, res) => {
    res.send("HELLO");
})

const API_BASE = 'https://api.sandbox.co.in';
const ENDPOINTS = {
    OTP_GENERATE: '/kyc/aadhaar/okyc/otp/generate',
    OTP_VERIFY: '/kyc/aadhaar/okyc/otp/verify'
};
// Proxy handler
const proxyHandler = async (endpoint, req, res) => {
    try {
        const response = await axios.post(`${API_BASE}${endpoint}`, req.body, {
            headers: {
                'Authorization': '',
                'x-api-key': '',
                'x-api-version': '2.0',
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: error.response?.data || error.message
        });
    }
};

// Routes
app.post('/proxy/otp/generate', (req, res) => {
const options = {
    method: 'POST',
    url: 'https://api.sandbox.co.in/kyc/aadhaar/okyc/otp',
    headers: {
      accept: 'application/json',
      authorization: '',
      'x-api-key': '',
      'x-api-version': '2.0',
      'content-type': 'application/json'
    },
    data: {
      '@entity': 'in.co.sandbox.kyc.aadhaar.okyc.otp.request',
      aadhaar_number: `${req.body.aadhaar_number}`,
      consent: 'y',
      reason: 'for kyc'
    }
  };
  
  axios
    .request(options)
    .then(resp => res.send(resp.data))
    .catch(err => console.error(err));
});
app.post('/proxy/otp/verify', (req, res) =>{ const options = {
    method: 'POST',
    url: 'https://api.sandbox.co.in/kyc/aadhaar/okyc/otp/verify',
    headers: {
      accept: 'application/json',
      authorization: '',
      'x-api-key': '',
      'x-api-version': '2.0',
      'content-type': 'application/json'
    },
    data: {
      '@entity': 'in.co.sandbox.kyc.aadhaar.okyc.request',
      reference_id: `${req.body.reference_id}`,
      otp: `${req.body.otp}`
    }
  };
  
  axios
    .request(options)
    .then(res => res.send("OTP Verified"))
    .catch(err => console.error(err));


});
app.listen(3000, () => console.log('connected to server 3000'));