import { createMachine } from "xstate";
import { assign } from "xstate";

export enum Effect {
	rtl = 'rtl',
}

type EventInstanceEvent =
  | { type: 'PROGRESS', progress: number }
	| { type: 'TIMER_INC' }
	| { type: 'STOP_EVENT' }

interface EventInstanceContext {
	totalSecondsElapsed?: number;
  removalConditions: {
		progressReached?: number;
		secondsElapsed?: number;
	}
}

const eventInstanceMachine = createMachine<EventInstanceContext, EventInstanceEvent>({
	initial: 'active',
	states: {
		active: {
			invoke: {
				id: 'timer',
				src: (ctx, e) => (send) => {
					console.log('ye')
					const id = setInterval(() => send({ type: 'TIMER_INC' }), 1000);

					return () => clearInterval(id);
				}
			},
			on: {
				TIMER_INC: [
					{ target: 'removed', cond: 'hasReachedSecondsElapsedCondition' },
					{ actions: ['incrementSecondsElapsed'] }
				]
			}
		},
		removed: {
			type: 'final'
		}
	},
}, {
	actions: {
		incrementSecondsElapsed: assign({
			totalSecondsElapsed: (ctx) => {
				console.log('incremebet!', ctx)
				return (ctx.totalSecondsElapsed ?? 0) + 1;
			}
		})
	},
	guards: {
		hasReachedSecondsElapsedCondition: (ctx) => {
			console.log('reached??')
			if(!ctx.removalConditions.secondsElapsed) return false;
			return (ctx.totalSecondsElapsed ?? 0) >= ctx.removalConditions?.secondsElapsed;
		},
	}
});

export default eventInstanceMachine;