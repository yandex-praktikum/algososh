export async function wait (ms: number): Promise<void> {
    const wait: Promise<null> = new Promise((res, rej) => {
        setTimeout(() => {
            res(null);
        }, ms)
    });

    await wait;
}

export function isMore(testValue: number, curValue: number): boolean {
    return testValue > curValue;
  }


  export function isLess(testValue: number, curValue: number): boolean {
    return testValue < curValue;
  }