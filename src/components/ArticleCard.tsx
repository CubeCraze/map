import React from 'react';

interface ArticleCardProps {
  fuelType: string;
  price: number | null;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ fuelType, price }) => {
  return (
    <article className="article-card" data-glow>
      <div>
        <p>{fuelType}</p>
        {price !== null ? <p>Price: ${price.toFixed(2)}</p> : <p>--</p>}
      </div>
      <span data-glow />
    </article>
  );
};

export default ArticleCard;
