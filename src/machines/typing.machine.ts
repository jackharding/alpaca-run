import { ActorRefFrom, createMachine, send, spawn, assign } from 'xstate';
import characterMachine from './character.machine';
import timerMachine from './timer.machine';

type TypingEvent =
	| { type: 'INPUT'; key: string }
	| { type: 'RESTART' }
	| { type: 'PAUSE' };

interface TypingContext {
	targetString: string;
	currentCharIndex: number;
	characterRef: ActorRefFrom<typeof characterMachine>;
	timerRef: ActorRefFrom<typeof timerMachine>;
}

const isInvalidInputKey = (key: string) => ['Backspace'].includes(key);

const typingMachine = createMachine<TypingContext, TypingEvent>(
	{
		initial: 'active',
		context: () => ({
			currentCharIndex: 0,
			targetString: '',
			characterRef: spawn(characterMachine, 'characterMachine'),
			timerRef: spawn(timerMachine, 'timerMachine'),
		}),
		on: {
			PAUSE: {
				actions: [send({ type: 'PAUSE' }, { to: (ctx) => ctx.timerRef })],
			},
			RESTART: {
				actions: ['restart'],
			},
		},
		states: {
			active: {
				initial: 'valid',
				onDone: 'finished',
				// entry: ['addListener'],
				// exit: ['removeListener'],
				states: {
					valid: {
						on: {
							INPUT: [
								// todo: index not in sync once incorrect
								{
									target: 'invalid',
									cond: (ctx, e) => {
										if (isInvalidInputKey(e.key)) return false;
										console.log(ctx.targetString[ctx.currentCharIndex], e.key);
										return ctx.targetString[ctx.currentCharIndex] !== e.key;
									},
								},
								{
									target: 'finished',
									actions: [
										send({ type: 'MOVE' }, { to: (ctx) => ctx.characterRef }),
									],
									cond: (ctx) =>
										ctx.currentCharIndex >= ctx.targetString.length - 1,
								},
								{
									actions: [
										send({ type: 'START' }, { to: (ctx) => ctx.timerRef }),
										send({ type: 'MOVE' }, { to: (ctx) => ctx.characterRef }),
										assign({
											currentCharIndex: (ctx, e) => {
												if (isInvalidInputKey(e.key))
													return ctx.currentCharIndex;
												console.log('update index', ctx);
												return ctx.currentCharIndex + 1;
											},
										}),
									],
								},
							],
						},
					},
					invalid: {
						after: {
							1000: {
								actions: send(
									{ type: 'PREPARE_TO_STOP' },
									{ to: (ctx) => ctx.characterRef }
								),
							},
						},
						on: {
							INPUT: [
								{
									target: 'valid',
									cond: (ctx, e) => e.key === 'Backspace',
								},
							],
						},
					},
					finished: {
						type: 'final',
					},
				},
			},
			finished: {
				entry: () => console.log('FINISHED'),
			},
		},
	},
	{
		actions: {
			restart: assign({
				currentCharIndex: () => 0,
			}),
		},
	}
);

export default typingMachine;
