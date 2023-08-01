<script lang="ts">
    import Textfield from "@smui/textfield";
    import { postData } from '$lib/HTTPHelper';
    import Button, { Label } from '@smui/button';

    let tempFarm:Farm;

    export let key:string;

    $:tempFarm = {
        name: "",
        owner : ""
    };

    const createFarm = () => {
		// console.log(JSON.stringify(data));
		postData('../api/farm', tempFarm, key);
	}
</script>

<div class="flex flex-col p-3 border-zinc-800 border-2 m-2 rounded-md w-full">
    <Textfield label="Farm Name" bind:value={tempFarm.name} class="mt-2" input$maxlength={30} />
    <Textfield label="Farm Owner" bind:value={tempFarm.owner} class="mt-2" input$maxlength={30} />
    <Button on:click={createFarm} class="mt-5" variant="raised">
        <Label>Insert Farm</Label>
    </Button>
</div>