<script lang="ts">
    import Textfield from "@smui/textfield";
    import { postData } from '$lib/HTTPHelper';
    import Button, { Label } from '@smui/button';

    export let key:string;

    let tempBreeding:BreedingRecord;
    let timestamp:number = new Date().getTime();

    $:tempBreeding = {
        fatherName : "",
        motherID : "",
        calfGender : "",
        calfWeight : 0,
        timestamp: new Date(timestamp)
    } satisfies BreedingRecord;

    const createBreeding = () => {
		// console.log(JSON.stringify(data));
		postData('/api/breedingRecord', tempBreeding, key);
	}
</script>


<div class="flex flex-col p-3 border-zinc-800 border-2 m-2 rounded-md w-full">
    <Textfield label="Cow's ID" bind:value={tempBreeding.motherID} class="mt-2" type="number"/>
    <Textfield label="Father's Name" bind:value={tempBreeding.fatherName} class="mt-2" type="text"/>
    <Textfield label="Timestamp" bind:value={timestamp} class="mt-2" type="datetime-local"/>
    <Textfield label="Calf's Weight" bind:value={tempBreeding.calfWeight} class="mt-2" type="number"/>
    <Textfield label="Calf's Gender" bind:value={tempBreeding.calfGender} class="mt-2" type="text"/>

    <Button on:click={createBreeding} class="mt-5" variant="raised">
        <Label>Insert Breeding Record</Label>
    </Button>
</div>