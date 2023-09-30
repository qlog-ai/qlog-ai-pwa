import { index, mysqlTable, bigint, varchar, text, datetime } from 'drizzle-orm/mysql-core';

export const questions = mysqlTable(
	'questions',
	{
		id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
		wallet_address: varchar('wallet_address', { length: 42 }),
		question: text('question'),
		answer: text('answer'),
		input: text('input'),
		created_at: datetime('created_at'),
		updated_at: datetime('updated_at')
	},
	(questions) => ({
		walletIdx: index('wallet_address_idx').on(questions.wallet_address)
	})
);
