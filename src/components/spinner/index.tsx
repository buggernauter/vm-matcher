import type { ComponentProps } from 'react';

import { StyledSpinner } from './styles';

export const Spinner = (props: ComponentProps<typeof StyledSpinner>) => (
	<StyledSpinner role="status" aria-label="Loading" {...props} />
);
