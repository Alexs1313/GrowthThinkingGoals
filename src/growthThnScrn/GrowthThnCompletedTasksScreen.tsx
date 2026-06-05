import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {growthThnImages} from '../growthThnAssts';
import {useGrowthThnTasks} from '../growthThnCtx/GrowthThnTasksContext';
import {
  growthThnFormatCompletedAt,
  growthThnFormatTimer,
} from '../growthThnUtil/GrowthThnTimeUtils';
import {
  growthThnColors,
  growthThnMetrics,
} from '../growthThnThm/GrowthThnTheme';

export function GrowthThnCompletedTasksScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {completedTasks} = useGrowthThnTasks();

  const growthThnTotalLabel =
    completedTasks.length === 1
      ? '1 task completed in total'
      : `${completedTasks.length} tasks completed in total`;

  const growthThnOnShare = async (title: string, focusedSeconds: number) => {
    try {
      await Share.share({
        message: `${title}\nFocus time: ${growthThnFormatTimer(
          focusedSeconds,
        )}`,
      });
    } catch {}
  };

  return (
    <View style={styles.growthThnRoot}>
      <ScrollView
        contentContainerStyle={[
          styles.growthThnScroll,
          {
            paddingTop: insets.top + 8,
            paddingBottom: insets.bottom + 52,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.growthThnBack}>
          <Text style={styles.growthThnBackText}>‹ Back</Text>
        </Pressable>

        <Text style={styles.growthThnTitle}>Completed Tasks</Text>
        <Text style={styles.growthThnSubtitle}>{growthThnTotalLabel}</Text>

        {completedTasks.length === 0 ? (
          <View style={styles.growthThnEmpty}>
            <Text style={styles.growthThnEmptyTitle}>
              No completed tasks yet
            </Text>
            <Text style={styles.growthThnEmptySub}>
              Finish a daily challenge to see it here.
            </Text>
          </View>
        ) : (
          completedTasks.map(item => (
            <View key={item.id} style={styles.growthThnCard}>
              <View style={styles.growthThnCardTop}>
                <Text style={styles.growthThnCardTitle}>{item.title}</Text>
                <Pressable
                  onPress={() =>
                    growthThnOnShare(item.title, item.focusedSeconds)
                  }
                  style={styles.growthThnShareBtn}
                  hitSlop={8}>
                  <Image
                    source={growthThnImages.share}
                    style={styles.growthThnShareIcon}
                  />
                </Pressable>
              </View>
              <View style={styles.growthThnMetaRow}>
                <Text style={styles.growthThnMetaIcon}>🕐</Text>
                <Text style={styles.growthThnMeta}>
                  {growthThnFormatTimer(item.focusedSeconds)} ·{' '}
                  {growthThnFormatCompletedAt(item.completedAt)}
                </Text>
              </View>
            </View>
          ))
        )}
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
    fontSize: 16,
    fontWeight: '600',
    color: growthThnColors.accentGold,
  },
  growthThnTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: growthThnColors.text,
    marginTop: 4,
  },
  growthThnSubtitle: {
    fontSize: 14,
    color: growthThnColors.textMuted,
    marginBottom: 8,
  },
  growthThnEmpty: {
    backgroundColor: growthThnColors.panel,
    borderRadius: growthThnMetrics.cardRadius,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    padding: 24,
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  growthThnEmptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: growthThnColors.text,
  },
  growthThnEmptySub: {
    fontSize: 14,
    color: growthThnColors.textMuted,
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
  growthThnCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  growthThnCardTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: growthThnColors.text,
  },
  growthThnShareBtn: {
    padding: 4,
  },
  growthThnShareIcon: {
    width: 20,
    height: 20,
    tintColor: growthThnColors.accentGold,
  },
  growthThnMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  growthThnMetaIcon: {
    fontSize: 12,
  },
  growthThnMeta: {
    fontSize: 13,
    color: growthThnColors.textMuted,
    fontVariant: ['tabular-nums'],
  },
});
