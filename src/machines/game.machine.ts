import { ActorRefFrom, assign, createMachine, spawn } from 'xstate';
import typingMachine from './typing.machine';

type GameEvent =
	| { type: 'TOGGLE_CUSTOM_TEXT' }
	| { type: 'UPDATE_CUSTOM_TEXT'; text: string }
	| { type: 'TOGGLE_PAUSED' };

export type GameContext = {
	typingRef: ActorRefFrom<typeof typingMachine>;
	isPaused: boolean;
	settings: {
		useCustomText: boolean;
		customText: string;
	};
};

// TODO: This machine should spawn typing machine
const gameMachine = createMachine<GameContext, GameEvent>(
	{
		context: () => ({
			typingRef: spawn(typingMachine, 'typingMachine'),
			isPaused: false,
			settings: {
				useCustomText: false,
				customText: '',
			},
		}),
		on: {
			TOGGLE_CUSTOM_TEXT: {
				actions: 'toggleCustomText',
			},
			UPDATE_CUSTOM_TEXT: {
				actions: 'updateCustomText',
			},
			TOGGLE_PAUSED: {
				actions: 'togglePaused',
			},
		},
		states: {
			title: {},
			playing: {},
		},
	},
	{
		actions: {
			toggleCustomText: assign({
				settings: (ctx) => ({
					...ctx.settings,
					useCustomText: !ctx.settings.useCustomText,
				}),
			}),
			updateCustomText: assign({
				settings: (ctx, e) => ({
					...ctx.settings,
					customText:
						e.type === 'UPDATE_CUSTOM_TEXT' ? e.text : ctx.settings.customText,
				}),
			}),
			togglePaused: assign({
				isPaused: (ctx) => !ctx.isPaused,
			}),
		},
	}
);

export default gameMachine;
