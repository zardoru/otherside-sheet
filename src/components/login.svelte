<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    function login(event) {
        dispatch('login', {
            user: event.target.user.value,
            password: event.target.password.value
        });
    }

    function cancel() {
        dispatch('close');
    }
</script>

<form class="login-box" on:submit|preventDefault={login} id="login" action="?">
    <h1>log in</h1>

    <input required type="text" name="user" placeholder="username">
    <input required type="password" name="password" placeholder="password">

    <br>
    <br>

    <div class="row buttons">
        <button type="submit">submit</button>
        <input type="button" value="cancel" on:click={cancel}>
    </div>
</form>

<style>
    .login-box {
        flex-direction: column;
        display: flex;
        padding: 15px;
        gap: 20px;
    }

    .buttons {
        align-self: flex-end;
        gap: 10px;
    }

    input {
        flex-grow: initial;
    }
</style>