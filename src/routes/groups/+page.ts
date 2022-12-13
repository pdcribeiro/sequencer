import type { PageLoad } from './$types';

import * as groups from '$lib/groups/listeners';

export const load: PageLoad = function () {
	return groups.list();
};
