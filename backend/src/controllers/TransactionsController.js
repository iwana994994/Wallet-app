import Transaction from "../models/Transaction.js"

export const createTransaction = async(req,res)=>{
try {
   const { userId } = req.auth(); 
    const {type,amount,date } = req.body;

    
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const transaction = new Transaction({
        userId,
        type,
        amount,
        date
    })
  await  transaction.save()
    res.status(201).json(transaction);
} catch (error) {
    res.status(500).json({ error: error.message });
}


}
export const allTransactions = async(req,res)=>{
    try {
       
        const response= await Transaction.find()
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const fetchIncome = async(req,res)=>{

    try {

          const userId = req.auth.userId; // Clerk

    const response = await Transaction.aggregate([
      {
        $match: {
          userId: userId,
          type: "income",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const totalIncome = response[0]?.total || 0;

    return res.status(200).json({ totalIncome });
       }
 catch (error) {
        res.status(500).json({message:"Problem with fetching Amount"})
    }
}
export const fetchExpenses = async(req,res)=>{

    try {

          const userId = req.auth.userId; // Clerk

    const response = await Transaction.aggregate([
      {
        $match: {
          userId: userId,
          type: "expenses",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const totalExpenses = response[0]?.total || 0;

    return res.status(200).json({ totalExpenses });
       }
 catch (error) {
        res.status(500).json({message:"Problem with fetching Expenses"})
    }
}


