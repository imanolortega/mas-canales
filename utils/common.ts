import { Channel } from "./types";

export function orderAlphabetically(channels: Array<{ name: string }> = []): Array<{ name: string }> {
  return channels.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
}

export function updateChannels(localeStorageData: Channel[], updatedData: Channel[]) {
  for (let i = 0; i < localeStorageData.length; i++) {
    for (let j = 0; j < updatedData.length; j++) {
      if (localeStorageData[i].name === updatedData[j].name && localeStorageData[i].type === updatedData[j].type) {
        localeStorageData[i].id = updatedData[j].id;
      }
    }
  }
  return localeStorageData;
}