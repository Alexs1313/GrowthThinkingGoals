import React, {useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {growthThnImages} from '../growthThnAssts';
import {growthThnArticles} from '../growthThnData/GrowthThnArticleData';
import type {GrowthThnArticle} from '../growthThnData/GrowthThnArticleTypes';
import type {GrowthThnArticlesStackParamList} from '../growthThnNav/GrowthThnArticlesStackTypes';
import {
  growthThnFilterArticles,
  growthThnFormatArticleShareMessage,
} from '../growthThnUtil/GrowthThnArticleUtils';
import {
  growthThnColors,
  growthThnMetrics,
} from '../growthThnThm/GrowthThnTheme';

export function GrowthThnArticlesListScreen() {
  const navigation =
    useNavigation<StackNavigationProp<GrowthThnArticlesStackParamList>>();
  const insets = useSafeAreaInsets();
  const [growthThnSearch, setGrowthThnSearch] = useState('');

  const growthThnFiltered = useMemo(
    () => growthThnFilterArticles(growthThnArticles, growthThnSearch),
    [growthThnSearch],
  );

  const growthThnOnShare = async (article: GrowthThnArticle) => {
    try {
      await Share.share({
        message: growthThnFormatArticleShareMessage(article),
      });
    } catch {}
  };

  return (
    <View style={styles.growthThnRoot}>
      <LinearGradient
        colors={[
          growthThnColors.backgroundGradientStart,
          growthThnColors.backgroundGradientEnd,
        ]}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView
        contentContainerStyle={[
          styles.growthThnScroll,
          {
            paddingTop: insets.top + 8,
            paddingBottom: insets.bottom + growthThnMetrics.tabHeight + 24,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.growthThnTitle}>Growth Articles</Text>
        <Text style={styles.growthThnSubtitle}>
          Read ideas that move you forward.
        </Text>

        <View style={styles.growthThnSearchWrap}>
          <Image source={require('../growthThnAssts/search.png')} />
          <TextInput
            value={growthThnSearch}
            onChangeText={setGrowthThnSearch}
            placeholder="Search articles..."
            placeholderTextColor={growthThnColors.textPlaceholder}
            style={styles.growthThnSearchInput}
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </View>

        {growthThnFiltered.length === 0 ? (
          <View style={styles.growthThnEmptyCard}>
            <Text style={styles.growthThnEmptyText}>
              No articles match your search.
            </Text>
          </View>
        ) : (
          growthThnFiltered.map(article => (
            <View key={article.id} style={styles.growthThnCard}>
              <View style={styles.growthThnTag}>
                <Text style={styles.growthThnTagText}>{article.tag}</Text>
              </View>
              <Text style={styles.growthThnCardTitle}>
                {article.emoji} {article.title}
              </Text>
              <Text style={styles.growthThnCardPreview}>{article.preview}</Text>
              <View style={styles.growthThnCardDivider} />
              <View style={styles.growthThnCardActions}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('ArticleDetail', {
                      articleId: article.id,
                    })
                  }
                  style={styles.growthThnReadBtn}>
                  <Text style={styles.growthThnReadIcon}>📖</Text>
                  <Text style={styles.growthThnReadText}>Read Article</Text>
                </Pressable>
                <Pressable
                  onPress={() => growthThnOnShare(article)}
                  style={styles.growthThnShareBtn}>
                  <Image
                    source={growthThnImages.share}
                    style={styles.growthThnShareIcon}
                  />
                  <Text style={styles.growthThnShareText}>Share</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnRoot: {flex: 1},
  growthThnScroll: {
    paddingHorizontal: growthThnMetrics.screenPadding,
    gap: 16,
  },
  growthThnTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: growthThnColors.text,
  },
  growthThnSubtitle: {
    fontSize: 14,
    color: growthThnColors.textMuted,
    marginBottom: 4,
  },
  growthThnSearchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: growthThnColors.panel,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    paddingHorizontal: 14,
    height: 48,
  },
  growthThnSearchIcon: {
    fontSize: 18,
    color: growthThnColors.textMutedDark,
    fontWeight: '600',
  },
  growthThnSearchInput: {
    flex: 1,
    fontSize: 15,
    color: growthThnColors.text,
    paddingVertical: 0,
  },
  growthThnEmptyCard: {
    backgroundColor: growthThnColors.panel,
    borderRadius: growthThnMetrics.cardRadius,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    padding: 28,
    alignItems: 'center',
  },
  growthThnEmptyText: {
    color: growthThnColors.textMuted,
    fontSize: 15,
    textAlign: 'center',
  },
  growthThnCard: {
    backgroundColor: growthThnColors.panel,
    borderRadius: growthThnMetrics.cardRadius,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    padding: 16,
    gap: 10,
  },
  growthThnTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#3d2810',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: growthThnColors.borderStrong,
  },
  growthThnTagText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: growthThnColors.accentYellow,
  },
  growthThnCardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: growthThnColors.text,
    lineHeight: 24,
  },
  growthThnCardPreview: {
    fontSize: 14,
    lineHeight: 20,
    color: growthThnColors.textMuted,
  },
  growthThnCardDivider: {
    height: 1,
    backgroundColor: growthThnColors.border,
    marginTop: 2,
  },
  growthThnCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  growthThnReadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  growthThnReadIcon: {fontSize: 16},
  growthThnReadText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#C41500',
  },
  growthThnShareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  growthThnShareIcon: {
    width: 18,
    height: 18,
    tintColor: growthThnColors.tabIdle,
  },
  growthThnShareText: {
    fontSize: 14,
    fontWeight: '600',
    color: growthThnColors.tabIdle,
  },
});
