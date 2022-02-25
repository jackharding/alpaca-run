import { assign, createMachine } from 'xstate';

type TimerEvent =
	| { type: 'UPDATE_SECONDS'; secondsElapsed: number }
	| { type: 'STORE_SECONDS' }
	| { type: 'PAUSE' }
	| { type: 'START' };

export type TimerContext = {
	totalSeconds: number;
	storedSeconds: number[];
	started: Date;
};

const calculateDiffInSeconds = (dateA: Date, dateB: Date) => {
	const diff = dateA.getTime() - dateB.getTime();
	return Math.abs(diff / 1000);
};

const timerMachine = createMachine<TimerContext, TimerEvent>(
	{
		initial: 'paused',
		context: {
			totalSeconds: 0,
			storedSeconds: [],
			started: new Date(),
		},
		states: {
			paused: {
				on: {
					START: 'running',
				},
			},
			running: {
				entry: ['updateStarted'],
				invoke: {
					src: (ctx) => (callback) => {
						const id = setInterval(() => {
							const secondsElapsed = calculateDiffInSeconds(
								new Date(),
								ctx.started
							);
							console.log(secondsElapsed);
							callback({ type: 'UPDATE_SECONDS', secondsElapsed });
						}, 1000);

						return () => {
							callback({ type: 'STORE_SECONDS' });
							clearInterval(id);
						};
					},
				},
				on: {
					UPDATE_SECONDS: {
						actions: assign({
							totalSeconds: (ctx, e) => {
								console.log('dddd', e);
								if (e.type !== 'UPDATE_SECONDS') return ctx.totalSeconds;

								const storedSeconds = ctx.storedSeconds.reduce(
									(total, item) => total + item,
									0
								);
								return storedSeconds + e.secondsElapsed;
							},
						}),
					},
					STORE_SECONDS: {
						actions: assign({
							storedSeconds: (ctx, e) => {
								if (e.type !== 'STORE_SECONDS') return ctx.storedSeconds;

								return [...ctx.storedSeconds, ctx.totalSeconds];
							},
						}),
					},
					PAUSE: 'paused',
				},
			},
		},
	},
	{
		actions: {
			updateStarted: assign({
				started: () => new Date(),
			}),
		},
	}
);

export default timerMachine;
