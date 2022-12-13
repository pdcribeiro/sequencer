import type { RouteParams } from '$lib/common/types';
import type { GroupData } from '$lib/groups/types';

import { goto } from '$app/navigation';
import { idFromParams, idFromUrl } from '$lib/common/utils';
import * as elements from '$lib/elements/db';
import * as groups from '$lib/groups/db';

export function list(params: RouteParams) {
	const groupId = idFromParams(params);
	const group = groups.get(groupId);
	return {
		group,
		elements: elements.list(groupId),
	};
}

export function create(data: GroupData) {
	const groupId = idFromUrl();
	elements.create(groupId, data);
	goto(`/groups/${groupId}`);
}
