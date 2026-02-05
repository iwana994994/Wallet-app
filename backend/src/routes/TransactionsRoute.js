import { Router } from "express";  
import {allTransactions,createTransaction,fetchIncome,fetchExpenses} from "../controllers/TransactionsController.js"

const route = Router()

route.post("/create",createTransaction)
route.get("/all",allTransactions)
route.get("/income",fetchIncome)
route.get("/expenses",fetchExpenses)

export default route