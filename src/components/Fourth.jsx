import React from 'react';

export default function Fourth () {
  return (
    <div>
      <nav id="nav-main" className="pricing" role="navigation" aria-label="Site">
        <div className="nav-main-block">
          <h1 style={{ width: '400px!important', left: '40%' }}>
            <a href="#" data-title-home="Gueno" data-url="home">
              <img
                src="http://tars.agency/gueno/galicia/firma/assets/img/logos.png"
                height="93"
                style={{ marginRight: 'auto', marginLeft: 'auto', width: '400px' }}
              />
              {' '}
            </a>
          </h1>
        </div>
      </nav>
      <nav id="nav-main-mobile" className="pricing" role="navigation" aria-label="Site">
        <div className="nav-main-wrapper grid-center-vh">
          <div className="nav-site-wrapper grid-center-vh" />
        </div>
      </nav>
      {/* ============= CONTENT ============= */}
      <main className="page-main page-current" role="main">
        <div className="page-toload pricing" data-url="pricing">
          <header className="header-main vh-fullH-min js-start" role="banner" style={{ height: 'auto' }}>
            <div className="header-main-bg bg-grad-royal grad-topbottom" style={{ height: '100%' }} />
            <div className="header-grid grid grid-flex-columns vh-fullH-min grid-center-vh" style={{ background: 'white', height: 'auto', marginTop: '-10px' }}>
              <h2 className="coloraca" style={{ marginTop: '0px' }}>
                {' '}
                <strong className="cnaranja" style={{ color: '#ff6600' }}>Aprobado</strong>
              </h2>
              <p className="coloraca" style={{ color: '#474747', marginTop: '0px' }}>Lucas, recibirás toda la información en breve, chequea tu casilla de mail.</p>
              <div className="datos-final">
                <p>
                  <strong>Monto aprobado:</strong>
                  {' '}
$650.000 ARS
                </p>
              </div>
              <div className="datos-final">
                <img
                  className="qr"
                  src="http://tars.agency/gueno/galicia/images/qr.png"
                  width="160px"
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}
                />
              </div>
              <div className="datos-final">
                <p className="cambio">
                  <strong className="cnaranja">Banco Galicia:</strong>
                  {' '}
Onlinebanking y App
                </p>
              </div>
              <div className="datos-final">
                <img
                  src="http://tars.agency/gueno/galicia/images/app.png"
                  className="disponibles"
                  width="200px"
                  style={{ display: 'inline-block' }}
                />
                {' '}
                <img
                  src="http://tars.agency/gueno/galicia/images/play.png"
                  className="disponibles"
                  width="200px"
                  style={{ display: 'inline-block' }}
                />
              </div>
              <div className="datos-final">
                <div className="logoGalicia" style={{ marginLeft: 'auto', marginRight: 'auto' }}>&nbsp;</div>
              </div>
            </div>
          </header>

        </div>
        {/* end header */}
        {/* preload stuff */}
        <div className="preload" aria-hidden="true">
          {/* end preload */}
        </div>
        {/* end page-toload of page-main */}
      </main>
    </div>
  );
}
