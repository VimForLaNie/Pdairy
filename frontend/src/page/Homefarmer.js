import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { MdAttachMoney } from "react-icons/md";
import { GiCow } from "react-icons/gi";
import Graphfarmer from "./page-com/graphfarmer";
import './Home.css';
import moment from 'moment';
import { PiHandCoinsLight } from 'react-icons/pi';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Homefarmer() {
  const [users, setUsers] = useState({ n: 0, summilk: 0, avg: 0 }); // Initialize as an object
  let summilk=0;
  let n=0;
  let avg=0;
  const fetchUserData = () => {

    fetch("../api/getMilkRecords/")
      .then(async (res) => {
        const milkpercow = await res.json();
        const arrmilk = new Array();
        // summilk = 0;
        console.log(milkpercow);

        for (let i = 0; i < milkpercow.length; i++) {
          arrmilk.push(milkpercow[i].weight);
        }
        console.log(arrmilk);
        for (let j = 0; j < arrmilk.length; j++) {
          summilk += arrmilk[j];
        }
        console.log(summilk);
        let a = moment("09-2023 +0000", "MM-YYYY Z").valueOf();
        let b = moment.duration(a, 'milliseconds');
        let starto = Math.floor(b.asMonths());

        // Calculate the number of days between the first and last milk records
        const dmy = moment(milkpercow[milkpercow.length-1].timestamp).format("MM-YYYY");
        let mill = moment(dmy, "MM-YYYY").valueOf();
        let duration = moment.duration(mill, 'milliseconds');
        let months = Math.floor(duration.asMonths()) - starto + 1;
        avg = summilk/months;
        console.log(avg);
        // Set the users state with both n, summilk, and avg
        // setUsers({ ...users, summilk: summilk, avg: avg });
      });

    fetch("../api/getCows/")
      .then(async (response) => {
        const result = await response.json();
        console.log(result);

        // Calculate the count of farms
        n = result.length;

        // Set the users state with both n, summilk, and avg
        setUsers({ ...users, summilk: summilk*21.25, avg: avg*21.25, n: n });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div style={{ margin: "0px 10px" }}>
      <div style={{ backgroundColor: "#eaf2ff", padding: "10px 10px", margin: "20px 0", borderRadius: "10px" }}>
        <div style={{ fontSize: '36px' }}>Overview</div>
        <Grid container spacing={3}>
          <Grid item xs>
            <Item style={{ backgroundColor: 'rgb(209, 233, 252)' }}>
              <PiHandCoinsLight size={30} />
              <div style={{ fontSize: '30px', fontWeight: 'bold' }}>{users.summilk}</div>
              <div>All income (Bahts)</div>
            </Item>
          </Grid>
          <Grid item xs>
            <Item style={{ backgroundColor: 'rgb(208, 242, 255)' }}>
              <MdAttachMoney size={30} />
              <div style={{ fontSize: '30px', fontWeight: 'bold' }}>{users.avg}</div>
              <div>Average money (Bahts/day)</div>
            </Item>
          </Grid>
          <Grid item xs>
            <Item style={{ backgroundColor: 'rgb(255, 247, 205)' }}>
              <GiCow size={30} />
              <div style={{ fontSize: '30px', fontWeight: 'bold' }}>{users.n}</div>
              <div>Total Cows (ตัว)</div>
            </Item>
          </Grid>
        </Grid>
      </div>
      <Graphfarmer />
    </div>
  );
}
