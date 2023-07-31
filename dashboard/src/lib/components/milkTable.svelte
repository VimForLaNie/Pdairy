<script lang="ts">
  import { getData } from "$lib/HTTPHelper";
    import Button, { Label } from "@smui/button";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";

    export let key:string;

    const showMilk = async () => {
		milkData = await getData('/api/getMilkRecords',key);
		console.log(milkData);
	}

	let milkData:MilkRecord[];
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
      </Row>
    </Head>
    <Body>
      {#each milkData as data, index}
        <Row>
            <Cell numeric>{data.ID}</Cell>
            <Cell>{data.cowID}</Cell>
            <Cell>{data.timestamp}</Cell>
            <Cell>{data.weight}</Cell>
        </Row>
      {/each}
    </Body>
</DataTable>
{:else}
    <p>No Milk Record to show</p>
{/if}