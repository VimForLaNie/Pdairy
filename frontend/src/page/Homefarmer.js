import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TbCurrencyBaht } from "react-icons/tb";
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

async function sumArray() {
  try {
    const response = await fetch("https://iwing.cpe.ku.ac.th/pdairy/api/getCows/");
    const result = await response.json();
    const n = result.length;
    return n;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error as needed
  }
}

export default function Homefarmer() {
  const [users, setUsers] = useState({ n: 0, summilk: 0, avg: 0 }); // Initialize as an object
  let milkpercow;
  let a = moment("08-01-23", "MM-DD-YY").valueOf();
  let b = moment.duration(a, 'milliseconds');
  let starto = Math.floor(b.asDays());
  let summilk=0;
  let n=0;
  let avg=0;
  const fetchUserData = () => {
    fetch("https://iwing.cpe.ku.ac.th/pdairy/api/getMilkRecords/")
      .then(async (res) => {
        milkpercow = await res.json();
        const arrmilk = new Array(10); // Create an array with 10 rows
        for (let i = 0; i < 10; i++) {
          arrmilk[i] = new Array(); // For each row, create an array with no initial columns
        }
        for (let i = 0; i < milkpercow.length; i++) {
          let rower = milkpercow[i].cowID-1;
          if(rower>=10 || rower<0 )
            continue;
          if(milkpercow[i].ID < 1402 || milkpercow[i].ID > 2202) // || milkpercow[i].ID > 351 
            continue;
          const dmy = moment(milkpercow[i].timestamp).format("MM-DD-YY");
          let mill = moment(dmy, "MM-DD-YY").valueOf();
          let duration = moment.duration(mill, 'milliseconds');
          let coler = Math.floor(duration.asDays()) - starto + 1;
          // console.log('c',coler);
          arrmilk[rower][coler - 1] = milkpercow[i].weight;
        }
        for(let i=0;i<arrmilk.length;i++){
          for(let j=0;j<arrmilk[i].length;j++){
            summilk+=arrmilk[i][j];
          }
        }
        summilk = summilk*21.25;
        avg = summilk / 3;
        // Set the users state with both n, summilk, and avg
        // setUsers({ ...users, summilk: summilk, avg: avg });
        n= await sumArray();
        n=n-5;
        // Set the users state with both n, summilk, and avg
        setUsers({ ...users, summilk,avg,n });
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
              <div style={{ fontSize: '30px', fontWeight: 'bold' }}>{(users.summilk).toFixed(2)}</div>
              <div>All income (Bahts)</div>
            </Item>
          </Grid>
          <Grid item xs>
            <Item style={{ backgroundColor: 'rgb(208, 242, 255)' }}>
              <TbCurrencyBaht size={30} />
              <div style={{ fontSize: '30px', fontWeight: 'bold' }}>{(users.avg).toFixed(2)}</div>
              <div>Average money (Bahts/month)</div>
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
