import type { PageLoad } from './$types';
import * as elements from '$lib/elements/listeners';

export const load: PageLoad = function ({ params }) {
	return elements.list(params);
};
