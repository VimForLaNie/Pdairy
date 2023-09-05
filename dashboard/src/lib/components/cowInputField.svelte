<script lang="ts">
    import { postData } from '$lib/HTTPHelper';
    import Textfield from '@smui/textfield';
    import Button, { Label } from '@smui/button';
    const formFields = ["Cow's  Name","RFID", "Farm Name", "Cow's Genetic", "Father's Name", "Father's Genetic", "Mother's Name", "Mother's Genetic"];
    let tempCow = ["", "", "", "", "", "","", ""];
	let birthdate:number = new Date().getTime();
	let weightAtBirth = 0;

	export let key:string;

    const createCow = () => {
		const data = {
			name: tempCow[0],
			RFID: tempCow[1],
			farmID: tempCow[2],
			genetic: tempCow[3],
			birthDate: birthdate,
			weightAtBirth: weightAtBirth,
			fatherName: tempCow[4],
			fatherGenetic: tempCow[5],
			motherName: tempCow[6],
			motherGenetic: tempCow[7]
		}
		// console.log(JSON.stringify(data));
		postData('../api/cow', data, key);
	}
</script>

<div class="flex flex-col p-3 border-zinc-800 border-2 m-2 rounded-md w-full">
    {#each formFields as field, index}
        <Textfield label={field} bind:value={tempCow[index]} class="mt-2" input$maxlength={30} />	
    {/each}
    <Textfield label="Birth Date" type="datetime-local" bind:value={birthdate} class="mt-2"/>
    <Textfield label="Weight At Birth" type="number" bind:value={weightAtBirth} class="mt-2"/>
    
    <Button on:click={createCow} class="mt-5" variant="raised">
        <Label>Insert Cow</Label>
    </Button>
</div>