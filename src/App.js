import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import './App.css';
import Layout from './component/layout/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [windowHeight, setWindowHeight] = useState();

  const [cal, setCal] = useState([]);

  const date = new Date();

  const setFristDate = date.setDate(1);

  const firstDate = new Date(setFristDate);

  const firstDay = firstDate.getDay();

  const days = ["일", "월", "화", "수", "목", "금", "토"];

  // const cal = ["1", "2", "3", "4", "5", "6", "7",
  //   "8", "9", "10", "11", "12", "13", "14",
  //   "15", "16", "17", "18", "19", "20", "21",
  //   "22", "23", "24", "25", "26", "27", "28",
  //   "29", "30", "31", "", "", "", "",
  //   "", "", "", "", "", "", ""];

  useEffect(() => {

    window.addEventListener('resize', (e) => {
      console.log(e.target)
      setWindowHeight(e.target.innerHeight - 200)
    })

  }, [])

  useEffect(() => {

    (async () => {
      let result = await axios.get('http://localhost:8001/cal');
      console.log(result)
      setCal(result?.data)
    })();
  }, [])
  useEffect(() => {
    console.log(windowHeight)
  }, [windowHeight])

  const onClick = (e) => {
    console.log(e.target.innerHTML)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <Layout>
        <DatePicker
          label={'"month"'}
          openTo="month"
          views={['year', 'month']}
        />
        <h1 style={{ textAlign: 'center' }}>
          5월
        </h1>
        <div style={{ display: "flex", width: '100%', height: '600px', flexWrap: 'wrap', marginLeft: '4%' }}>
          {days.map((a) =>
            <div style={{ border: 'solid', borderWidth: "1px", width: '13%', height: '5%' }}>
              {a}
            </div>
          )}
          {cal.map((a) =>
            <div
              style={{ border: 'solid', borderWidth: "1px", width: '13%', height: '16%' }}
              onClick={(e) => onClick(e)}
            >

              {a?.date}

            </div>
          )}
        </div>
      </Layout >
    </LocalizationProvider>
  );
}

export default App;
