import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { BsBucketFill } from "react-icons/bs";
import { LuMilk } from "react-icons/lu";
import { GiFarmer} from "react-icons/gi";
import Graphunion from "./page-com/graphunion";
import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Homeunion() {
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
        let a = moment("09-01-2023 +0000", "MM-DD-YYYY Z").valueOf();
        let b = moment.duration(a, 'milliseconds');
        let starto = Math.floor(b.asDays());

        // Calculate the number of days between the first and last milk records
        const dmy = moment(milkpercow[milkpercow.length-1].timestamp).format("MM-DD-YYYY");
        let mill = moment(dmy, "MM-DD-YYYY").valueOf();
        let duration = moment.duration(mill, 'milliseconds');
        let days = Math.floor(duration.asDays()) - starto + 1;
        avg = summilk/days
        console.log(avg);
        // Set the users state with both n, summilk, and avg
        // setUsers({ ...users, summilk: summilk, avg: avg });
      });

    fetch("../api/getFarms/")
      .then(async (response) => {
        const result = await response.json();
        console.log(result);

        // Calculate the count of farms
        n = result.length;

        // Set the users state with both n, summilk, and avg
        setUsers({ ...users, summilk: summilk, avg: avg, n: n });
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
              <BsBucketFill size={30} />
              <div style={{ fontSize: '30px', fontWeight: 'bold' }}>{users.summilk}</div>
              <div>All milk (Liters)</div>
            </Item>
          </Grid>
          <Grid item xs>
            <Item style={{ backgroundColor: 'rgb(208, 242, 255)' }}>
              <LuMilk size={30} />
              <div style={{ fontSize: '30px', fontWeight: 'bold' }}>{users.avg}</div>
              <div>Average milk (Liters/day)</div>
            </Item>
          </Grid>
          <Grid item xs>
            <Item style={{ backgroundColor: 'rgb(255, 247, 205)' }}>
              <GiFarmer size={30} />
              <div style={{ fontSize: '30px', fontWeight: 'bold' }}>{users.n}</div>
              <div>Total Farms (farms)</div>
            </Item>
          </Grid>
        </Grid>
      </div>
      <Graphunion />
    </div>
  );
}
