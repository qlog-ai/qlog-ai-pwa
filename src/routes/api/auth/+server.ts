import { error, json } from '@sveltejs/kit';
import { verifyMessage } from 'ethers';
import redis from '$lib/server/db/redis';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
	const { signed, address, datetimenow, datetimefutureweek, logout } = await request.json();

	if (logout) {
		cookies.delete('verifier-cookie', {
			path: '/'
		});
		return json({
			authenticated: false
		});
	}
	const addr = verifyMessage(
		`You are logging in to QLog.ai at UTC time: ${datetimenow}. \n\nThis session is valid until UTC time: ${datetimefutureweek}`,
		signed
	);

	if (addr === address) {
		await redis.zadd('users', { score: new Date().getTime(), member: address });

		cookies.set(
			'verifier-cookie',
			JSON.stringify({
				signed,
				datetimenow,
				datetimefutureweek,
				address
			}),
			{ path: '/', maxAge: 604800 }
		);

		return json({
			authenticated: true
		});
	} else {
		throw error(401, { message: 'Unauthorized' });
	}
}
