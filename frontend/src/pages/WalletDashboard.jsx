import { useEffect,useState,useMemo} from "react"
import {useTransaction } from "../store/useTransaction"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"


export default function WalletDashboard() {
  



  const {fetchExpenses,fetchTransactions,fetchIncome,income,expenses,createTransaction} = useTransaction()

  const [type, setType] = useState("income")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))


    const COLORS = ["#22c55e", "#ef4444", "#94a3b8"] // income, expense, no data

    const numericIncome = Number(income) || 0
    const numericExpenses = Number(expenses) || 0

    // Data za pie chart (memo da se ne računa stalno)
 
  const handleSubmit = async (e) => {
    e.preventDefault()

    // minimalna validacija
    const numericAmount = Number(amount)
    if (!numericAmount || numericAmount <= 0) return

    await createTransaction({
    type,
    amount: numericAmount,
    date: new Date(date),
  })
    // reset (opciono)
    setAmount("")
   
  }

  // Data za pie chart (memo da se ne računa stalno)
  const pieData = useMemo(() => {
    const data = [
      { name: "Income", value: numericIncome },
      { name: "Expenses", value: numericExpenses },
    ]
    // Ako su oba 0, prikazi "No data" slice (da chart ne bude prazan)
    if (numericIncome === 0 && numericExpenses === 0) {
      return [{ name: "No data", value: 1 }]
    }
    return data
  }, [numericIncome, numericExpenses])
  // 1) Učitaj transakcije

  useEffect(() => {
    fetchTransactions()
    fetchIncome()
    fetchExpenses()
    amount
  }, [amount,fetchIncome,fetchExpenses])

  return (
   <div>
   
    <div className="flex items-start justify-between mt-10 ml-50 mr-50">

 {/**LEFT SIDE */}

     <div className="flex flex-col items-start ml-50">
  {/* INCOME + EXPENSES (u jednom redu) */}
  <div className="flex items-center ml-10 mb-10">
    <div className="ml-10 mr-10 text-xl">
      <p>INCOME:</p>
      <p className="bg-accent bg-clip-text text-transparent text-2xl">{income}</p>
    </div>

    <div className="text-xl ">
      <p>EXPENSES:</p>
      <p className="bg-accent bg-clip-text text-transparent text-2xl">{expenses}</p>
    </div>
  </div>

  {/* CHART ISPOD */}
  <div>
    <PieChart width={320} height={240}>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={85}
        innerRadius={45}
        paddingAngle={2}
      >
        {pieData.map((entry, index) => (
          <Cell
            key={`cell-${entry.name}`}
            fill={entry.name === "No data" ? COLORS[2] : COLORS[index]}
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>
</div>
  

    {/**RIGHT SIDE */}
    <div className="mr-40 mt-10">
      {/**forma za slanje incoma i expenses */}


         <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>
          <select
            className="select select-bordered w-full rounded-xl"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income">Income</option>
            <option value="expenses">Expense</option>
          </select>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <input
            className="input input-bordered w-full rounded-xl"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            placeholder=" 1200"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>
          <input
            className="input input-bordered w-full rounded-xl"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        

        {/* Actions */}
        <button
          type="submit"
          className="btn btn-primary w-full rounded-xl"
         
        >
       SAVE
        </button>

      </form>
    </div>
   </div>
   </div>
     
  
  )
}
