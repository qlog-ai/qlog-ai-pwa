<script>
	import { defaultEvmStores as evm, contracts, signerAddress } from 'ethers-svelte';
	import { parseEther, encodeBytes32String } from 'ethers';
	import { onMount } from 'svelte';
	import { chainlink } from '$lib/abi/chainlink';

	onMount(async () => {
		evm.setProvider();
		evm.attachContract('chainlink', "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846", chainlink);
	});
</script>

<button
on:click={async () => {
	await $contracts.chainlink.approve("0x88b9BB23d84C4F5Ebbb2E257e8C7882Af60Ea281", parseEther('100.0'));
}}
class="mt-4 w-full rounded-md bg-orange-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
>Set your LINK allowance before you can buy a dataset</button
>
<ul role="list" class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
	{#each [1] as item}
		<li
			class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
		>
			<div class="flex flex-1 flex-col p-8">
				<img
					class="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
					src="/patrick.jpeg"
					alt=""
				/>
				<h3 class="mt-6 text-sm font-medium text-gray-900">Patrick Collins</h3>
				<dl class="mt-1 flex flex-grow flex-col justify-between">
					<dt class="sr-only">Title</dt>
					<dd class="text-sm text-gray-500">CEO Cyfrin</dd>
					<dt class="sr-only">Role</dt>
					<dd class="text-sm text-gray-500">500 Security Solidity Questions Dataset</dd>
				</dl>
			</div>
			<div>
				<div class="-mt-px flex divide-x divide-gray-200">
					<div class="flex w-0 flex-1">
						<button
							on:click={() => alert("Only available from smart contract https://testnet.snowtrace.io/address/0x88b9BB23d84C4F5Ebbb2E257e8C7882Af60Ea281#writeContract")}
							class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Buy Dataset for 1 LINK
						</button>
					</div>
				</div>
			</div>
		</li>
	{/each}
</ul>
