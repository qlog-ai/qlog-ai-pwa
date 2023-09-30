import { getVerifiedUserAddress } from '$lib/route_utils';
import mysql from '$lib/server/db/mysql';
import { questions } from '$lib/server/schema/questions';
import { error } from '@sveltejs/kit';
import { eq, desc } from 'drizzle-orm';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, cookies }) {
	let verified_wallet_address = await getVerifiedUserAddress({ request, cookies });
	if (!verified_wallet_address) {
		throw error(401, { message: 'Unauthorized' });
	}
	return {
		questions: await mysql
			.select()
			.from(questions)
			.where(eq(questions.wallet_address, verified_wallet_address))
			.orderBy(desc(questions.updated_at))
	};
}
