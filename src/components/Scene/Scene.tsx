import { useActor } from '@xstate/react';
import { CSSProperties, useContext } from 'react';
import styled from 'styled-components';
import { ActorRefFrom } from 'xstate';
import { GameContext } from '../../context/game.context';
import characterMachine from '../../machines/character.machine';
import background from '../../assets/bg.svg';

const DURATION_MS = 5000;

type SceneProps = {
	style?: {};
	characterService?: ActorRefFrom<typeof characterMachine>;
};

const Scene: React.FC<SceneProps> = ({ children, style, characterService }) => {
	const { isPaused } = useContext(GameContext);
	// const [state] = useActor(characterService);

	// const isStatic = state.matches('static');
	// const isStarting = state.matches('starting');
	// const isMoving = state.matches('moving');
	// const isPreparingToStop = state.matches('preparingToStop');
	// const isStopping = state.matches('stopping');
	const isStarting = false;
	const isStopping = false;
	const isStatic = false;

	let styles = {
		animationPlayState: 'running',
		animationDuration: `${DURATION_MS}ms`,
	} as CSSProperties;

	if (isStarting || isStopping) {
		// styles = {
		// 	animationDuration: `${SLOW_DURATION_MS}ms`,
		// }
	} else if (isStatic || isPaused) {
		styles = {
			animationPlayState: 'paused',
		};
	}
	// else if(isMoving || isPreparingToStop) {
	// 	styles = {
	// 		animationName: 'run',
	// 		animationDuration: `${RUN_CYCLE_DURATION_MS}ms`,
	// 		backgroundImage: SPRITES.MOVING,
	// 		animationTimingFunction: `steps(${MOVING_FRAMES}, end)`,
	// 		animationIterationCount: 'infinite',
	// 	}
	// }

	return <SceneContainer style={styles}>{children}</SceneContainer>;
};

const SceneContainer = styled.div`
	--panel-unique-count: 4;
	--panel-count: 7;
	--panel-width: 1100px;
	--padding-horiz: 3rem;
	--duration: 15s;
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #dee;
	padding: 0 var(--padding-horiz);
	background: url(${background});
	background-size: calc(var(--panel-width) * var(--panel-count));
	animation-name: loopBg;
	/* animation-duration: var(--duration); */
	animation-duration: 15s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	/* TODO: persist position during pause */

	@keyframes loopBg {
		from {
			background-position: 0 0;
		}
		to {
			background-position: calc(
					var(--panel-width) * calc(var(--panel-unique-count) * -1)
				)
				0;
		}
	}

	// TODO: Check this
	@media (prefers-reduced-motion) {
		animation-duration: 10s;
	}
`;

export default Scene;
