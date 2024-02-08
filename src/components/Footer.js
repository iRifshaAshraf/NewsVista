import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(props) {
  return (
    <footer className={`bg-dark text-white text-center py-1`} style={{ position: 'fixed', left: 0, bottom: 0, width: '100%' }}>
      <div>
        &copy; 2024 NewsVista. All rights reserved. <br/>
         Developed by{' '}
        <Link to={{ pathname: 'https://github.com/iRifshaAshraf' }} style={{textDecoration: 'none', fontWeight:'bold', color:'#ccc'}}>
          Rifsha Ashraf.
        </Link>
      </div>
    </footer>
  );
}
