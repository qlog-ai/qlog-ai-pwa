import { Redis } from '@upstash/redis/cloudflare';
import { UPSTASH_API_URL, UPSTASH_API_KEY } from '$env/static/private';

const redis = new Redis({
	url: UPSTASH_API_URL,
	token: UPSTASH_API_KEY
});

export default redis;
