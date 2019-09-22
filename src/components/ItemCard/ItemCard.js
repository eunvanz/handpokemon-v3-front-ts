import React, { memo } from 'react';
import { Card } from 'antd';

const ItemCard = ({ image, price, name, onClick, quantity }) => {
  return (
    <Card
      onClick={onClick}
      hoverable
      cover={
        <div style={{ padding: 6 }}>
          <img src={image} alt='아이템 이미지' style={{ width: '100%' }} />
        </div>
      }
      bodyStyle={{ textAlign: 'center', padding: 6 }}
      style={{ marginBottom: 6 }}
    >
      <h4>{name}</h4>
      {quantity && (
        <h3 className='c-primary'>X {Number(quantity).toLocaleString()}</h3>
      )}
      {!quantity && (
        <h3 className='c-primary'>{Number(price).toLocaleString()}P</h3>
      )}
    </Card>
  );
};

export default memo(ItemCard);
