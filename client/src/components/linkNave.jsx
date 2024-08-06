import React from 'react';
import { Link } from 'react-router-dom';

const LinksComponent = () => {
  return (
    <nav>
      <ul>
        <li><Link to={url}>{icon}</Link></li>
      
      </ul>
    </nav>
  );
};

export default LinksComponent;
