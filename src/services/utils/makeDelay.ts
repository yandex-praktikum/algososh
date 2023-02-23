export const makeDelay = (time: number) => new Promise<void>(
    resolve => setTimeout(resolve, time)
);