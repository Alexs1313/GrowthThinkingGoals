import AsyncStorage from '@react-native-async-storage/async-storage';

const growthThnHabitsCompletedKey = 'growthThn:stats-habits-completed';
const growthThnArticlesReadKey = 'growthThn:stats-articles-read';

export async function growthThnLoadHabitsCompletedTotal(): Promise<number> {
  const growthThnRaw = await AsyncStorage.getItem(growthThnHabitsCompletedKey);
  return growthThnRaw ? parseInt(growthThnRaw, 10) || 0 : 0;
}

export async function growthThnIncrementHabitsCompleted(): Promise<number> {
  const growthThnCurrent = await growthThnLoadHabitsCompletedTotal();
  const growthThnNext = growthThnCurrent + 1;
  await AsyncStorage.setItem(growthThnHabitsCompletedKey, String(growthThnNext));
  return growthThnNext;
}

export async function growthThnLoadArticlesReadIds(): Promise<string[]> {
  const growthThnRaw = await AsyncStorage.getItem(growthThnArticlesReadKey);
  if (!growthThnRaw) {
    return [];
  }
  try {
    const growthThnParsed = JSON.parse(growthThnRaw) as string[];
    return Array.isArray(growthThnParsed) ? growthThnParsed : [];
  } catch {
    return [];
  }
}

export async function growthThnMarkArticleRead(articleId: string): Promise<number> {
  const growthThnIds = await growthThnLoadArticlesReadIds();
  if (growthThnIds.includes(articleId)) {
    return growthThnIds.length;
  }
  const growthThnNext = [...growthThnIds, articleId];
  await AsyncStorage.setItem(growthThnArticlesReadKey, JSON.stringify(growthThnNext));
  return growthThnNext.length;
}
