import { error } from '@sveltejs/kit';
import mysql from '$lib/server/db/mysql';
import { questions } from '$lib/server/schema/questions';
import { eq, desc } from 'drizzle-orm';
import { getVerifiedUserAddress } from '$lib/route_utils';
import { Web3Storage } from 'web3.storage';
import { WEB3_STORAGE_API_TOKEN } from '$env/static/private';

const web3storage = new Web3Storage({ token: WEB3_STORAGE_API_TOKEN })

export async function GET({ request, params }) {		
        
        const cid = await web3storage.put([new File(['hello world of smart con, will this work hopefully?'], 'someawesomedataset.txt', { type: 'text/plain' })])        
        // const myImmutableAddress = await j.add({ hello: 'smart con world' })
        
        // return new Response(String(myImmutableAddress));
        return new Response(String(cid));
	
}


