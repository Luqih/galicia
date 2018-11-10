import React from 'react';
import styled from 'styled-components';

import Camera from './Camera';

const Wrapper = styled.div`
.coloraca{color: #474747!important;}
.cnaranja {color: #ff6600;}
.js-btn-goto { cursor: pointer; background-color: #f60!important; color: #fff!important;}
.signature-pad--body { border: 1pt solid #ff6600!important;}
`;

export default function Third () {
  return (
    <Wrapper>
      <nav id="nav-main" className="pricing" role="navigation" aria-label="Site">
        <div className="nav-main-block">
          <h1 style={{ width: '400px!important', left: '40%' }}>
            <a href="#" data-title-home="Gueno" data-url="home">
              <img
                src="http://tars.agency/gueno/galicia/images/logoGalicia.svg"
                height="50"
                style={{ marginRight: 'auto', marginLeft: 'auto', width: '200px' }}
              />
              {' '}
            </a>
          </h1>
        </div>
        <h2 className="coloraca" style={{ marginTop: '85px', marginBottom: '15px', textAlign: 'center' }}>
          <strong className="cnaranja">Lucas</strong>
          {' '}
          necesitamos validar tu identidad
        </h2>
        <p style={{ textAlign: 'center' }}>
          Por favor, sacá una foto del frente de tu DNI
        </p>
      </nav>
      <nav id="nav-main-mobile" className="pricing" role="navigation" aria-label="Site">
        <div className="nav-main-wrapper grid-center-vh">
          <div className="nav-site-wrapper grid-center-vh" />
        </div>
      </nav>
      <main className="page-main page-current" role="main">
        <div className="page-toload pricing" data-url="pricing">
          <Camera />
          {/* preload stuff */}
          <div className="preload" aria-hidden="true">
            {/* end preload */}
          </div>
          {/* end page-toload of page-main */}
        </div>
      </main>
    </Wrapper>
  );
}
