const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const {jwtAuthMiddleware, generateToken} = require('../jwt');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
router.post('/signup',async(req,res)=>{
  console.log("hello i am in signup page");
    try{
        const data=req.body
        const existingDoctor = await Doctor.findOne({ email: data.email });
        if (existingDoctor) {
            return res.status(400).json({ error: 'Doctor with the same email already exists' });
        }
        const newDoctor=new Doctor(data);
        const response=await newDoctor.save()
        
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




  router.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the doctor exists
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        return res.status(400).json({ error: 'Doctor not found' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, doctor.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid password' });
      }
  
      // Generate a JWT token
      const payload = {
        _id: doctor._id,
        name: doctor.fullName,
        email: doctor.email,
        userType: 'doctor', // Include userType in the payload
      };
      const token = generateToken(payload);
  
      // Send the response with the token and doctor details
      res.status(200).json({
        message: 'Sign-in successful',
        token: token,
        doctor: {
          _id: doctor._id,
          fullName: doctor.fullName,
          email: doctor.email,
          specialization: doctor.specialization,
          hospital: doctor.hospital,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
