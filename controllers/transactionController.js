// controllers/transactionController.js
const Transaction = require("../models/transaction");

// POST /transactions
const addTransaction = (req, res) => {
  const { type, category, amount, date, description } = req.body;
  const transaction = new Transaction({
    type,
    category,
    amount,
    date,
    description,
  });

  transaction
    .save()
    .then(() => res.status(201).json(transaction))
    .catch((error) => res.status(400).json({ error: error.message }));
};

// GET /transactions
const getTransactions = (req, res) => {
  Transaction.find()
    .then((transactions) => res.status(200).json(transactions))
    .catch((error) => res.status(500).json({ error: error.message }));
};

// GET /transactions/:id
const getTransactionById = (req, res) => {
  const { id } = req.params;
  Transaction.findById(id)
    .then((transaction) => {
      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.status(200).json(transaction);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

// PUT /transactions/:id
const updateTransaction = (req, res) => {
  const { id } = req.params;
  const { type, category, amount, date, description } = req.body;

  Transaction.findByIdAndUpdate(
    id,
    { type, category, amount, date, description },
    { new: true }
  )
    .then((updatedTransaction) => {
      if (!updatedTransaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.status(200).json(updatedTransaction);
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

// DELETE /transactions/:id
const deleteTransaction = (req, res) => {
  const { id } = req.params;

  Transaction.findByIdAndDelete(id)
    .then((deletedTransaction) => {
      if (!deletedTransaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.status(200).json({ message: "Transaction deleted successfully" });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

// GET /summary
const getSummary = (req, res) => {
  const { startDate, endDate } = req.query;

  // Create filter based on date range if provided
  const filter = {};
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  Transaction.find(filter)
    .then((transactions) => {
      const summary = transactions.reduce(
        (acc, transaction) => {
          if (transaction.type === "income") {
            acc.totalIncome += transaction.amount;
          } else if (transaction.type === "expense") {
            acc.totalExpenses += transaction.amount;
          }
          acc.balance = acc.totalIncome - acc.totalExpenses;
          return acc;
        },
        { totalIncome: 0, totalExpenses: 0, balance: 0 }
      );
      res.status(200).json(summary);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

module.exports = {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
};
