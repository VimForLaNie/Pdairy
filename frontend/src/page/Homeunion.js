import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { BsBucketFill } from "react-icons/bs";
import { LuMilk } from "react-icons/lu";
import { GiCow } from "react-icons/gi";
import Graphunion from "./page-com/graphunion";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Homeunion() {
  return (
    <div>
      <h2 className="textshadow">Overview</h2>
      <Grid container spacing={3}>
        <Grid item xs>
        <Item style={{ backgroundColor: 'rgb(209, 233, 252)' }}>
        <BsBucketFill size={30} />
        <div style={{ fontSize: '30px', fontWeight: 'bold' }}>100K</div>
        <div>All milk</div>
        </Item>
        </Grid>
        <Grid item xs>
          <Item style={{ backgroundColor: 'rgb(208, 242, 255)' }}><GiCow size={30} /><div style={{fontSize: '30px', fontWeight: 'bold'}}>100K</div><div>Milk/day</div></Item>
        </Grid>
        <Grid item xs>
          <Item style={{ backgroundColor: 'rgb(255, 247, 205)' }}><LuMilk size={30} /><div style={{fontSize: '30px', fontWeight: 'bold'}}>100K</div><div>Total Farmer</div></Item>
        </Grid>
      </Grid>
      <Graphunion/>
    </div>
  );
}
