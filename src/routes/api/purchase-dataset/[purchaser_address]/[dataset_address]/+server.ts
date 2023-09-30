import { error, json } from '@sveltejs/kit';
import mysql from '$lib/server/db/mysql';
import { questions } from '$lib/server/schema/questions';
import { eq, desc } from 'drizzle-orm';
import { getVerifiedUserAddress } from '$lib/route_utils';
import { BEARER_TOKEN } from '$env/static/private';

export async function GET({ request, params }) {
	// Bearer token check
	const bearer_token = request.headers.get('authorization')?.split(' ')[1];
	if (bearer_token === BEARER_TOKEN) {
		// Encrypt dataset with public key and push to IPFS?

		return json({
			questions: 22
		});
	} else {
		throw error(401, { message: 'Unauthorized'})
	}
}
