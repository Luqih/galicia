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
          <header className="header-main vh-fullH-min js-start" role="banner" style={{ height: 'auto' }}>
            <div className="header-main-bg bg-grad-royal grad-topbottom" style={{ height: '100%' }} />
            <div className="header-grid grid grid-flex-columns vh-fullH-min grid-center-vh" style={{ background: 'white', height: 'auto', paddingTop: '40px' }}>
              <Camera />
              <h2 className="coloraca" style={{ marginTop: '70px' }}>
  ¡Felicitaciones
                {' '}
                <strong className="cnaranja">Lucas</strong>
  !
              </h2>
              <p className="coloraca">Firma la solicitud y tu crédito estará en camino.</p>
              <div className="datos-final">
                <p style={{ color: 'black !important' }}>
                  <strong>Monto solicitado:</strong>
                  {' '}
  $650.000 ARS
                </p>
              </div>
              <div className="datos-final">
                <p style={{ color: 'black !important' }}>
                  <strong style={{ color: 'black !important' }}>Plazo:</strong>
                  {' '}
  60 meses
                </p>
              </div>
              <div className="datos-final">
                <p style={{ color: 'black !important' }}>
                  <strong>TEA / CFTEA:</strong>
                  {' '}
  97,46% / 126,7%
                </p>
              </div>
              <div className="datos-final">
                <p style={{ color: 'black !important' }}>
                  <strong>Cuota mensual:</strong>
                  {' '}
  $19.250
                </p>
              </div>
              <div style={{ color: 'rgb(255, 255, 255)', paddingTop: 20 }}>
                <form>
                  <input style={{ float: 'left' }} type="checkbox" className="_375ci" defaultValue="true" />
                  <label className="_23e1j" htmlFor="terms_and_conditions" name="terms_and_conditions">
                    <label>
                      <input type="checkbox" className="_375ci" defaultValue="true" />
                      <span className="coloraca prequal-form-control _1ArvV needsclick txt-final">
                        <span className="lRtQk">
                          <span className="_1N08H" />
                          <svg className="_2zqPO" xmlns="http://www.w3.org/2000/svg" width={18} height={15} viewBox="0 0 18 15" version="1.1"><polyline className="_1hNUC" points="1 8.6 5.6 13 17 2" /></svg>
                        </span>
                        Acepto los
                        {' '}
                        <a className="coloraca subrayado">términos y condiciones</a>
  ,
                        {' '}
                        <a className=" coloraca subrayado">política de privacidad</a>
  .

                      </span>

                    </label>
                  </label>
                </form>
              </div>
              <div id="signature-pad" className="signature-pad">
                <div className="signature-pad--body">
                  <canvas />
                </div>
                <div className="signature-pad--footer">
                  <div className="description">Ingrese su firma</div>
                  <div className="signature-pad--actions">
                    <div>
                      <button type="button" className="button clear btn-round js-btn-goto on" data-action="clear" style={{ height: 'auto' }}>Borrar</button>
                      <button type="button" className="button" data-action="change-color" style={{ display: 'none' }}>Change color</button>
                      <button type="button" className="button _2rNb2  NzPvF _3acyE _1SOD3 _3IhSi _2mqwJ _3rTyO _13DPj _3uPH1 yMxR2 _1xBKN" data-action="undo" style={{ display: 'none' }}>Deshacer</button>
                    </div>
                    <div>
                      <button type="button" className="button save _2rNb2  NzPvF _3acyE _1SOD3 _3IhSi _2mqwJ _3rTyO _13DPj _3uPH1 yMxR2 _1xBKN" data-action="save-png" style={{ display: 'none' }}>Guardar PNG</button>
                      <button type="button" className="button save _2rNb2  NzPvF _3acyE _1SOD3 _3IhSi _2mqwJ _3rTyO _13DPj _3uPH1 yMxR2 _1xBKN" data-action="save-jpg" style={{ display: 'none' }}>Guardar JPG</button>
                      <button type="button" className="button save btn-round js-btn-goto on">¡Solicitar! </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end header */}
          </header>
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
