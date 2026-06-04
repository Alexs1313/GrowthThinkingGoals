import React, {useEffect, useMemo} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {growthThnImages} from '../growthThnAssts';
import {growthThnArticles} from '../growthThnData/GrowthThnArticleData';
import type {GrowthThnArticlesStackParamList} from '../growthThnNav/GrowthThnArticlesStackTypes';
import {growthThnMarkArticleRead} from '../growthThnStrg/GrowthThnStatsStorage';
import {
  growthThnFormatArticleShareMessage,
  growthThnGetArticleById,
} from '../growthThnUtil/GrowthThnArticleUtils';
import {
  growthThnColors,
  growthThnMetrics,
} from '../growthThnThm/GrowthThnTheme';

export function GrowthThnArticleDetailScreen() {
  const navigation =
    useNavigation<StackNavigationProp<GrowthThnArticlesStackParamList>>();
  const route =
    useRoute<RouteProp<GrowthThnArticlesStackParamList, 'ArticleDetail'>>();
  const insets = useSafeAreaInsets();

  const growthThnArticle = useMemo(
    () => growthThnGetArticleById(growthThnArticles, route.params.articleId),
    [route.params.articleId],
  );

  useEffect(() => {
    growthThnMarkArticleRead(route.params.articleId);
  }, [route.params.articleId]);

  const growthThnOnShare = async () => {
    if (!growthThnArticle) {
      return;
    }
    try {
      await Share.share({
        message: growthThnFormatArticleShareMessage(growthThnArticle),
      });
    } catch {
      // user dismissed
    }
  };

  if (!growthThnArticle) {
    return (
      <View style={[styles.growthThnRoot, {paddingTop: insets.top + 16}]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.growthThnBack}>
          <Text style={styles.growthThnBackText}>‹ Back</Text>
        </Pressable>
        <Text style={styles.growthThnMissing}>Article not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.growthThnRoot}>
      <ScrollView
        contentContainerStyle={[
          styles.growthThnScroll,
          {
            paddingTop: insets.top + 8,
            paddingBottom: insets.bottom + growthThnMetrics.tabHeight + 40,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.growthThnBack}>
          <Text style={styles.growthThnBackText}>‹ Back</Text>
        </Pressable>

        <View style={styles.growthThnTag}>
          <Text style={styles.growthThnTagText}>{growthThnArticle.tag}</Text>
        </View>

        <Text style={styles.growthThnTitle}>
          {growthThnArticle.emoji} {growthThnArticle.title}
        </Text>

        {growthThnArticle.paragraphs.map((paragraph, index) => (
          <Text
            key={`growth-thn-article-p-${growthThnArticle.id}-${index}`}
            style={styles.growthThnParagraph}>
            {paragraph}
          </Text>
        ))}

        <Pressable
          onPress={growthThnOnShare}
          style={styles.growthThnShareButton}>
          <Image
            source={growthThnImages.share}
            style={styles.growthThnShareIcon}
          />
          <Text style={styles.growthThnShareLabel}>Share Article</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnRoot: {
    flex: 1,
    backgroundColor: '#000000',
  },
  growthThnScroll: {
    paddingHorizontal: growthThnMetrics.screenPadding,
    gap: 16,
  },
  growthThnBack: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
  growthThnBackText: {
    color: growthThnColors.accentGold,
    fontSize: 16,
    fontWeight: '600',
  },
  growthThnTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#3d2810',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: growthThnColors.borderStrong,
    marginTop: 4,
  },
  growthThnTagText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: growthThnColors.accentYellow,
  },
  growthThnTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: growthThnColors.text,
    lineHeight: 32,
  },
  growthThnParagraph: {
    fontSize: 16,
    lineHeight: 26,
    color: growthThnColors.textMuted,
  },
  growthThnShareButton: {
    height: 52,
    marginTop: 8,
    borderRadius: growthThnMetrics.buttonRadius,
    backgroundColor: growthThnColors.panel,
    borderWidth: 1,
    borderColor: growthThnColors.borderStrong,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  growthThnShareIcon: {
    width: 20,
    height: 20,
    tintColor: growthThnColors.accentGold,
  },
  growthThnShareLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: growthThnColors.accentGold,
  },
  growthThnMissing: {
    color: growthThnColors.textMuted,
    fontSize: 16,
    marginTop: 24,
    paddingHorizontal: growthThnMetrics.screenPadding,
  },
});
