import AsyncStorage from '@react-native-async-storage/async-storage';

import type {GrowthThnDiscRecordsMap} from '../growthThnData/GrowthThnDiscTypes';

const growthThnDiscRecordsKey = 'growthThn:disc-records';

export async function growthThnLoadDiscRecords(): Promise<GrowthThnDiscRecordsMap> {
  const growthThnRaw = await AsyncStorage.getItem(growthThnDiscRecordsKey);
  if (!growthThnRaw) {
    return {};
  }
  try {
    return JSON.parse(growthThnRaw) as GrowthThnDiscRecordsMap;
  } catch {
    return {};
  }
}

export async function growthThnSaveDiscRecords(
  records: GrowthThnDiscRecordsMap,
): Promise<void> {
  await AsyncStorage.setItem(growthThnDiscRecordsKey, JSON.stringify(records));
}
