<script lang="ts">
    import {Backend, CharIdPair} from "./components/backend";
    import MiniSheet from './components/minisheet';

    let current_user = null;
    let current_characters: Array<CharIdPair> = [];
    let characters_displayed: Array<CharIdPair> = [];

    Backend.GetCurrentUser().then((it) => {
        current_user = it;
        if (it) loadCharacterList();
    }).catch(() => {});

    async function loadCharacterList() {
        try {
            current_characters = await Backend.GetCharacterList();
        } catch (e) {
            alert("couldn't load character list: " + e);
        }
    }

    async function reloadCharacterList() {
        try {
            characters_displayed = await Backend.ReloadCharacterList(characters_displayed);
            alert("all displayed characters reloaded");
        } catch (e) {
            alert("couldn't load character list: " + e);
        }
    }

    async function saveCharacterList() {
        try {
            characters_displayed = await Backend.SaveCharacterList(characters_displayed);
            alert("all displayed characters saved and reloaded");
        } catch (e) {
            alert("couldn't save character list: " + e);
        }
    }

    function toggleCharacter(char_data) {
        return () => {
            /* we can't use the index of the object, so we'll rely on the key the backend gives us, which is
            * any of a string or an integer -- a more reliable type. */
            let index = characters_displayed.map(x => Backend.GetKey(x)).indexOf(Backend.GetKey(char_data));
            if (index !== -1) {
                /* remove from array */
                characters_displayed = [...characters_displayed.slice(0, index), ...characters_displayed.slice(index + 1)];
            } else {
                characters_displayed = [...characters_displayed, char_data];
            }
        }
    }

    /* operates over characters_displayed */
    function saveCharacter(index) {
        return async () => {
            try {
                characters_displayed[index] = await Backend.SaveCharacterGM(characters_displayed[index]);
                alert(`saved ${characters_displayed[index].character.name} successfully`);
            } catch (e) {
                alert("couldn't save character: " + e);
            }
        }
    }

    /* operates over characters_displayed */
    function reloadCharacter(index) {
        return async () => {
            try {
                characters_displayed[index] = await Backend.LoadCharacterGM(characters_displayed[index]);
                alert(`reloaded ${characters_displayed[index].character.name} successfully`);
            } catch (e) {
                alert("couldn't reload character: " + e);
            }
        }
    }
</script>

<main>
    {#if current_user == null}
        <div class="all"><em>Sorry. Please log in to be able to see this page.</em></div>
    {:else}
        Welcome <b>{current_user.get("username")}</b>
        <button on:click={reloadCharacterList}> reload all displayed characters </button>
        <button on:click={saveCharacterList}> save all displayed characters </button>

        <hr>

        <div class="row">
            <b>characters:</b>
            {#each current_characters as char, i}
                <!-- Same as with toggleCharacter, we have to use keys to compare here. -->
                <button on:click|stopPropagation={toggleCharacter(char)}
                        class="char-btn"
                        class:selected={characters_displayed.map(x => Backend.GetKey(x)).includes(Backend.GetKey(char))}>
                    {char.character.name} ({char.character.player})
                </button>
            {/each}
        </div>

        <div class="col">
            {#each characters_displayed as char, i}
                <div class="box">
                    <button on:click|self={saveCharacter(i)}>save</button>
                    <button on:click|self={reloadCharacter(i)}>reload</button>
                    <MiniSheet bind:char_data={char.character}/>
                </div>
            {/each}
        </div>
    {/if}
</main>

<style>
    .all {
        position: fixed;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        display: flex;
        top: 0;
        left: 0;
    }

    .all > em {
        vertical-align: middle;
    }

    main {
        width: 100%;
        height: 100%;
    }

    .box {
        border: 2px solid;
        padding: 10px;
        margin: 10px;
    }
</style>
