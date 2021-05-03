import React, { useState } from 'react';
import Axios from 'axios';
function App() {
  const [year, setYear] = useState('Upto 5 yrs');
  const [zone, setZone] = useState('A');
  const [amt, setAmt] = useState('');
  const [elecAcc, setElecAcc] = useState('');
  // const [NCBAmount, setNCBAmount] = useState('');
  const [NCBRate, setNCBRate] = useState('');
  // const [disAmt, setDisAmt] = useState('');
  const [loadingDiscount, setLoadingDiscount] = useState('Loading');
  const [disRate, setDisRate] = useState('');
  const [allData, setAllData] = useState([])
  const [loading, setLoading] = useState(false);
  // const [pass, setPass] = useState('');
  // const [driver, setDriver] = useState('');
  // const [pa, setPa] = useState('');
  // const [tpa, setTpa] = useState('');
  const [error, setError] = useState('');
  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.post('http://localhost:5000', { year, amt, elecAcc, disRate, NCBRate, loadingDiscount, zone })
      setLoading(false);
      setAllData(data);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.log(err.message);
    }
  };
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Pvt Car Upto 1000 CC</h1>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'space-between' }}>
        <div>
          <select
            value={zone}
            onChange={e => setZone(e.target.value)}
          >
            <option >A</option>
            <option >B</option>
          </select>
          <br />
          <select
            value={year}
            onChange={e => setYear(e.target.value)}
          >
            <option >Upto 5 yrs</option>
            <option >5-10yrs</option>
            <option >over 10 yrs</option>
          </select>
          <br />
          <input type="number" placeholder='Amount' onChange={e => setAmt(e.target.value)} /><br />

          <input type="number" placeholder='Elec. Acc.' onChange={e => setElecAcc(e.target.value)} /><br />


          <input type="number" placeholder='N.C.B Rate' onChange={e => setNCBRate(e.target.value)} /><br />
          <label htmlFor="Loading/Discount">Loading/Discount</label><br />
          <select
            value={loadingDiscount}
            onChange={e => setLoadingDiscount(e.target.value)}

          >
            <option >Loading</option>
            <option >Discount</option>
          </select>
          <br />

          <input type="number" placeholder='Loading/Discount Rate'
            onChange={e => setDisRate(e.target.value)}
          /><br />
          {/* <input type="number" placeholder='T.P.A'
          onChange={e => setTpa(e.target.value)} />
        <br /> */}
          <input type="number" placeholder='P.A'
          />
          <br />
          <input type="number" placeholder='Driver'
          />
          <br />
          <input type="number" placeholder='Pass'
          />
          <br />
          <button type='submit' onClick={getData}>Proceed</button> <br />
        </div>

        <div>

          {loading ? <p>Loading</p> : error ? <p>{error}</p> :
            <>
              <h2>Total OD Prem: {allData.total}</h2>
              <h2>T.P.A: {allData.tpa}</h2>
              <h2>Net Premium: {allData.netPrem}</h2>
              <h2>GST: {allData.GST}</h2>
              <h2>Gross Premium: {allData.grossPrem}</h2>
            </>
          }
        </div>
      </div>

    </>
  );
}

export default App;
