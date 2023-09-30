import { error, json } from '@sveltejs/kit';
import { getVerifiedUserAddress } from '$lib/route_utils';

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, cookies }) {
	const verifiedAddress = await getVerifiedUserAddress({ request, cookies });
	if (verifiedAddress) {
		return json({
			authenticated: true,
			address: verifiedAddress
		});
	} else {
		throw error(401, { message: 'Unauthorized' });
	}
}
