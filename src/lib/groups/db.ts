import type { Id, RecordList } from '$lib/common/types';
import type { Group, GroupData } from '$lib/groups/types';

import { error } from '$lib/common/utils';

const groups: Group[] = [];

let groupId = 0;

export function list(userId: Id): RecordList {
	console.debug(`groups.list(${userId})`);
	return groups
		.filter((g) => g.userId === userId)
		.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
		.map(({ id, name }) => ({ id, name }));
}

export function get(id: Id): Group {
	console.debug(`groups.get(${id})`);
	const group = groups.find((g) => g.id === id);
	if (!group) {
		throw error(404, 'Group not found');
	}
	return group;
}

export function create(userId: Id, data: GroupData): Id {
	const id = groupId++;
	groups.push({ id, userId, ...data });
	console.debug('groups.create()', groups);
	return id;
}
