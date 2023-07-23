<script lang="ts">
	import '../app.css';
	import CowInputField from '$lib/components/cowInputField.svelte';
	import Tab, { Label } from '@smui/tab';
  	import TabBar from '@smui/tab-bar';
	import CowTable from '$lib/components/cowTable.svelte';

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
			<CowInputField />
		{/if}
	{:else if mode === 'View'}
		{#if table === 'Cow'}
			<CowTable />
		{/if}
	{/if}
</div>