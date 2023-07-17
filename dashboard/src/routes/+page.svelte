<script lang="ts">
	import '../app.css';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';

	const formFields = ["Cow's  Name", "Farm Name", "Cow's Genetic", "Father's Name", "Father's Genetic", "Mother's Name", "Mother's Genetic"]

	let tempCow = ["", "", "", "", "", "", ""];
	let birthdate = 0;
	let weightAtBirth = 0;

	let cowsData: any;
	const showCows = () => {
		cowsData = fetch('http://localhost/api/cows')
			.then(async res => res.json());
	}

	const postData = (url: string, data: any) => {
		return fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.catch(err => console.log(err));
	}
</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" content="Dashboard for Pdairy's PostgreSQL" />
</svelte:head>

<h1 class="text-4xl font-bold m-auto">Dashboard</h1>
<!-- <p class="text-xl m-auto">Welcome to the dashboard!</p> -->

<div class="flex flex-row">
	<div class="flex flex-col p-3 border-zinc-800 border-2 mx-2 rounded-md">
		{#each formFields as field, index}
			<Textfield label={field} bind:value={tempCow[index]} class="mt-2" input$maxlength={30} />	
			{/each}
		<Textfield label="Birth Date" type="datetime-local" bind:value={birthdate} class="mt-2"/>
		<Textfield label="Weight At Birth" type="number" bind:value={weightAtBirth} class="mt-2"/>
		
		<Button on:click={() => console.log("Yay")} class="mt-5" variant="raised">
			<Label>Insert Cow</Label>
		</Button>
	</div>
</div>
<div class="w-full m-2">
	<Button on:click={showCows} class="mt-5" variant="raised">
		<Label>Show Cows</Label>
	</Button>
	{#if cowsData}
	<DataTable stickyHeader table$aria-label="User list" style="width: 100%;">
		<Head>
		  <Row>
			<Cell numeric>ID</Cell>
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
			  <Cell numeric>{index}</Cell>
				<Cell>{data.id}</Cell>
				<Cell>{data.genetic}</Cell>
				<Cell>{new Date(data.birthdate)}</Cell>
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
</div>