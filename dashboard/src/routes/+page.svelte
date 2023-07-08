<script>
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Dashboard for Pdairy's PostgreSQL" />
</svelte:head>

<main>
	<form action="http://api/cow">
		<input type="text" name="cow_id" placeholder="Cow ID" required/>
		<input type="text" name="cow_name" placeholder="Cow Name" required/>
		<input type="submit" value="Insert Cow" />
	</form>
</main>