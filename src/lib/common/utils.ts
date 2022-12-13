import type { RouteParams } from '$lib/common/types';

import { error as kitError } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { goto } from '$app/navigation';
import { page } from '$app/stores';

export function idFromUrl() {
	const params = get(page).params; // doesn't work in `load()` functions
	return idFromParams(params);
}

export function idFromParams(params: RouteParams) {
	if (!params.id) {
		throw error(500, 'ID param not found');
	}
	return Number.parseInt(params.id);
}

export function goBack() {
	const path = history.state.back;
	if (path) {
		goto(path);
	} else {
		history.back();
	}
}

export function error(code: number, message: string) {
	return kitError(code, message);
}
