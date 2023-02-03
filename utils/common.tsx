export function orderAlphabetically(channels: Array<{ name: string }> = []): Array<{ name: string }> {
  return channels.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
}