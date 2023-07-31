<script lang="ts">
	import '../app.css';
	import TabBar from '@smui/tab-bar';
	import Tab, { Label } from '@smui/tab';
	import CowInputField from '$lib/components/cowInputField.svelte';
	import CowTable from '$lib/components/cowTable.svelte';
	import FarmInputField from '$lib/components/farmInputField.svelte';
	import FarmTable from '$lib/components/farmTable.svelte';
  	import MilkInputField from '$lib/components/milkInputField.svelte';
  	import MilkTable from '$lib/components/milkTable.svelte';
  	import BreedingInputField from '$lib/components/breedingInputField.svelte';

  	export let data;

	let mode = "Insert";
	let table = 'Cow';
</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" content="Dashboard for Pdairy's PostgreSQL" />
</svelte:head>

<div class="flex flex-col items-center max-w-screen-md m-auto">
	<h1 class="text-4xl font-bold m-auto">Dashboard</h1>
	<!-- <p class="text-xl m-auto">Welcome to the dashboard!</p> -->
	<TabBar tabs={['Cow', 'Farm', 'Milk', "Breeding"]} let:tab bind:active={table} class="w-fit self-start">
		<Tab {tab} minWidth>
		<Label>{tab}</Label>
		</Tab>
	</TabBar>
	<TabBar tabs={['Insert', 'View']} let:tab bind:active={mode} class="w-fit self-start">
		<Tab {tab} minWidth>
		<Label>{tab}</Label>
		</Tab>
	</TabBar>
	{#if mode === 'Insert'}
		{#if table === 'Cow'}
			<CowInputField key={data.apiKey ?? ''}/>
		{:else if table === 'Farm'}
			<FarmInputField key={data.apiKey ?? ''}/>
		{:else if table === 'Milk'}
			<MilkInputField key={data.apiKey ?? ''}/>
		{:else if table === 'Breeding'}
			<BreedingInputField key={data.apiKey ?? ''}/>
		{/if}
	{:else if mode === 'View'}
		{#if table === 'Cow'}
			<CowTable key={data.apiKey ?? ''}/>
		{:else if table === 'Farm'}
			<FarmTable key={data.apiKey ?? ''}/>
		{:else if table === 'Milk'}
			<MilkTable key={data.apiKey ?? ''}/>
		{/if}
	{/if}
</div>