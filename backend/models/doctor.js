const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Doctor Schema
const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true }, // e.g., Cardiologist, Dermatologist, etc.
  hospital: { type: String, required: true }, // Hospital or clinic name
  licenseNumber: { type: String, required: true, unique: true }, // Medical license number
  contactNumber: { type: String, required: true }, // Contact number
  address: { type: String, required: true }, // Clinic or hospital address
  userType: { type: String, default: 'doctor' }, // To differentiate between patient and doctor
});

doctorSchema.pre('save',function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password,10,(err,hashed)=>{
            if(err)return next(err);
            this.password = hashed;
            next();
        })
    }
})
doctorSchema.methods.comparePassword= async(password)=>{
    if(!password)return new Error('password is empty');
    try{
        const result =await bcrypt.compare(password , this.password);
        return result;
    }catch(e){
        console.log("errrroooorrr"+e);
    }
}

// Doctor Model
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;