<script lang="ts">
  import { getData } from "$lib/HTTPHelper";
  import Button, { Label } from "@smui/button";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import Graph from "$lib/components/Chart.svelte";

  export let key:string;

  const showMilk = async () => {
		milkData = await getData('../api/getMilkRecords',key);
		// console.log(milkData);
	}

  const toGraphData = (rawData:any[]) => {
    if(rawData == null || Object.keys(rawData).length === 0) return {};
    const timestamps = rawData.map((data) => data.timestamp);
    const timeMin = Math.min(...timestamps);
    const chartLabels = timestamps.map((data) => (data - timeMin) / 1000);
    const graphData = rawData.map((data) => data.value);
    return {
      labels: chartLabels,
      datasets: [
      {
        label: 'Milk',
        fill: true,
        lineTension: 0.3,
        backgroundColor: 'rgba(225, 204,230, .3)',
        borderColor: 'rgb(205, 130, 158)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(205, 130,1 58)',
        pointBackgroundColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(0, 0, 0)',
        pointHoverBorderColor: 'rgba(220, 220, 220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: graphData,
      },],
    }
  }

	let milkData:MilkRecord[] = [];
</script>

<Button on:click={showMilk} class="mt-5" variant="outlined">
    <Label>Refresh</Label>
</Button>
{#if milkData?.length > 0}
<DataTable stickyHeader table$aria-label="User list" style="width: 100%;">
    <Head>
      <Row>
        <Cell numeric>ID</Cell>
        <Cell>Cow's ID</Cell>
        <Cell>Timestamp</Cell>
        <Cell>weight</Cell>
        <Cell>Raw Data</Cell>
      </Row>
    </Head>
    <Body>
      {#each milkData.reverse() as data, index}
        <Row>
            <Cell numeric>{data.ID}</Cell>
            <Cell>{data.cowID}</Cell>
            <Cell>{data.timestamp}</Cell>
            <Cell>{data.weight}</Cell>
            <Cell><Graph data={toGraphData(JSON.parse(data.rawData ?? "{}"))}/></Cell>
        </Row>
      {/each}
    </Body>
</DataTable>
{:else}
    <p>No Milk Record to show</p>
{/if}