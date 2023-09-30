import { verifyMessage } from 'ethers';

export async function getVerifiedUserAddress({ request, cookies }) {
	const cookie = cookies.get('verifier-cookie');

	if (!cookie) {
		return false;
	}
	const { signed, address, datetimenow, datetimefutureweek } = JSON.parse(cookie);

	const verifiedAddress = verifyMessage(
		`You are logging in to QLog.ai at UTC time: ${datetimenow}. \n\nThis session is valid until UTC time: ${datetimefutureweek}`,
		signed
	);

	if (new Date().getTime() < Date.parse(datetimefutureweek) && verifiedAddress === address) {
		return verifiedAddress;
	} else {
		return false;
	}
}
