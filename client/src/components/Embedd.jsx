import React, { useEffect } from 'react';

const GistEmbed = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://gist.github.com/Muasa-harman/f867f78af89247ab16d6d2781865582a.js';
    script.async = true;

    document.getElementById('gist-container').appendChild(script);
    
    // Cleanup the script when the component unmounts
    return () => {
      document.getElementById('gist-container').innerHTML = '';
    };
  }, []);

  return (
    <div>
      <h3>Embedded Gist in React</h3>
      <div id="gist-container"></div>
    </div>
  );
};

export default GistEmbed;
