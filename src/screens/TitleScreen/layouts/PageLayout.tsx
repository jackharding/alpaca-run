import { rem } from 'polished';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import StateAnimation from '../../../components/StateAnimation';

const CONTROL_SIZE = rem(64);

export enum GRID_AREAS {
	LEFT,
	MAIN,
	RIGHT,
}

type PageLayoutProps = {
	state: 'active' | 'inactive';
};

const PageLayout: React.FC<PageLayoutProps> = ({ children, state }) => {
	const [isHidden, setIsHidden] = useState(true);

	useEffect(() => {
		if (state === 'active') {
			setIsHidden(false);
		}
	}, [state]);

	const handleComplete = (currentState: string) => {
		if (currentState === 'inactive') {
			setIsHidden(true);
		}
	};

	if (isHidden) return null;

	return (
		<Wrapper onComplete={handleComplete} state={state}>
			{children}
		</Wrapper>
	);
};

const Wrapper = styled(StateAnimation)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: grid;
	place-items: center;
	grid-template-columns: ${CONTROL_SIZE} 1fr ${CONTROL_SIZE};
	grid-template-rows: auto;
	grid-template-areas: '${GRID_AREAS.LEFT} ${GRID_AREAS.MAIN} ${GRID_AREAS.RIGHT}';
	gap: ${({ theme }) => theme.spacing.gutter};
	width: 100%;
	min-height: 100vh;
	padding-block: ${({ theme }) => theme.spacing.topSpacing};
	padding-inline: ${({ theme }) => theme.spacing.gutter};
	transition: opacity 0.5s;

	&[data-state='active'] {
		animation: fadeIn 1s ease-in-out forwards;
	}

	&[data-state='inactive'] {
		animation: fadeOut 1s ease-in-out forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
`;

export default PageLayout;
