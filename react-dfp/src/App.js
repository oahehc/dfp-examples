import React from 'react';
import useDfpSlot from './useDfpSlot';

const App = () => {
  useDfpSlot({
    path: '/21737763597/adunit-1',
    size: [320, 100],
    id: 'div-gpt-ad-1559997122392-0',
  });

  return (
    <div
      id="div-gpt-ad-1559997122392-0"
      style={{ height: '100px', width: '320px' }}
    />
  );
};

export default App;
