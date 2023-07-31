<script lang="ts">
    import Textfield from "@smui/textfield";
    import { postData } from '$lib/HTTPHelper';
    import Button, { Label } from '@smui/button';

    export let key:string;

    let tempMilk:MilkRecord;
    let timestamp:number = new Date().getTime();
    $:tempMilk = {
        cowID: -1,
        timestamp: new Date(timestamp),
        weight: 0
    } satisfies MilkRecord;

    const createMilk = () => {
		// console.log(JSON.stringify(data));
		postData('/api/forceRecord', tempMilk, key);
	}
</script>


<div class="flex flex-col p-3 border-zinc-800 border-2 m-2 rounded-md w-full">
    <Textfield label="Cow's ID" bind:value={tempMilk.cowID} class="mt-2" type="number"/>
    <Textfield label="Timestamp" bind:value={timestamp} class="mt-2" type="datetime-local"/>
    <Textfield label="Weight" bind:value={tempMilk.weight} class="mt-2" type="number"/>
    <Button on:click={createMilk} class="mt-5" variant="raised">
        <Label>Insert Milk Record</Label>
    </Button>
</div>