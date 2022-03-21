export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const onClick = async () => {
  console.log('started')
  await sleep(2000)
  console.log('finished')
}
