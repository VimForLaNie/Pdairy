<script lang="ts">
  import { getData } from "$lib/HTTPHelper";
    import Button, { Label } from "@smui/button";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";

    export let key:string;

    const showCows = async () => {
		cowsData = await getData('/api/getCows',key);
		console.log(cowsData);
	}

	let cowsData:Cow[];
</script>

<Button on:click={showCows} class="mt-5" variant="outlined">
    <Label>Refresh</Label>
</Button>
{#if cowsData?.length > 0}
<DataTable stickyHeader table$aria-label="User list" style="width: 100%;">
    <Head>
      <Row>
        <Cell numeric>ID 1</Cell>
        <Cell>Name</Cell>
        <Cell>RFID</Cell>
        <Cell>Genetic</Cell>
        <Cell>Birth Date</Cell>
        <Cell>Weight At Birth</Cell>
        <Cell>Father's Name</Cell>
        <Cell>Father's Genetic</Cell>
        <Cell>Mother's Name</Cell>
        <Cell>Mother's Genetic</Cell>
      </Row>
    </Head>
    <Body>
      {#each cowsData as data, index}
        <Row>
              <Cell numeric>{data.ID}</Cell>
            <!-- <Cell>{data.id}</Cell> -->
            <Cell>{data.name}</Cell>
            <Cell>{data.RFID}</Cell>
            <Cell>{data.genetic}</Cell>
            <Cell>{data.birthDate}</Cell>
            <Cell>{data.weightAtBirth}</Cell>
            <Cell>{data.fatherName}</Cell>
            <Cell>{data.fatherGenetic}</Cell>
            <Cell>{data.motherName}</Cell>
            <Cell>{data.motherGenetic}</Cell>
        </Row>
      {/each}
    </Body>
</DataTable>
{:else}
    <p>No cows to show</p>
{/if}