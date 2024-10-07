import React, { useState } from 'react';
import axios from 'axios';

interface ArticleCardProps {
  fuelType: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ fuelType }) => {
  const [price, setPrice] = useState<number | null>(null);

  const fetchPrice = async () => {
    try {
      // Example API call (replace with actual API for fuel prices)
      const response = await axios.get('https://api.example.com/fuelprices', {
        params: { fuelType }
      });
      setPrice(response.data.price); // Mock data
    } catch (error) {
      console.error('Error fetching fuel price:', error);
    }
  };

  return (
    <article className="article-card" data-glow onClick={fetchPrice}>
      <div>
        <p>{fuelType}</p>
        {price !== null ? <p>Price: ${price.toFixed(2)}</p> : <p>--</p>}
      </div>
      <span data-glow />
    </article>
  );
};

export default ArticleCard;
