import React, { ReactNode } from 'react';

import './Content.less';

const Content = ({ children }: { children: ReactNode }) => {
  return (
    <div className='hp-content'>
      {children}
      <div className='hp-footer'>made with ♥ for Pokémon®</div>
    </div>
  );
};

export default Content;
