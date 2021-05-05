<script lang="ts">
    import {Character} from './components/classes/character.ts';
    import {Backend} from "./components/backend";
    import CharSheet from './components/charsheet';

    let char_data = new Character();
    let discord_url;
    let current_user = null;

    async function saveCharacter() {
        const j = char_data.as_json();
        try {
            await Backend.SaveCharacter(current_user, j, discord_url);
            alert("character saved!");
        } catch (err) {
            alert("sorry. couldn't save character: " + err);
        }
    }

    async function loadCharacter() {
        try {
            const [data, url] = await Backend.LoadCharacter(current_user);
            char_data = Character.from_json(data);
            discord_url = url;
        } catch (e) {
            alert("couldn't load character data: " + e);
        }
    }

    async function login() {
        try {
            current_user = await Backend.Login("agka", "123456");
            alert("logged in successfully.");

            try {
                const [data, url] = await Backend.LoadCharacter(current_user);
                char_data = Character.from_json(data);
                discord_url = url;
            } catch (e) {
                return;
            }
        } catch (err) {
            alert("failure logging in: " + err);
        }
    }


</script>

<main>
    <div style="grid-column-start:1; grid-column-end: span 2">
        {#if current_user !== null}
            logged in as <b>{current_user.get("username")}</b>
            <br>
            <input type="button" value="save" on:click={saveCharacter}>
            <input type="button" value="load" on:click={loadCharacter}>
        {:else}
            <input type="button" value="login" on:click={login}>
        {/if}

        <input type="text" id="hook" bind:value={discord_url} placeholder="enter discord webhook url">
    </div>

    <CharSheet bind:char_data={char_data} bind:discord_url={discord_url}/>
</main>

<style>


    .contain {
        width: 100%;
    }

</style>
