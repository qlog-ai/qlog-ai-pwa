import { error, json } from '@sveltejs/kit';
import mysql from '$lib/server/db/mysql';
import { questions } from '$lib/server/schema/questions';
import { eq, desc } from 'drizzle-orm';
import { BEARER_TOKEN, WEB3_STORAGE_API_TOKEN } from '$env/static/private';
import { Web3Storage } from 'web3.storage';
import redis from '$lib/server/db/redis';

const web3storage = new Web3Storage({ token: WEB3_STORAGE_API_TOKEN })

export async function GET({ request, params }) {
	// Bearer token check
	const bearer_token = request.headers.get('authorization')?.split(' ')[1];
	if (bearer_token === BEARER_TOKEN) {
		const { purchaser_address, dataset_address } = params;
		const dataset = JSON.stringify(
			await mysql
				.select()
				.from(questions)
				.where(eq(questions.wallet_address, dataset_address))
				.orderBy(desc(questions.updated_at))
		)

        const cid = await web3storage.put([new File([dataset], `${purchaser_address}-${dataset_address}.json`, { type: 'application/JSON' })])        
		await redis.zadd(purchaser_address, { score: new Date().getTime(), member: cid });

		return json({
			cid: cid
		});
	} else {
		throw error(401, { message: 'Unauthorized'})
	}
}
