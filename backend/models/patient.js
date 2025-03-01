const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const patientSchema=new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    userType: { type: String, default: 'patient' }, // To differentiate between patient and doctor

    medicalRecords: [{
        date: { type: Date, default: Date.now }, // Date of the medical record
        diagnosis: { type: String, required: true }, // Diagnosis made by the doctor
        treatment: { type: String }, // Treatment provided
        prescribedMedications: [{ // Array of prescribed medications
            name: { type: String, required: true }, // Name of the medication
            dosage: { type: String }, // Dosage of the medication
            frequency: { type: String } // Frequency of the medication
        }],
        doctor: { // Information about the doctor who added the record
            doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }, // Reference to the doctor
            doctorName: { type: String, required: true } // Name of the doctor
        }
    }]
});

patientSchema.pre('save',function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password,10,(err,hashed)=>{
            if(err)return next(err);
            this.password = hashed;
            next();
        })
    }
})
patientSchema.methods.comparePassword= async(password)=>{
    if(!password)return new Error('password is empty');
    try{
        const result =await bcrypt.compare(password , this.password);
        return result;
    }catch(e){
        console.log("errrroooorrr"+e);
    }
}

const Patient=mongoose.model('Patient',patientSchema);
module.exports=Patient;