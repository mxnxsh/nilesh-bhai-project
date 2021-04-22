import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello world!!');
})
app.post('/', async (req, res) => {
  const { year, amt, elecAcc, disAmt, disRate, NCBAmount, NCBRate, loadingDiscount } = req.body;
  let TPA = 2072
  let total
  let netPrem = 0
  let grossPrem = 0
  let GST = 0
  if (year === 'Upto 5 yrs') {
    if (loadingDiscount === 'Loading') {
      total = (amt * 0.03127) + (elecAcc * 0.04) - ((NCBAmount * NCBRate) / 100) + ((disAmt * disRate) / 100)
    } else {
      total = (amt * 0.03127) + (elecAcc * 0.04) - ((NCBAmount * NCBRate) / 100) - ((disAmt * disRate) / 100)
    }
  } else if (year === '5-10yrs') {
    if (loadingDiscount === 'Loading') {
      total = (amt * 0.03283) + (elecAcc * 0.04) - ((NCBAmount * NCBRate) / 100) + ((disAmt * disRate) / 100)
    } else {
      total = (amt * 0.03283) + (elecAcc * 0.04) - ((NCBAmount * NCBRate) / 100) - ((disAmt * disRate) / 100)
    }
  } else {
    if (loadingDiscount === 'Loading') {
      total = (amt * 0.0344) + (elecAcc * 0.04) - ((NCBAmount * NCBRate) / 100) + ((disAmt * disRate) / 100)
    }
    else {
      total = (amt * 0.0344) + (elecAcc * 0.04) - ((NCBAmount * NCBRate) / 100) - ((disAmt * disRate) / 100)
    }
  }
  netPrem = total + TPA
  GST = netPrem * 0.18
  grossPrem = GST + netPrem
  res.status(200).send({ total: total.toFixed(), TPA, netPrem: netPrem.toFixed(), GST: GST.toFixed(), grossPrem: grossPrem.toFixed() });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is connected on http://localhost:${PORT}`);
});