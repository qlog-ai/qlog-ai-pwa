import { error, json } from '@sveltejs/kit';
import { verifyMessage } from 'ethers';

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, cookies }) {
	const cookie = cookies.get('verifier-cookie');

	if (!cookie) {
		throw error(401, { message: 'Unauthorized' });
	}
	const { signed, address, datetimenow, datetimefutureweek } = JSON.parse(cookie);

	const addr = verifyMessage(
		`You are logging in to QLog.ai at UTC time: ${datetimenow}. \n\nThis session is valid until UTC time: ${datetimefutureweek}`,
		signed
	);

	if (new Date().getTime() < Date.parse(datetimefutureweek) && addr === address) {
		return json({
			authenticated: true,
			address: addr
		});
	} else {
		throw error(401, { message: 'Unauthorized' });
	}
}
