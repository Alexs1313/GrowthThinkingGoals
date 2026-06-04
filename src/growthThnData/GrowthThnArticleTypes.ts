export type GrowthThnArticleTag =
  | 'DISCIPLINE'
  | 'NEW BEGINNINGS'
  | 'CONFIDENCE'
  | 'FOCUS'
  | 'HABITS'
  | 'MINDSET'
  | 'PROGRESS'
  | 'LOGIC'
  | 'CONSISTENCY'
  | 'GOALS'
  | 'MOTIVATION'
  | 'PRODUCTIVITY'
  | 'GROWTH'
  | 'REFLECTION'
  | 'PLANNING'
  | 'ROUTINE';

export type GrowthThnArticle = {
  id: string;
  emoji: string;
  title: string;
  tag: GrowthThnArticleTag;
  preview: string;
  paragraphs: string[];
};
