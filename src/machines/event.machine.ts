import { assign, createMachine } from 'xstate';
import eventInstanceMachine from './eventInstance.machine';

export enum Effect {
	rtl = 'rtl',
	vanish = 'vanish',
}

type EventManagerEvent =
	| { type: 'PROGRESS'; progress: number }
	| { type: 'START_EVENT'; effect: Effect }
	| { type: 'STOP_EVENT' };

interface EventManagerContext {
	activeEffect?: Effect;
	userProgress?: number;
}

const eventManagerMachine = createMachine<
	EventManagerContext,
	EventManagerEvent
>(
	{
		initial: 'active',
		states: {
			idle: {},
			active: {
				initial: 'EVENT_INACTIVE',
				on: {
					PROGRESS: {
						actions: ['updateUserProgress'],
					},
				},
				states: {
					EVENT_INACTIVE: {
						on: {
							START_EVENT: {
								target: 'EVENT_ACTIVE',
								// actions: ['triggerEvent']
							},
						},
					},
					// EVENT_INCOMING: {
					// 	after: {
					// 		3000:
					// 	}
					// },
					EVENT_ACTIVE: {
						entry: ['triggerEvent'],
						exit: ['removeEvent'],
						invoke: {
							id: 'eventService',
							src: eventInstanceMachine,
							data: () => ({
								removalConditions: {
									secondsElapsed: 4,
								},
							}),
							onDone: 'EVENT_INACTIVE',
						},
					},
				},
			},
		},
	},
	{
		actions: {
			updateUserProgress: assign({
				userProgress: (ctx, e) =>
					e.type === 'PROGRESS' ? e.progress : ctx.userProgress,
			}),
			triggerEvent: assign({
				activeEffect: (ctx, e) =>
					e.type === 'START_EVENT' ? e.effect : ctx.activeEffect,
			}),
			removeEvent: assign({
				activeEffect: (ctx, e) => undefined,
			}),
		},
	}
);

export default eventManagerMachine;
