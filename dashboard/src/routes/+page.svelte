<script lang="ts">
	import '../src/app.css';

	let table:HTMLTableElement;
	const showCows = () => {
		fetch('http://localhost/api/cows')
			.then(res => {console.log(res); return res.json();})
			.then(data => {
				table.innerHTML = `
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Farm ID</th>
							<th>Genetic</th>
							<th>Birthdate</th>
							<th>Weight at Birth</th>
							<th>Father Name</th>
							<th>Father Genetic</th>
							<th>Mother Name</th>
							<th>Mother Genetic</th>
						</tr>
					</thead>
					<tbody>
						${data.map((cow: any) => `
							<tr>
								<td>${cow.id}</td>
								<td>${cow.name}</td>
								<td>${cow.farmId}</td>
								<td>${cow.genetic}</td>
								<td>${cow.birthdate}</td>
								<td>${cow.weightAtBirth}</td>
								<td>${cow.fatherName}</td>
								<td>${cow.fatherGenetic}</td>
								<td>${cow.motherName}</td>
								<td>${cow.motherGenetic}</td>
							</tr>
						`).join('')}
					</tbody>
				`;
			})
			.catch(err => console.log(err));
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
	
	let cowName: string = "Cow Name";
	let cowId: string = "Cow ID";
	let cowFarmId: string = "Farm ID";
	let cowGenetic: string = "Genetic";
	let cowBirthdate: Date = new Date();
	let cowWeightAtBirth: number = 0;
	let cowFatherName: string = "Father Name";
	let cowFatherGenetic: string = "Father Genetic";
	let cowMotherName: string = "Mother Name";
	let cowMotherGenetic: string = "Mother Genetic";

	$:creatingCow = {
		id: cowId,
		cowName: cowName,
		farmId: cowFarmId,
		genetic: cowGenetic,
		birthdate: cowBirthdate,
		weightAtBirth: cowWeightAtBirth,
		fatherName: cowFatherName,
		fatherGenetic: cowFatherGenetic,
		motherName: cowMotherName,
		motherGenetic: cowMotherGenetic
	}
</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" content="Dashboard for Pdairy's PostgreSQL" />
</svelte:head>

<h1 class="text-4xl font-bold m-auto">Dashboard</h1>
<!-- <p class="text-xl m-auto">Welcome to the dashboard!</p> -->

<div class="flex flex-row">
	<div class="flex flex-col p-3 border-zinc-800 border-2 mx-2">
		<input type="text" name="id" placeholder="Cow ID" required class="textInput" bind:value={cowId}/>
		<input type="text" name="name" placeholder="Cow Name" required class="textInput"
		bind:value={cowName}/>
		<input type="text" name="farmId" placeholder="farmId" required class="textInput"
		bind:value={cowFarmId}/>
		<input type="text" name="genetic" placeholder="genetic" required class="textInput"
		bind:value={cowGenetic}/>
		<input type="date" name="birthdate" placeholder="birthdate" required class="textInput"
		bind:value={cowBirthdate}/>
		<input type="number" name="weightAtBirth" min=0 step=0.001 placeholder="weightAtBirth" required class="textInput"
		bind:value={cowWeightAtBirth}/>
		<input type="text" name="fatherName" placeholder="fatherName" required class="textInput" bind:value={cowFatherName}/>
		<input type="text" name="fatherGenetic" placeholder="fatherGenetic" required class="textInput" bind:value={cowFatherGenetic}/>
		<input type="text" name="motherName" placeholder="motherName" required class="textInput" bind:value={cowMotherName}/>
		<input type="text" name="motherGenetic" placeholder="motherGenetic" required class="textInput" bind:value={cowMotherGenetic}/>
		<input type="button" value="Insert Cow" class="p-4 border-2 bg-neutral-300 hover:bg-neutral-200 rounded-md font-bold cursor-pointer" on:click={() => {postData(`http://localhost/api/cow`, creatingCow); console.log(creatingCow)}}/>
	</div>
</div>
<div class="w-full m-2">
	<input value="Show All Cows" type="button" class="p-4 border-2 bg-neutral-300 hover:bg-neutral-200 rounded-md font-bold cursor-pointer" on:click={showCows}>
	<table bind:this={table}>
	</table>
</div>