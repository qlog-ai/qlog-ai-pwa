import { error } from '@sveltejs/kit';
import redis from '$lib/server/db/redis';

/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
    redis.set('testthis', 'bar');
	return new Response(String("Some data"));
}