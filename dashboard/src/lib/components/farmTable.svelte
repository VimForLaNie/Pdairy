<script lang="ts">
  import { getData } from "$lib/HTTPHelper";
    import Button, { Label } from "@smui/button";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";

    export let key:string;

    const showFarms = async () => {
		farmsData = await getData('../api/getFarms',key);
		console.log(farmsData);
	}

	let farmsData:Farm[];
</script>

<Button on:click={showFarms} class="mt-5" variant="outlined">
    <Label>Refresh</Label>
</Button>
{#if farmsData?.length > 0}
<DataTable stickyHeader table$aria-label="User list" style="width: 100%;">
    <Head>
      <Row>
        <Cell numeric>ID</Cell>
        <Cell>Name</Cell>
        <Cell>Owner</Cell>
      </Row>
    </Head>
    <Body>
      {#each farmsData as data, index}
        <Row>
              <Cell numeric>{data.ID}</Cell>
            <!-- <Cell>{data.id}</Cell> -->
            <Cell>{data.name}</Cell>
            <Cell>{data.owner}</Cell>
        </Row>
      {/each}
    </Body>
</DataTable>
{:else}
    <p>No farms to show</p>
{/if}