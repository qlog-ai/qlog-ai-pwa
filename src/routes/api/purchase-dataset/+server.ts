import { error, json } from '@sveltejs/kit';
import mysql from '$lib/server/db/mysql';
import { questions } from '$lib/server/schema/questions';
import { eq, desc } from 'drizzle-orm';
import { getVerifiedUserAddress } from '$lib/route_utils';
import { BEARER_TOKEN } from '$env/static/private';

export async function POST({ request, cookies }) {
	// Bearer token check
	const bearer_token = request.headers.get('Authorization')?.split(' ')[1];

	if (bearer_token === BEARER_TOKEN) {
		const { purchaseWalletAddress, datasetAddress } = await request.json();
		// some magic

		return json({
			questions: 22
		});
	}
	return new Response(String('purchased'));
}
