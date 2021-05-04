<script lang="ts">
    import CharHeader from './sheet/header.svelte';
    import AttrView from './sheet/attributesview.svelte';
    import SkillView from './sheet/skillsview.svelte';
    import ItemView from './sheet/itemview.svelte';

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
    </div>
    <div>
        <h1>skills</h1>
        <SkillView bind:skills={char_data.skills} on:roll={rollSkill}/>
    </div>
    <div style="width: 90%">
        <h1>items</h1>
        <ItemView bind:items={char_data.items}/>
    </div>
</div>

<style>
    .sheet {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 0.2fr;
        width: 100%;
        border: 4px solid;
        padding: 10px;
    }

    .sheet > div {
        padding: 10px;
        justify-self: left;
    }
</style>