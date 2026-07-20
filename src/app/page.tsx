import { permanentRedirect } from 'next/navigation';

import { WORLD_CUP_CHAMPIONS_PATH } from '@/server/constants';

export default function HomePage() {
	permanentRedirect(WORLD_CUP_CHAMPIONS_PATH);
}
