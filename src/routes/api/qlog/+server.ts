import { error } from '@sveltejs/kit';
import mysql from '$lib/server/db/mysql';
import { questions } from '$lib/server/schema/questions';
import { eq, desc } from 'drizzle-orm';
import { getVerifiedUserAddress } from '$lib/route_utils';
/** @type {import('./$types').RequestHandler} */
export async function GET({ request, cookies }) {
	// let verified_wallet_address = await getVerifiedUserAddress({ request, cookies });
	if (true) {
		return new Response(
			String(
				JSON.stringify(
					await mysql
						.select()
						.from(questions)
						.where(eq(questions.wallet_address, "0xF4E20531CD11Fb8b70896AA9710FeDbEb9be87c3"))
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
		if (old_question[0].wallet_address !== verified_wallet_address) {
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
	if (!!old_question.length && old_question[0].wallet_address !== verified_wallet_address) {
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
	let now = new Date();
	const { context, question, answer, input } = await request.json();
	await mysql
		.insert(questions)
		.values({
			wallet_address: verified_wallet_address,
			context,
			question,
			answer,
			input,
			created_at: now,
			updated_at: now
		});
	return new Response(String('inserted'));
}
