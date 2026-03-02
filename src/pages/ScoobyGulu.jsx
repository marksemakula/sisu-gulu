import React from 'react';

const ScoobyGulu = () => {
  return (
    <iframe
      src="/sisu-theme/sisu-gulu-index.html"
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
        display: 'block'
      }}
      title="Scoobydoo International School Uganda (SISU) - Gulu Campus"
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock"
    />
  );
};

export default ScoobyGulu;
