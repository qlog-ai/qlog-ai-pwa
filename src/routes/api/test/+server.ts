import { error } from '@sveltejs/kit';
import mysql from '$lib/server/db/mysql';
import { questions } from '$lib/server/schema/questions';
import { eq, desc } from 'drizzle-orm';
import { getVerifiedUserAddress } from '$lib/route_utils';
import { BEARER_TOKEN } from '$env/static/private';
import { createHelia } from 'helia';
import { json } from '@helia/json';

export async function GET({ request, params }) {		
        
        const helia = await createHelia()
        const j = json(helia)
        
        const myImmutableAddress = await j.add({ hello: 'smart con world' })
        
        return new Response(String(myImmutableAddress));
	
}


