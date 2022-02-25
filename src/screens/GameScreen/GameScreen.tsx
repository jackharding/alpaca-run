import React, { useEffect } from 'react';
import { useActor, useMachine } from '@xstate/react';
import { quotes } from '../../data/quotes';
import typingMachine from '../../machines/typing.machine';
import TextHolder from '../../components/TextHolder/TextHolder';
import Character from '../../components/Character/Character';
import { useGameContext } from '../../context/game.context';
import { RouteProps } from '../../types';
import { ROUTES } from '../../machines/routing.machine';
import * as Styled from './GameScreen.styled';
import PauseMenu from '../../components/PauseMenu';

// TODO: Any way to tell this from event?
const NON_INPUT_KEYS = ['Shift', 'CapsLock', 'Control', 'Tab', 'Enter'];

const getRandomPhrase = () => quotes[Math.floor(Math.random() * quotes.length)];

type GameScreenProps = RouteProps & {};

const GameScreen: React.FC<GameScreenProps> = ({ routingService }) => {
	const { useCustomText, customText, isPaused, onTogglePaused } =
		useGameContext();
	const [routingState, routingSend] = useActor(routingService);

	const [typingState, typingSend] = useMachine(typingMachine, {
		context: {
			currentCharIndex: 0,
			targetString:
				useCustomText && customText ? customText : getRandomPhrase(),
		},
	});

	const {
		context: { currentCharIndex, targetString, characterRef, timerRef },
	} = typingState;

	const [timerState] = useActor(timerRef);
	const {
		context: { seconds },
	} = timerState;

	console.log(seconds);

	const isFinished = typingState.matches('finished');
	const isActiveRoute = routingState.matches(ROUTES.GAME);

	// const [, , characterService] = useMachine(characterMachine);

	// const [eventState, eventSend] = useMachine(eventMachine);

	// const {
	// 	context: {
	// 		activeEffect
	// 	}
	// } = eventState;

	useEffect(() => {}, [isPaused]);

	// const isRtl = activeEffect === Effect.rtl;
	// const isVanished = activeEffect === Effect.vanish;
	const isInvalid = typingState.matches('active.invalid');

	useEffect(() => {
		const handleInput = (e: KeyboardEvent) => {
			if (NON_INPUT_KEYS.includes(e.key)) return;

			if (e.key === 'Escape') {
				onTogglePaused();
			} else {
				typingSend({ type: 'INPUT', key: e.key });
			}
		};

		window.addEventListener('keydown', handleInput);

		return () => {
			window.removeEventListener('keydown', handleInput);
		};
	}, []);

	// useEffect(() => {
	// 	const rand = Math.floor(Math.random() * 20)
	// 	if(rand === 2) {
	// 		eventSend({ type: 'START_EVENT', effect: Effect.vanish });
	// 	}
	// }, [progress]);

	// console.log({activeEffect, currentCharIndex, targetString})
	// const string = isRtl ? targetString.split('').reverse().join('') : targetString;
	const string = targetString;
	const goToTitle = () => routingSend({ type: 'NAVIGATE_TITLE' });

	if (!isActiveRoute) return null;

	return (
		<Styled.Wrapper isPaused={isPaused}>
			<Character
				isPaused={isPaused}
				isFinished={isFinished}
				characterService={characterRef}
			/>

			<TextHolder
				isFinished={isFinished}
				charOffset={currentCharIndex}
				isInvalid={isInvalid}
			>
				<p>{string}</p>
			</TextHolder>

			{isPaused && (
				<PauseMenu onRestart={() => typingSend({ type: 'RESTART' })} />
			)}
		</Styled.Wrapper>
	);
};

export default GameScreen;
