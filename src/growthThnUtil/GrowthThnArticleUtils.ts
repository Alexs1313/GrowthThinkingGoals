import type {GrowthThnArticle} from '../growthThnData/GrowthThnArticleTypes';

export function growthThnGetArticleById(
  articles: GrowthThnArticle[],
  articleId: string,
): GrowthThnArticle | undefined {
  return articles.find(article => article.id === articleId);
}

export function growthThnFilterArticles(
  articles: GrowthThnArticle[],
  query: string,
): GrowthThnArticle[] {
  const growthThnQuery = query.trim().toLowerCase();
  if (!growthThnQuery) {
    return articles;
  }

  return articles.filter(article => {
    const growthThnHaystack = [
      article.title,
      article.tag,
      article.preview,
      article.emoji,
      ...article.paragraphs,
    ]
      .join(' ')
      .toLowerCase();

    return growthThnHaystack.includes(growthThnQuery);
  });
}

export function growthThnFormatArticleShareMessage(article: GrowthThnArticle): string {
  return `${article.emoji} ${article.title}\n${article.tag}\n\n${article.paragraphs.join('\n\n')}`;
}
