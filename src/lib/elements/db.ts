import type { Id, RecordList } from '$lib/common/types';
import type { Element, ElementData } from '$lib/elements/types';

const elements: Element[] = [];

let elementId = 0;

export function list(groupId: Id): RecordList {
	return elements
		.filter((e) => e.groupId === groupId)
		.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
		.map(({ id, name }) => ({ id, name }));
}

export function create(groupId: Id, data: ElementData): Id {
	const id = elementId++;
	elements.push({ id, groupId, ...data });
	return id;
}
