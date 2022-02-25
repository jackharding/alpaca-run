import { useActor, useMachine } from '@xstate/react';
import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { ActorRefFrom } from 'xstate';
import characterMachine from '../../machines/character.machine';
import characterSpriteRunning from '../../assets/spritesheet-running.png';
import characterSpriteStarting from '../../assets/spritesheet-start.png';

const CHARACTER_SIZE = 200;
const STARTING_FRAMES = 4;
const MOVING_FRAMES = 15;
const SPRITE_END = {
	MOVING: CHARACTER_SIZE * MOVING_FRAMES,
	STARTING: CHARACTER_SIZE * STARTING_FRAMES,
};
const SPRITES = {
	MOVING: `url(${characterSpriteRunning})`,
	STARTING: `url(${characterSpriteStarting})`,
};

const RUN_CYCLE_DURATION_MS = 600;
const STARTING_DURATION_MS =
	(RUN_CYCLE_DURATION_MS / MOVING_FRAMES) * STARTING_FRAMES * 1.5;

type CharacterProps = {
	characterService: ActorRefFrom<typeof characterMachine>;
	isPaused: boolean;
	isFinished: boolean;
};

const Character: React.FC<CharacterProps> = ({
	characterService,
	isPaused,
	isFinished,
}) => {
	const [state, send] = useActor(characterService);

	const isStarting = state.matches('starting');
	const isMoving = state.matches('moving');
	const isPreparingToStop = state.matches('preparingToStop');
	const isStopping = state.matches('stopping');

	let styles = {
		backgroundImage: SPRITES.STARTING,
		animationPlayState: 'running',
	} as CSSProperties;

	if (isStarting || isStopping) {
		styles = {
			animationName: 'start',
			animationDuration: `${STARTING_DURATION_MS}ms`,
			backgroundImage: SPRITES.STARTING,
			animationTimingFunction: `steps(${STARTING_FRAMES}, end)`,
			animationIterationCount: 1,
		};
	} else if (isMoving || isPreparingToStop) {
		styles = {
			animationName: 'run',
			animationDuration: `${RUN_CYCLE_DURATION_MS}ms`,
			backgroundImage: SPRITES.MOVING,
			animationTimingFunction: `steps(${MOVING_FRAMES}, end)`,
			animationIterationCount: 'infinite',
		};
	}

	if (isStopping) {
		styles.animationDirection = 'reverse';
	}

	if (isPaused) {
		styles.animationPlayState = 'paused';
	}

	const handleEnd = () => {
		if (!isStopping) {
			send({ type: 'AT_SPEED' });
		} else {
			send({ type: 'STOPPED' });
		}
	};

	const handleIteration = () => {
		if (isPreparingToStop) {
			send({ type: 'STOP' });
		}
	};

	return (
		<Wrapper isFinished={isFinished}>
			<Sprite
				style={styles}
				onAnimationEnd={handleEnd}
				onAnimationIteration={handleIteration}
			/>
		</Wrapper>
	);
};

type WrapperProps = Pick<CharacterProps, 'isFinished'>;
const Wrapper = styled.div<WrapperProps>`
	transition: transform 4s linear 1s;
	transform: ${({ isFinished }) => `translateX(${isFinished ? '100vw' : 0})`};
`;

const Sprite = styled.div`
	width: ${CHARACTER_SIZE}px;
	height: ${CHARACTER_SIZE}px;
	background-size: auto ${CHARACTER_SIZE}px;

	@keyframes run {
		from {
			background-position: ${SPRITE_END.MOVING}px center;
		}
		to {
			background-position: 0 center;
		}
	}

	@keyframes start {
		from {
			background-position: ${SPRITE_END.STARTING}px center;
		}
		to {
			background-position: 0 center;
		}
	}
`;

export default Character;
