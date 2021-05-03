import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import deleteUser from './db/delete.js'
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello world!!');
})

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: "nilesh_bhai_project"
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});
var interest
var tpa;
connection.query("Select interest,tpa from per", (err, result) => {
  if (err) throw err;
  result.map((i) => {
    interest = i.interest
    tpa = i.tpa
  })
});

app.post('/', async (req, res) => {
  const { year, amt, elecAcc, disRate, NCBRate, loadingDiscount, zone } = req.body;
  let total
  let netPrem = 0
  let grossPrem = 0
  let GST = 0
  switch (zone) {
    case "A":
      if (year === 'Upto 5 yrs') {
        total = (amt * 0.03127) + (elecAcc * interest)
      } else if (year === '5-10yrs') {
        total = (amt * 0.03283) + (elecAcc * interest)
      } else {
        total = (amt * 0.0344) + (elecAcc * interest)
      }
      total = total - (total * NCBRate) / 100
      if (loadingDiscount == "Loading") {
        if (disRate) {
          total = total + (total * disRate) / 100
        }
      } else {
        total = total - (total * disRate) / 100
      }
      netPrem = total + tpa
      GST = (netPrem * 18) / 100
      grossPrem = netPrem + GST
      res.status(200).send({ total: total.toFixed(), tpa: tpa, netPrem: netPrem.toFixed(), GST: GST.toFixed(), grossPrem: grossPrem.toFixed() });
      break;
    case 'B':
      if (year === 'Upto 5 yrs') {
        total = (amt * 0.03039) + (elecAcc * interest)
      } else if (year === '5-10yrs') {
        total = (amt * 0.03191) + (elecAcc * interest)
      } else {
        total = (amt * 0.03343) + (elecAcc * interest)
      }
      total = total - (total * NCBRate) / 100
      if (loadingDiscount == "Loading") {
        if (disRate) {
          total = total + (total * disRate) / 100
        }
      } else {
        total = total - (total * disRate) / 100
      }
      netPrem = total + tpa
      GST = (netPrem * 18) / 100
      grossPrem = netPrem + GST
      res.status(200).send({ total: total.toFixed(), tpa: tpa, netPrem: netPrem.toFixed(), GST: GST.toFixed(), grossPrem: grossPrem.toFixed() });
      break;

    default:
      break;
  }

})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is connected on http://localhost:${PORT}`);
});