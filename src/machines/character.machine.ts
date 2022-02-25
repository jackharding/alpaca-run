import { createMachine, send, assign } from 'xstate';

type CharacterEvent =
	| { type: 'MOVE' }
	| { type: 'AT_SPEED' }
	| { type: 'PREPARE_TO_STOP' }
	| { type: 'STOP' }
	| { type: 'STOPPED' };

interface CharacterContext {
	targetString: string;
	currentCharIndex: number;
}

export type CharacterStates = 'static' | 'starting' | 'moving' | 'stopping';

const characterMachine = createMachine<CharacterContext, CharacterEvent>({
	initial: 'static',
	states: {
		static: {
			on: {
				MOVE: 'starting',
			},
		},
		starting: {
			on: {
				AT_SPEED: 'moving',
			},
		},
		moving: {
			on: {
				PREPARE_TO_STOP: 'preparingToStop',
			},
		},
		preparingToStop: {
			on: {
				STOP: 'stopping',
			},
		},
		stopping: {
			on: {
				STOPPED: 'static',
			},
		},
	},
});

export default characterMachine;
