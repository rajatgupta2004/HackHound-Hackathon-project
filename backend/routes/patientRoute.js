const express=require('express');
const bcrypt=require('bcrypt');
const route=express.Router();
const {jwtAuthMiddleware,generateToken}=require('../jwt');

const Patient = require('../models/patient');

route.post('/signup',async(req,res)=>{
    try{
        const data=req.body
        const existingPatient = await Patient.findOne({ email: data.email });
        if (existingPatient) {
            return res.status(400).json({ error: 'Patient with the same email already exists' });
        }
        const newPatient=new Patient(data);
        const response=await newPatient.save()
        console.log("data saved")
        const payload={
            _id:response._id,
            name:response.name
        }
        console.log(JSON.stringify(payload))
        const token=generateToken(payload);
        console.log("Token is :", token);
        res.status(200).json({response:response,token:token})
    }catch(err){
        console.log(err)
        res.status(500).json({err:"data not saved"})
    }
  })

  route.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the Patient exists
      const patientData = await Patient.findOne({ email });
      if (!patientData) {
        return res.status(400).json({ error: 'Patient not found' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, patientData.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid password' });
      }
  
      // Generate a JWT token
      const payload = {
        _id: patientData._id,
        name: patientData.fullName,
        email: patientData.email,
        userType: 'Patient', // Include userType in the payload
      };
      const token = generateToken(payload);
  
      // Send the response with the token and Patient details
      res.status(200).json({
        message: 'Sign-in successful',
        token: token,
        Patient: {
          _id: patientData._id,
          fullName: patientData.fullName,
          email: patientData.email,
          specialization: patientData.specialization,
          hospital: patientData.hospital,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
module.exports=route