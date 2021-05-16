const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db =require('./config/db');
const getTotalBalance = require('./models/getTotalBalance');
const formatDateTime = require('./models/formatDateTime');
const port=8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running.`);
});

app.post("/senddata", async (req, res) => {
  var { transactionDescription } = req.body;
  console.log(req.body);
  var {debit, credit, totalbalance}= await getTotalBalance(req.body);
  console.log(debit,credit,totalbalance);
  
  await db.query(
    `INSERT into transaction (debit, credit, totalbalance, description ) VALUES ($1,$2,$3,$4)`,
    [debit, credit, totalbalance, transactionDescription],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log("Inserted", results.rowCount, "Row.");
      res.sendStatus(201);
    }
  );
});

app.get("/getdata", (req, res) => {
  db.query(
    "SELECT datetime, debit, credit, totalbalance, description FROM transaction",
    [],
    async (error, results) => {
      if (error) {
        throw error;
      }
      result=await formatDateTime(results.rows)
      await res.status(200).json(result.reverse());
    }
  );
});

app.get("/gettotalbalance", (req, res) => {
  db.query(
    "SELECT datetime,totalbalance FROM transaction ORDER BY datetime DESC LIMIT 1",
    async (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows[0]) {
        await res.status(200).json(results.rows[0].totalbalance);
      }
      else{
        await res.status(200).json(0);
      }
    }
  );
});