const axios = require("axios");

async function getTotalBalance(req){
    var totalbalance = await axios.get('http://localhost:8000/gettotalbalance');
    console.log(totalbalance.data)
    if (req.transactionType == "debit") {
      debit = req.transactionAmount;
      credit = 0;
      totalbalance = parseInt(totalbalance.data) - (parseInt(debit) + parseInt(credit));
      console.log(debit,credit,totalbalance);
      return await {debit,credit,totalbalance}
    }
    else {
      credit = req.transactionAmount;
      debit = 0;
      totalbalance = parseInt(totalbalance.data) + (parseInt(debit) + parseInt(credit));
      console.log(debit,credit,totalbalance);
      return await {debit,credit,totalbalance}
    }
}

module.exports = getTotalBalance;