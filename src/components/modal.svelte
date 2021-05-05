<script lang="ts">
    let modal;
    let visible = false;

    export function open() {
        modal.style.display = 'flex';
    }

    export function close() {
        modal.style.display = 'none';
    }
</script>

<div class="modal" bind:this={modal} on:click|self={close}>
    <div class="modal-contents" on:click={() => {}}>
        <span class="close" on:click={close}>&times;</span>
        <slot/>
    </div>
</div>

<style>
    .modal {
        position: fixed;
        display: none;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        top: 0;
        left: 0;
        border: none;
        overflow: auto;
        background-color: rgba(127, 127, 127, 0.5);
        animation-name: fade-my-modal;
        animation-duration: 0.4s;
    }

    .modal-contents {
        display: flex;
        flex-direction: column;
        background-color: white;
        vertical-align: middle;
        margin: auto;
        padding: 1%;
        min-width: 50%;
        min-height: 30%;
    }

    @keyframes fade-my-modal {
        from { opacity: 0 }
        to { opacity: 1 }
    }

    .close {
        float: right;
        font-size: 28px;
        font-weight: bold;
        color: #999999;
        text-align: right;
        width: 100%;
    }
    .close:hover {
        color: #333333;
    }

</style>