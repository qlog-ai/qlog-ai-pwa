<script lang="ts">
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';
	import '../app.css';
	import { authenticated } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import { defaultEvmStores, signerAddress, signer } from 'ethers-svelte';
	import type { SvelteToastOptions } from '@zerodevx/svelte-toast/stores';

	let address: string | undefined;
	let loading = true;
	const svelteToastOptions: SvelteToastOptions = {
		reversed: false,
		intro: {
			y: '-20px',
			x: '20px'
		}
	};
	onMount(async () => {
		const response = await fetch(`/api/auth/verify`);
		const resp = await response.json();
		if (resp.authenticated) {
			address = resp.address;
			authenticated.set(resp.authenticated);
		}
		loading = false;
	});

	const connect = async () => {
		loading = true;
		defaultEvmStores
			.setProvider()
			.then(async () => {
				address = $signerAddress;
				const now = new Date();
				const datetimenow = now.toUTCString();
				const weekInMilliseconds = 1000 * 60 * 60 * 24 * 7;
				const datetimefutureweek = new Date(now.getTime() + weekInMilliseconds).toUTCString();
				const signed = await $signer.signMessage(
					`You are logging in to QLog.ai at UTC time: ${datetimenow}. \n\nThis session is valid until UTC time: ${datetimefutureweek}`
				);

				const response = await fetch(`/api/auth`, {
					method: 'POST',
					body: JSON.stringify({
						address,
						signed,
						datetimenow,
						datetimefutureweek
					}),
					headers: {
						'content-type': 'application/json'
					}
				});
				if (response.ok) {
					authenticated.set(true);
					toast.push('Connected Wallet');
				} else {
					defaultEvmStores.disconnect();
					toast.push('Failed to connect wallet');
				}
				loading = false;
			})
			.catch((e) => {
				loading = false;
				defaultEvmStores.disconnect();
				toast.push('Failed to connect wallet');
			});
	};

	const logout = async () => {
		const response = await fetch(`/api/auth`, {
			method: 'POST',
			body: JSON.stringify({ address, logout: true }),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (response.ok) {
			authenticated.set(false);
			defaultEvmStores.disconnect();
			toast.push('Disconnected Wallet');
		} else {
			toast.push('Failed to disconnect Wallet');
		}
	};
</script>

<header class="top-2 absolute z-10 w-full flex items-center justify-between">
	<div class="flex items-center space-x-4 text-sm">
		<a class="ml-2" href="/">
			<img class="h-[20px]" src="/qlog.svg" alt="qlog.ai" />
		</a>
		<a href="/dataset"> Your Dataset </a>
		<a href="/data-market"> Data market </a>
	</div>
	{#if loading}
		<button
			class="flex justify-center items-center w-[150px] text-gray-800 text-sm h-[30px] sm:mr-2 mr-0.5 border border-gray-700 hover:border-amber-800 my-1 pt-1 rounded"
			on:click={connect}
		>
			<svg
				class="mr-2 mb-1 fill-gray-600"
				xmlns="http://www.w3.org/2000/svg"
				xml:space="preserve"
				width="15"
				height="15"
				viewBox="0 0 76.304 76.304"
				><path
					d="M72.325 33.234v-2.947c0-5.389-3.698-9.919-8.686-11.217l-.009-4.859c0-4.742-3.859-8.601-8.603-8.601h-.455L14.31 18.1a8.487 8.487 0 0 0-2.604.584h-.105C5.205 18.684 0 23.889 0 30.287v28.804c0 6.397 5.204 11.603 11.601 11.603h49.123c6.396 0 11.601-5.205 11.601-11.603V55.26c2.323-.899 3.979-3.151 3.979-5.789v-10.45c-.001-2.636-1.656-4.888-3.979-5.787zM70.303 49.47a.21.21 0 0 1-.211.211H53.851a.208.208 0 0 1-.21-.211V39.021a.21.21 0 0 1 .21-.209h16.241a.21.21 0 0 1 .211.209V49.47zM55.398 11.637a2.606 2.606 0 0 1 2.232 2.579l.008 4.469H32.679l22.719-7.048zm5.326 53.056H11.602a5.603 5.603 0 0 1-5.601-5.603V30.287a5.602 5.602 0 0 1 5.601-5.603h49.122a5.601 5.601 0 0 1 5.601 5.603v2.525H53.851a6.216 6.216 0 0 0-6.21 6.209V49.47a6.218 6.218 0 0 0 6.21 6.211h12.474v3.41a5.602 5.602 0 0 1-5.601 5.602z"
				/></svg
			>
			<p class="text-center -mr-6 -mt-1">Verify user</p>
			<div class="bg-yellow-500 animate-bounce w-1.5 h-1.5 ml-8 -mt-4 rounded-full" />
		</button>
	{:else if !$authenticated}
		<button
			class="flex justify-center items-center w-[150px] text-gray-800 text-sm h-[30px] sm:mr-2 mr-0.5 border border-gray-700 hover:border-amber-800 my-1 pt-1 rounded"
			on:click={connect}
		>
			<svg
				class="mr-2 mb-1 fill-gray-600"
				xmlns="http://www.w3.org/2000/svg"
				xml:space="preserve"
				width="15"
				height="15"
				viewBox="0 0 76.304 76.304"
				><path
					d="M72.325 33.234v-2.947c0-5.389-3.698-9.919-8.686-11.217l-.009-4.859c0-4.742-3.859-8.601-8.603-8.601h-.455L14.31 18.1a8.487 8.487 0 0 0-2.604.584h-.105C5.205 18.684 0 23.889 0 30.287v28.804c0 6.397 5.204 11.603 11.601 11.603h49.123c6.396 0 11.601-5.205 11.601-11.603V55.26c2.323-.899 3.979-3.151 3.979-5.789v-10.45c-.001-2.636-1.656-4.888-3.979-5.787zM70.303 49.47a.21.21 0 0 1-.211.211H53.851a.208.208 0 0 1-.21-.211V39.021a.21.21 0 0 1 .21-.209h16.241a.21.21 0 0 1 .211.209V49.47zM55.398 11.637a2.606 2.606 0 0 1 2.232 2.579l.008 4.469H32.679l22.719-7.048zm5.326 53.056H11.602a5.603 5.603 0 0 1-5.601-5.603V30.287a5.602 5.602 0 0 1 5.601-5.603h49.122a5.601 5.601 0 0 1 5.601 5.603v2.525H53.851a6.216 6.216 0 0 0-6.21 6.209V49.47a6.218 6.218 0 0 0 6.21 6.211h12.474v3.41a5.602 5.602 0 0 1-5.601 5.602z"
				/></svg
			>
			<p class="-mt-1">Connect Wallet</p>
			<div class="bg-red-500 animate-bounce w-1.5 h-1.5 ml-2 -mt-4 rounded-full" />
		</button>
	{:else}
		<button
			class="flex justify-center text-gray-600 items-center w-[150px] text-sm h-[30px] mr-2 border border-gray-700 hover:border-amber-800 pl-2 pr-1 my-1 pt-1 rounded"
			on:click={logout}
		>
			<svg
				class="mr-2 mb-1 fill-gray-600"
				xmlns="http://www.w3.org/2000/svg"
				xml:space="preserve"
				width="15"
				height="15"
				viewBox="0 0 76.304 76.304"
				><path
					d="M72.325 33.234v-2.947c0-5.389-3.698-9.919-8.686-11.217l-.009-4.859c0-4.742-3.859-8.601-8.603-8.601h-.455L14.31 18.1a8.487 8.487 0 0 0-2.604.584h-.105C5.205 18.684 0 23.889 0 30.287v28.804c0 6.397 5.204 11.603 11.601 11.603h49.123c6.396 0 11.601-5.205 11.601-11.603V55.26c2.323-.899 3.979-3.151 3.979-5.789v-10.45c-.001-2.636-1.656-4.888-3.979-5.787zM70.303 49.47a.21.21 0 0 1-.211.211H53.851a.208.208 0 0 1-.21-.211V39.021a.21.21 0 0 1 .21-.209h16.241a.21.21 0 0 1 .211.209V49.47zM55.398 11.637a2.606 2.606 0 0 1 2.232 2.579l.008 4.469H32.679l22.719-7.048zm5.326 53.056H11.602a5.603 5.603 0 0 1-5.601-5.603V30.287a5.602 5.602 0 0 1 5.601-5.603h49.122a5.601 5.601 0 0 1 5.601 5.603v2.525H53.851a6.216 6.216 0 0 0-6.21 6.209V49.47a6.218 6.218 0 0 0 6.21 6.211h12.474v3.41a5.602 5.602 0 0 1-5.601 5.602z"
				/></svg
			>
			{#if address}
				<p class="-mt-1">
					{address.slice(0, 6)}...{address.slice(-4)}
				</p>
			{/if}
			<div class="bg-green-500 w-1.5 h-1.5 ml-2 -mt-4 rounded-full" />
		</button>
	{/if}
</header>
<div class="bg-white">
	<div class="relative isolate px-6 pt-10 lg:px-8">
		<div
			class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
			aria-hidden="true"
		>
			<div
				class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#f59e0b] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
				style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			/>
		</div>
		<slot />
	</div>
</div>

<SvelteToast {svelteToastOptions} />

<style>
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: 2rem;
		--toastContainerBottom: 2rem;
		--toastContainerLeft: auto;
		--toastBackground: #fff;
		--toastColor: black;
		--toastProgressColor: #f59e0b;
		--toastBarBackground: #f59e0b;
	}
</style>
