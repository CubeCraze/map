import React from 'react';

interface ArticleCardProps {
  fuelType: string;
  price: number | null;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ fuelType, price }) => {
  return (
    <article className="article-card" data-glow>
      <div>
        <p className="fuel-type">{fuelType}</p>
        {price !== null ? <p className="price">Price: ${price.toFixed(2)}</p> : <p className="price">--</p>}
      </div>
      <span data-glow />
    </article>
  );
};

export default ArticleCard;

