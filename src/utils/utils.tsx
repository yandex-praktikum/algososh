import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../constants/delays"

export const waitForMe = (delay: number = DELAY_IN_MS): Promise<null> => {
  return new Promise(resolve => {
    setTimeout(() => {resolve(null)}, delay)
  })
}
