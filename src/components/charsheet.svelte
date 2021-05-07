<script lang="ts">
    import CharHeader from './sheet/header.svelte';
    import AttrView from './sheet/attributesview.svelte';
    import SkillView from './sheet/skillsview.svelte';
    import ItemView from './sheet/itemview.svelte';
    import AbilitiesView from './sheet/abilitiesview'
    const {class_list} = require("./classes/data/classes");

    export let char_data;
    export let discord_url: string;

    async function rollSkill(event) {
        let msg = `Roll [**${event.detail.roll_value}**] [Target: ${event.detail.roll_target} (Skill: ${event.detail.skill_name})]. `;

        if (discord_url != null && discord_url != '') {
            await fetch(discord_url, {
                body: JSON.stringify({
                    username: char_data.name,
                    embeds: [
                        {
                            title: `Rolling ${event.detail.skill_name}`,
                            fields: [
                                { name: `Target`, value: event.detail.roll_target },
                                { name: `Roll`, value: event.detail.roll_value }
                            ]
                        }
                    ]
                }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        alert(msg);
    }
</script>

<div class="sheet">
    <div>
        <h1>character</h1>
        <CharHeader bind:char_data={char_data}/>
    </div>

    <div>
        <h1>attributes</h1>
        <AttrView bind:attributes={char_data.attributes}/>

        <h2>class</h2>

        <div class="row">
            <div class="textin" style="flex-grow: 7">
                <div class="fieldname textname"> <b> class </b></div>
                <!-- this onchange hack is ugly but hey. it works! class level gets updated properly. -->
                <select bind:value={char_data.char_class} on:change={() => {char_data.class_level = char_data.class_level} }>
                    {#each class_list as cls}
                        <option value={cls.class_name}>{cls.class_name}</option>
                    {/each}
                </select>
            </div>
            <div class="textin" style="flex-grow: 3">
                <div class="fieldname textname"> <b> level </b></div>
                <input type="number" bind:value={char_data.class_level}>
            </div>
        </div>
    </div>
    <div>
        <h1>skills</h1>
        <SkillView bind:skills={char_data.skills} on:roll={rollSkill}/>
    </div>
    <div>
        <h1>abilities</h1>
        <AbilitiesView bind:skills={char_data.skills} bind:abilities={char_data.abilities} on:roll={rollSkill}/>
    </div>
    <div style="grid-column: 1; grid-column-end: span 2; width: 100%">
        <h1>items</h1>
        <ItemView bind:items={char_data.items}/>
    </div>
</div>

<style>
    .sheet {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 0.5fr;
        width: 98%;
        border: 4px solid;
        margin: auto;
        padding: 1%;
    }

    .sheet > div {
        justify-self: left;
        width: 95%;
    }
</style>