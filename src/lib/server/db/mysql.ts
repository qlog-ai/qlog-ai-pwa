import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import { PLANETSCALE_HOST, PLANETSCALE_USER, PLANETSCALE_PASSWORD } from '$env/static/private';
import * as schema from '$lib/server/schema/questions';

// create the connection
const connection = connect({
	host: PLANETSCALE_HOST,
	username: PLANETSCALE_USER,
	password: PLANETSCALE_PASSWORD,
	// Cloudflare worker workaround...
	fetch: (url: string, init: any) => {
	  delete (init as any)["cache"]; // Remove cache header
	  return fetch(url, init);
	}
});

const mysql = drizzle(connection, { schema });

export default mysql;
