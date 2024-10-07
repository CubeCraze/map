import React from 'react';

interface ArticleCardProps {
  imgSrc: string;
  altText: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ imgSrc, altText }) => {
  return (
    <article className="article-card" data-glow>
      <img src={imgSrc} alt={altText} className="article-image" />
      <span data-glow />
    </article>
  );
};

export default ArticleCard;
