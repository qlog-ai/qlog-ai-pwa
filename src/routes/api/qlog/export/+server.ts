import { error } from '@sveltejs/kit';
import mysql from '$lib/server/db/mysql.js';
import { questions } from '$lib/server/schema/questions';
import { eq, desc } from 'drizzle-orm';
import { getVerifiedUserAddress } from '$lib/route_utils';

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, cookies, url }) {
	let verified_wallet_address = await getVerifiedUserAddress({ request, cookies });
	if (!verified_wallet_address) {
		throw error(401, { message: 'Unauthorized' });
	}

	return new Response(
		String(
			JSON.stringify(
				(
					await mysql
						.select()
						.from(questions)
						.where(eq(questions.wallet_address, verified_wallet_address))
						.orderBy(desc(questions.updated_at))
				).map((q) => {
					return url.searchParams.get('legacy') !== 'true'
						? {
								messages: [
									{
										role: 'system',
										content: q.context
									},
									{
										role: 'user',
										content: q.question
									},
									{
										role: 'assistant',
										content: q.answer
									}
								]
						  }
						: {
								prompt: q.question,
								completion: q.answer
						  };
				})
			)
		)
	);
}
