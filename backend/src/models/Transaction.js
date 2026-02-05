import mongoose from "mongoose";

const transactionSchema= new mongoose.Schema(
{   userId:{
    type: String,
    required: true
},
   type: {
  type: String,                
  enum: ["income", "expenses"],
  required: true,
},
    amount: {
        type: Number,
        required: true
      
    },
 
    date: {
        type: Date,
        required: true
    }
},
{timestamps: true}
)
const Transaction= mongoose.model("Transaction", transactionSchema)
export default Transaction