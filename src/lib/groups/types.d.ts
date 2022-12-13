import type { Id } from '$lib/common/types';

export interface Group extends GroupData {
	id: Id;
	userId: Id;
}

export interface GroupData {
	name: string;
}
