import type { GroupData } from '$lib/groups/types';

import { goto } from '$app/navigation';
import * as groups from '$lib/groups/db';

const userId = 0;

export function list() {
	return {
		groups: groups.list(userId),
	};
}

export function create(data: GroupData) {
	const id = groups.create(userId, data);
	goto(`/groups/${id}/elements`, { state: { back: '/groups' } });
}
