import { error } from '@sveltejs/kit';
import mysql from '$lib/server/db/mysql.js';
import { questions } from '$lib/server/schema/questions';
import { eq, desc } from 'drizzle-orm';
import { getVerifiedUserAddress } from '$lib/route_utils';
/** @type {import('./$types').RequestHandler} */
export async function GET({ request, cookies }) {
	let verified_wallet_address = await getVerifiedUserAddress({ request, cookies });
	if (verified_wallet_address) {
		return new Response(
			String(
				JSON.stringify(
					await mysql
						.select()
						.from(questions)
						.where(eq(questions.wallet_address, verified_wallet_address))
						.orderBy(desc(questions.updated_at))
				)
			)
		);
	} else {
		throw error(401, { message: 'Unauthorized' });
	}
}

export async function PUT({ request, cookies }) {
	let verified_wallet_address = await getVerifiedUserAddress({ request, cookies });
	if (verified_wallet_address) {
		const { id, question, answer } = await request.json();
		const old_question = await mysql.select().from(questions).where(eq(questions.id, id));
		if (old_question.wallet_address !== verified_wallet_address) {
			throw error(401, { message: 'Unauthorized' });
		}
		let updated_at = new Date();
		await mysql.update(questions).set({ question, answer, updated_at }).where(eq(questions.id, id));
		return new Response(String('updated'));
	} else {
		throw error(401, { message: 'Unauthorized' });
	}
}

export async function DELETE({ request, cookies }) {
	let verified_wallet_address = await getVerifiedUserAddress({ request, cookies });
	if (!verified_wallet_address) {
		throw error(401, { message: 'Unauthorized' });
	}

	const { id } = await request.json();
	const old_question = await mysql.select().from(questions).where(eq(questions.id, id));
	if (old_question.wallet_address !== verified_wallet_address) {
		throw error(401, { message: 'Unauthorized' });
	}

	await mysql.delete(questions).where(eq(questions.id, id));
	return new Response(String('deleted'));
}

export async function POST({ request, cookies }) {
	let verified_wallet_address = await getVerifiedUserAddress({ request, cookies });
	if (!verified_wallet_address) {
		throw error(401, { message: 'Unauthorized' });
	}
	const { wallet_address, context, question, answer, input, created_at, updated_at } = await request.json();
	await mysql
		.insert(questions)
		.values({ wallet_address, question, answer, input, created_at, updated_at });
	return new Response(String('inserted'));
}
