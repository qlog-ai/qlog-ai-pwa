<script lang="ts">
    import "../app.css";
    import { defaultEvmStores, signerAddress, signer } from 'ethers-svelte';
</script>

<header class="bg-red-500 w-full flex items-center justify-between">
    <div class="flex items-center">
        <a href="/">
            <img class="h-[20px]" src="/qlog.svg" alt="qlog.ai">
        </a>
        <a href="/questions">
            Your Questions
        </a>
        <a href="/data-market">
            Data market
        </a>
    </div>
    <button>Wallet Sign In</button>
</header>
<slot></slot>