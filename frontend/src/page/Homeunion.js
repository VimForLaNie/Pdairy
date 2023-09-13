import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { BsBucketFill } from "react-icons/bs";
import { LuMilk } from "react-icons/lu";
import { GiCow } from "react-icons/gi";
import Graphunion from "./page-com/graphunion";
import React, { useState, useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Homeunion() {
  const [users, setUsers] = useState(0);

  const fetchUserData = () => {
    fetch("../api/getFarms/")
      .then(async (response) => {
        const result = await response.json();
        console.log(result);

        // Calculate the count of farms
        const n = result.length;
        return n;
      })
      .then((data) => {
        setUsers(data);
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
              <div style={{ fontSize: '30px', fontWeight: 'bold' }}>100K</div>
              <div>All milk</div>
            </Item>
          </Grid>
          <Grid item xs>
            <Item style={{ backgroundColor: 'rgb(208, 242, 255)' }}>
              <GiCow size={30} />
              <div style={{ fontSize: '30px', fontWeight: 'bold' }}>100K</div>
              <div>Milk/day</div>
            </Item>
          </Grid>
          <Grid item xs>
            <Item style={{ backgroundColor: 'rgb(255, 247, 205)' }}>
              <LuMilk size={30} />
              <div style={{ fontSize: '30px', fontWeight: 'bold' }}>{users}</div>
              <div>Total Farms</div>
            </Item>
          </Grid>
        </Grid>
      </div>
      <Graphunion />
    </div>
  );
}
