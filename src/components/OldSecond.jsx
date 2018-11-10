import React from 'react';

export default function Second () {
  return (
    <div>
      <div className="fixed-header landing">
        <nav className="navbar navbar-inverse landing" role="navigation">
          <div className="container">
            {/* Brand and toggle get grouped for better mobile display */}
            <div className="navbar-header">
              <a>
                <img src="https://svgshare.com/i/9F8.svg" className="logoCasamiento" />
              </a>
            </div>
            {/* Collect the nav links, forms, and other content for toggling */}
            <div>
              <p className="text-header hidden-xs hidden-sm">Más de 8000 proveedores en un mismo portal, encontrá todo lo que necesitás para tu casamiento.</p>
            </div>
            {/* /.navbar-collapse */}
          </div>
          {/* /.container */}
        </nav>
      </div>
      <div className="contenedor-banner-landing">
        <div className="banner-landing">
          <div className="container padding-left-none">
            <h5 className="hidden-xs">
Tu sueño es posible
              <br />
              {' '}
hacelo realidad
            </h5>
            <h5 className="hidden-sm hidden-md hidden-lg">
Tu financiamiento
              {' '}
              <br />
Galicia ahora
            </h5>
            <p className="hidden-xs">
Solicitalo 100% online!
              {' '}
              <span className="numerito" />
            </p>
            <p className="hidden-sm hidden-md hidden-lg">
Solicitalo 100% online!
              {' '}
              <span className="numerito"> (1)</span>
            </p>
          </div>
        </div>
      </div>
      {/* Full Width Image Header */}
      <div className="carousel fade-carousel slide hidden-md hidden-lg" data-ride="carousel" data-interval={4000} id="bs-carousel">
        {/* Overlay */}
        <div className="overlay" />
        {/* Indicators */}
        <ol className="carousel-indicators">
          <li data-target="#bs-carousel" data-slide-to={0} className="active" />
          <li data-target="#bs-carousel" data-slide-to={1} />
          <li data-target="#bs-carousel" data-slide-to={2} />
        </ol>
        {/* Wrapper for slides */}
        <div className="carousel-inner">
          <div className="item slides active">
            <div className="slide-1" />
            <div className="hero">
              <p>
                Tus datos estan
                {' '}
                <b>seguros!</b>
                <br />
                {' '}
consulta sin compromiso.
              </p>
            </div>
          </div>
          <div className="item slides">
            <div className="slide-2" />
            <div className="hero">
              <p>
                Llegá más rápido a tu destino
                <br />
con
                <b> Quiero Viajes.</b>
              </p>
            </div>
          </div>
          <div className="item slides">
            <div className="slide-3" />
            <div className="hero">
              <p>
                <b>Ahorros y cuotas</b>
                <br />
en las mejores marcas.
              </p>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className="fondo-slider-fijo">
        <div className="container hidden-xs hidden-sm">
          <div className="row">
            <div className="slider-fijo">
              <div className="col-sm-4">
                <div className="slider-fijo-imagen2" />
                <p>
                  Tus datos estan
                  {' '}
                  <b>seguros!</b>
                  <br />
                  consulta sin cargo, es fácil
                  <br />
                  {' '}
ágil y online.
                </p>
              </div>
              <div className="col-sm-4 padding-left-slider-80">
                <div className="slider-fijo-imagen1" />
                <p>
                  Conoce todas tus
                  {' '}
                  <br />
                  {' '}
opciones disponibles
                  <br />
                  <b>en solo segundos.</b>
                </p>
              </div>
              <div className="col-sm-4 padding-left-slider-80">
                <div className="slider-fijo-imagen3" />
                <p>
                  <b>Ahorros y cuotas</b>
                  <br />
                  {' '}
en créditos y tarjetas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form action="https://sacatutarjeta.bancogalicia.com.ar/landing/confirmar" id="FormIngreso" method="post">
        {' '}
        {/* Page Content */}
        <div className="container landing">
          <div className="content landing">
            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-12">
                  <h1 className="page-title">
                    <i className="fa fa-angle-right" />
Felicitaciones estas preaprobado!
                  </h1>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                  <div id="number-one" className="column-titles active">
                    <p className="hidden-xs empty no-line">
Tus
                      <br />
                      {' '}
Opciones
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-no-line">
                    <div className="col-xs-12 col-sm-12">
                      <div className="genero">
                        <p />
                        <br />
                        <div className="send-product">
                          <div className="row">
                            <div className="col-xs-6 padding-right-none">
                              <a name="sexos" id="sexoFemenino" href="javascript:void(0)">
                                <p data-value={1} id="femenino" className="active">Crédito</p>
                              </a>
                            </div>
                          </div>
                        </div>
                        <input className="initial-form incompleto" data-gtm="Sexo" id="Sexo" name="Sexo" type="hidden" validatewith="validarCampos" defaultValue="None" />
                      </div>
                    </div>
                    <div className="row margin-top-negative-50-desktop">
                      <div className="col-xs-12 col-sm-6 col-lg-6">
                        <div className="inputWrapper">
                          <div className="inputArea">
                            <input name="doc" data-name="La fecha" pattern="[0-9]*" maxLength={11} autoComplete="off" type="tel" id="Documento" className="initial-form incompleto form-control hidden-control numbersDots" errmsg validatewith />
                            <input className="initial-form hidden" data-gtm="Dni" id="Dni" name="Dni" type="hidden" validatewith="validarCampos" defaultValue />
                            <label htmlFor="password" className="inputLabel">Monto</label>
                            <div className="inputUnderline" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-6 col-lg-6">
                        <div className="inputWrapper">
                          <div className="inputArea">
                            <input name="doc" data-name="La fecha" pattern="[0-9]*" maxLength={11} autoComplete="off" type="tel" id="Documento" className="initial-form incompleto form-control hidden-control numbersDots" errmsg validatewith />
                            <input className="initial-form hidden" data-gtm="Dni" id="Dni" name="Dni" type="hidden" validatewith="validarCampos" defaultValue />
                            <label htmlFor="password" className="inputLabel">Período</label>
                            <div className="inputUnderline" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-6">
                        <div className="inputWrapper">
                          <div className="inputArea">
                            <input data-name="El apellido" maxLength={30} name="Apellido" type="text" id="Apellido" data-gtm="Apellido" className="form-control initial-form hidden-control alpha_spaces_enie_initialForm incompleto" errmsg="El apellido es incorrecto." autoComplete="off" validatewith="validarCampos" />
                            <label htmlFor="password" className="inputLabel">Nombre</label>
                            <div className="inputUnderline" />
                          </div>
                        </div>
                        <label id="Apellido-error" className="mensaje-error" textcontent="El apellido es inválido" htmlFor="Apellido" style={{ display: 'none' }}>
                          <i className="fa fa-exclamation-circle" />
                          {' '}
El apellido es inválido
                        </label>
                      </div>
                      <div className="col-xs-12 col-sm-6">
                        <div className="inputWrapper">
                          <div className="inputArea">
                            <input data-name="El apellido" maxLength={30} name="Apellido" type="text" id="Apellido" data-gtm="Apellido" className="form-control initial-form hidden-control alpha_spaces_enie_initialForm incompleto" errmsg="El apellido es incorrecto." autoComplete="off" validatewith="validarCampos" />
                            <label htmlFor="password" className="inputLabel">Apellido</label>
                            <div className="inputUnderline" />
                          </div>
                        </div>
                        <label id="Apellido-error" className="mensaje-error" textcontent="El apellido es inválido" htmlFor="Apellido" style={{ display: 'none' }}>
                          <i className="fa fa-exclamation-circle" />
                          {' '}
El apellido es inválido
                        </label>
                      </div>
                      <div className="clearfix" />
                      <div className="col-xs-12 col-sm-6">
                        <div className="genero">
                          <p>Sos</p>
                          <br />
                          <div className="send-product">
                            <div className="row">
                              <div className="col-xs-6 padding-right-none">
                                <a name="sexos" id="sexoFemenino" href="javascript:void(0)">
                                  <p data-value={1} id="femenino">Novio</p>
                                </a>
                              </div>
                              <div className="col-xs-6 padding-left-none">
                                <a name="sexos" href="javascript:void(0)">
                                  <p data-value={2} id="masculino">Novia</p>
                                </a>
                              </div>
                            </div>
                          </div>
                          <input className="initial-form incompleto" data-gtm="Sexo" id="Sexo" name="Sexo" type="hidden" validatewith="validarCampos" defaultValue="None" />
                        </div>
                      </div>
                      <div className="clearfix" />
                      <div className="col-xs-12 col-sm-4 col-lg-4">
                        <div className="inputWrapper">
                          <div className="inputArea">
                            <input name="FechaNac" data-name="La fecha" maxLength={61} autoComplete="off" type="tel" id="FechaNac" data-gtm="FechaNac" className="form-control incompleto initial-form hidden-control fecha " errmsg="La fecha de nacimiento es inválida." validatewith="validarCampos" />
                            <label htmlFor="password" className="inputLabel">Tu fecha de nacimiento</label>
                            <div className="inputUnderline" />
                          </div>
                          <p>
                            <strong>DD/MM/YYYY</strong>
                            {' '}
Ej: 24/02/1997
                          </p>
                        </div>
                        <label id="FechaNac-error" className="mensaje-error" textcontent="El apellido es inválido" htmlFor="Nombre" style={{ display: 'none' }}>
                          <i className="fa fa-exclamation-circle" />
                          {' '}
La fecha es inválida
                        </label>
                      </div>
                      <input className="initial-form hidden" id="DiaNac" name="DiaNac" type="hidden" validatewith="validarCampos" defaultValue />
                      <input className="initial-form hidden" id="MesNac" name="MesNac" type="hidden" validatewith="validarCampos" defaultValue />
                      <input className="initial-form hidden" id="AñoNac" name="AñoNac" type="hidden" validatewith="validarCampos" defaultValue />
                      <input className="initial-form hidden" id="Acceso" name="Acceso" type="hidden" validatewith="validarCampos" defaultValue />
                      <div className="clearfix" />
                      <div className="col-xs-12 col-sm-4 col-lg-4">
                        <div className="inputWrapper">
                          <div className="inputArea">
                            <input name="doc" data-name="La fecha" pattern="[0-9]*" maxLength={11} autoComplete="off" type="tel" id="Documento" className="initial-form incompleto form-control hidden-control numbersDots" errmsg="El número de documento es incorrecto. Ingrese solo números." validatewith="validarCampos" />
                            <input className="initial-form hidden" data-gtm="Dni" id="Dni" name="Dni" type="hidden" validatewith="validarCampos" defaultValue />
                            <label htmlFor="password" className="inputLabel">Tu DNI</label>
                            <div className="inputUnderline" />
                          </div>
                        </div>
                      </div>
                      <div className="clearfix" />
                      <div className="col-xs-12">
                        <div className="row">
                          <div className="col-xs-12 col-sm-4 col-lg-4">
                            <div className="inputWrapper">
                              <div className="inputArea">
                                <input name="Email" style={{ textTransform: 'lowercase' }} data-name="El mail" maxLength={61} autoComplete="off" type="text" id="Email" data-gtm="Email" className="initial-form incompleto form-control hidden-control mail " errmsg="La dirección de e-mail es inválida." validatewith="validarCampos" />
                                <label htmlFor="password" className="inputLabel">Tu mail</label>
                                <div className="inputUnderline" />
                              </div>
                            </div>
                            <label id="Email-error" className="mensaje-error" textcontent="El apellido es inválido" htmlFor="Email" style={{ display: 'none' }}>
                              <i className="fa fa-exclamation-circle" />
                              {' '}
El mail es inválido
                            </label>
                          </div>
                          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                            <div className="inputWrapper no-padding-left no-padding-right">
                              <div className="inputArea phone-flag">
                                <input data-name="El teléfono" name="telefono_aux" type="tel" maxLength={18} id="telefono_aux" className="initial-form incompleto form-control hidden-control telefonolanding numbers" errmsg="<strong>Formato inválido del Nro. de Teléfono:</strong></br> - Ingresá código de área y número</br> - Ej: 11 22527572<br>" autoComplete="off" validatewith="validarCampos" />
                                <input className="initial-form hidden" data-gtm="Telefono" id="Telefono" name="Telefono" type="hidden" validatewith="validarCampos" defaultValue />
                                <label htmlFor="password" className="inputLabel">Tu celular</label>
                                <div className="inputUnderline" />
                                <div className="flag" data-hj-masked />
                              </div>
                              <p>
                                <strong>Cód. área + Nro.</strong>
                                {' '}
Ej: 11 12345678
                              </p>
                            </div>
                            <label id="telefono_aux-error" className="mensaje-error" textcontent="El telefono es inválido" htmlFor="telefono_aux" style={{ display: 'none' }}>
                              <i className="fa fa-exclamation-circle" />
                              {' '}
El celular es inválido
                            </label>
                            <input className="initial-form hidden" id="CodArea" name="CodArea" type="hidden" validatewith="validarCampos" defaultValue />
                          </div>
                          <div className="clearfix" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div id="Captcha" className="col-xs-12 col-sm-12 col-md-9 col-md-offset-3 col-lg-10 col-lg-offset-3">
                  <div id="CaptchaOriginal" style={{ display: 'none' }}>
                    <span>Ingresar el código de la imagen:</span>
                    <br />
                    <div className="captcha">
                      <img id="CaptchaImage" src="https://sacatutarjeta.bancogalicia.com.ar/IngresoDatos/Generate?t=2c3b1e85a5324996b74a0b6c8e761676" />
                    </div>
                    <input id="CaptchaDeText" name="CaptchaDeText" type="hidden" defaultValue="2c3b1e85a5324996b74a0b6c8e761676" />
                    {' '}
                    <br />
                    <a href="#CaptchaImage" id="db76976d81924a1f881acb2c911171c0" onClick="______6c87a8aac63c4c2f8af2fc7841ac0515________()" style={{ display: 'none' }}>↻</a>
                    <br />
                    <br />
                    <input autoComplete="off" autoCorrect="off" data-val="true" data-val-required="Ingreso Obligatorio" id="CaptchaInputText" maxLength={8} name="CaptchaInputText" type="text" defaultValue />
                    <br />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-9 col-md-offset-3 col-lg-10 col-lg-offset-3 padding-left-none padding-right-none">
                  <div className="terms-conditions">
                    <div className="checkbox">
                      <input data-hj-masked className="initial-form checkboxs incompleto" id="TermYCond" name="TermYCond" type="checkbox" validatewith="validarCampos" />
                      <label htmlFor="TermYCond" />
                    </div>
                    <h4>
Acepto los
                      {' '}
                      <a href="javascript:void(0)" data-toggle="modal" data-target="#modalTerminos">Términos y Condiciones</a>
.
                    </h4>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-9 col-md-offset-3 col-lg-10 col-lg-offset-3">
                  <input type="button" className="btn btn-md margin-bottom-60" defaultValue="Precalificar" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="mainModalContainer" />
        <a name="Ancla" id="a" />
        <footer className="footer landing">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <a href="javascript:void(0)" style={{ cursor: 'default' }}>(1) Proceso 100% online</a>
              </div>
            </div>
            <div className="terminos-condiciones-landing" id="terminos-condiciones-landing">
              <div className="row">
                <div className="col-lg-12">
                  <p>
                    Cartera de consumo. Sujeta a previa verificación comercial, crediticia y cumplimiento de requisitos legales. Válido en el
                    país hasta el 30/11/2018. Bonificación del 100% sujeta a condiciones del convenio correspondiente y aplicable sobre los primeros
                    seis meses de vigencia desde el alta del servicio*, es decir que cada $100 el cliente se ahorra $100. A partir del séptimo
                    mes, o en caso de que el cliente tenga una antigüedad mayor a seis meses, y en caso de cumplir los requisitos, el cliente
                    podrá obtener una bonificación del: (A) 50% en el costo del Servicio Galicia vigente a ese momento, es decir que cada $100
                    el cliente se ahorra $50. Para acceder a la bonificación del 50% el cliente deberá realizar consumos mensuales con sus tarjetas
                    de crédito y/o débito Galicia. Para Eminent Black se requieren $ 25.000 de consumo mensual, Eminent Platinum o Gold $ 15.000,
                    cuenta negocios $ 12.000, prefer $ 8.000 y para clientes Classic, Total, Propia y Simple $ 4.000. ó (B) 100% en el costo
                    del servicio galicia vigente a ese momento, es decir que cada $100 el cliente se ahorra $100. Para acceder a la bonificación
                    del 100% el cliente deberá realizar consumos mensuales con sus Tarjetas de Crédito y/o Débito Galicia. Para Eminent Black
                    se requieren $ 35.000 de consumo mensual, Eminent Platinum o Gold $ 20.000, cuenta negocios $ 15.000, prefer $ 10.000 y para
                    clientes Classic, Total, Propia y Simple $ 5.000 (A) y (B) para el computo se considera la sumatoria de consumos con tarjetas
                    de crédito y débito. En tarjetas de crédito se computa a la fecha de cierre los consumos del titular y todos los adicionales
                    de la cuenta del titular en un pago, las cuotas a medida que se acrediten, los débitos automáticos y los consumos de tarjetas
                    de crédito en la moneda dólar se toman a una cotización en pesos, al tipo de cambio vendedor del banco nación del cierre
                    del mes de dicho consumo. Se excluyen los saldos financiados, cargos de resumen, cargos de renovación de tarjeta, gastos
                    de mantenimiento, intereses, adelantos en efectivo, los cargos negativos, la carga de tarjetas de regalo y el servicio de
                    asistencia al viajero. Se restan los desconocimientos o devoluciones y anulaciones de compras. En la tarjeta de débito se
                    toman los consumos realizados según mes calendario. El mes que no cumpla la condición no accede al beneficio. Los requisitos
                    para gozar del beneficio podrán variar en cualquier momento, conforme decisión del banco Galicia, lo que se notificará al
                    cliente mediante extracto, carta y/o mail. Ver comisión de mantenimiento mensual vigente en www.bancogalicia.com.ar *los
                    servicios están conformados por una cuenta corriente y/o caja de ahorros en dólar, una o más tarjetas de débito y una o más
                    tarjetas de crédito. Las cajas de ahorro no tienen costo. Consulte vigencia y condiciones en www.bancogalicia.com.ar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* Modal SMS Token */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <div id="modal-phone" className="modalAdicionalPaquete modal fade" role="dialog">
          <div className="modal-dialog phone-code">
            {/* Modal content */}
            <div className="modal-content">
              <div className="modal-header small">
                <button type="button" className="close" data-dismiss="modal">×</button>
                <h4 className="modal-title">
Validación de
                  {' '}
                  <b>celular</b>
                </h4>
              </div>
              <div id="seccion-telefono" style={{ display: 'none' }}>
                <div className="modal-body">
                  <div className="col-xs-12">
                    <h3>Verificá que tu número de teléfono sea correcto.</h3>
                    <p>A este número te enviaremos un SMS para confirmar tu identidad.</p>
                  </div>
                  <div className="col-xs-12">
                    <div className="row">
                      <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
                        <div className="inputWrapper">
                          <div id="inputTelefonoToken" className="inputArea phone-flag">
                            <input autoComplete="off" className="initial-form incompleto form-control hidden-control telefonolanding numbers incompleto" errmsg="<strong>Formato inválido del Nro. de Teléfono:</strong></br> - Ingresá código de área y número</br> - Ej: 11 22527572<br>" id="telefonoToken" maxLength={18} name="TelefonoToken" pattern="[0-9]*" type="tel" validatewith="validarCampos" defaultValue />
                            <label htmlFor="password" className="inputLabel">Tu celular</label>
                            <div className="inputUnderline" />
                            <div className="flag" data-hj-masked />
                          </div>
                          <p>Ej: 11 55889823</p>
                          <label id="telefonoToken-error" className="mensaje-error" textcontent="El telefono es inválido" htmlFor="telefonoToken" style={{ display: 'none' }}>
                            <i className="fa fa-exclamation-circle" />
                            {' '}
El celular es inválido
                          </label>
                          <input className="initial-form hidden" id="codAreaToken" name="CodArea" type="hidden" validatewith="validarCampos" defaultValue />
                        </div>
                      </div>
                      <div id="divCompania" className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <div className="ui-widget">
                          <select id="cmbCompania" name="CompaniasTelefono" validatewith="validarCampos">
                            <option value={1}>Movistar</option>
                            <option value={2}>Claro</option>
                            <option value={3}>Personal</option>
                            <option value={4}>Nextel</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <b id="descripcionErrorValidacion" />
                  </div>
                  <div className="clearfix" />
                  <div className="modal-footer">
                    <button type="button" className="btn btn-xs" onClick="EnviarToken()">Confirmar</button>
                  </div>
                </div>
              </div>
              <div id="seccion-codigo" style={{ display: 'none' }}>
                <div className="modal-body">
                  <div className="col-xs-12">
                    <h3>Ingresá el código que te enviamos por SMS.</h3>
                    <p id="telefonoIngresado" />
                  </div>
                  <div className="col-xs-1 margin-bottom-0 padding-right-none">
                    <div className="inputWrapper margin-top-0">
                      <div className="inputArea open" id="inputAreaUno">
                        <input type="tel" style={{ textSecurity: 'disc', WebkitTextSecurity: 'disc' }} id="handleUno" autoCapitalize="none" className="form-control text-align-center handlesInput" maxLength={1} onKeyDown="return tab_btn(event,this.name);" onKeyUp="return ValidarBotonFinalizar()" onClick="    QuitarFoco(this.name)" />
                        <div className="inputUnderline" />
                      </div>
                      <div className="extraInfo">
                        {' '}
                        <span id="extraMessage" />
                        {' '}
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-1 margin-bottom-0 padding-right-none">
                    <div className="inputWrapper margin-top-0">
                      <div className="inputArea open" id="inputAreaDos">
                        <input type="tel" style={{ textSecurity: 'disc', WebkitTextSecurity: 'disc' }} id="handleDos" autoCapitalize="none" className="form-control text-align-center" maxLength={1} onKeyDown="return tab_btn(event,this.name);" onKeyUp="return ValidarBotonFinalizar()" onClick="    QuitarFoco(this.name)" />
                        <div className="inputUnderline" />
                      </div>
                      <div className="extraInfo">
                        {' '}
                        <span id="extraMessage" />
                        {' '}
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-1 margin-bottom-0 padding-right-none">
                    <div className="inputWrapper margin-top-0">
                      <div className="inputArea open" id="inputAreaTres">
                        <input type="tel" style={{ textSecurity: 'disc', WebkitTextSecurity: 'disc' }} id="handleTres" autoCapitalize="none" className="form-control text-align-center" maxLength={1} onKeyDown="return tab_btn(event,this.name);" onKeyUp="return ValidarBotonFinalizar()" onClick="    QuitarFoco(this.name)" />
                        <div className="inputUnderline" />
                      </div>
                      <div className="extraInfo">
                        {' '}
                        <span id="extraMessage" />
                        {' '}
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-1 margin-bottom-0 padding-right-none">
                    <div className="inputWrapper margin-top-0">
                      <div className="inputArea open" id="inputAreaCuatro">
                        <input type="tel" style={{ textSecurity: 'disc', WebkitTextSecurity: 'disc' }} id="handleCuatro" autoCapitalize="none" className="form-control text-align-center" onKeyDown="return tab_btn(event,this.name);" maxLength={1} onKeyUp="return ValidarBotonFinalizar()" onClick="    QuitarFoco(this.name)" />
                        <div className="inputUnderline" />
                      </div>
                      <div className="extraInfo">
                        {' '}
                        <span id="extraMessage" />
                        {' '}
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-1 margin-bottom-0 padding-right-none">
                    <h3 className="phone-code-number" id="PrimerNumeroToken" />
                  </div>
                  <div className="col-xs-1 margin-bottom-0 padding-right-none padding-left-none">
                    <h3 className="phone-code-number" id="SegundoNumeroToken" />
                  </div>
                  <div className="col-xs-9">
                    <b id="descripcionError" />
                    <br />
                    <br />
                    <b id="leyendaSms" />
                    <br />
                    <a href="#" id="reenviar-sms" style={{ display: 'none' }} onClick="EnviarToken()">Reenviar SMS</a>
                    <p id="mensaje-espera" style={{ display: 'none' }}>
Espera
                      {' '}
                      <span className="color-orange" id="countbox1" />
                      {' '}
segundos
                    </p>
                  </div>
                  <div className="clearfix" />
                </div>
                <div className="modal-footer">
                  <button type="button" id="FinalizarToken" onClick="ValidarToken()" className="btn btn-xs" disabled>Finalizar</button>
                  <button type="button" id="btn-editarTelefono" className="btn btn-xs editarTelefono" onClick="ObtenerCliente()">Editar teléfono</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </form>
      <style dangerouslySetInnerHTML={{ __html: '\n    #signup .text:focus {\n        outline: 0px;\n    }\n' }} />
      {/* Modal terminos */}
      <div id="modalTerminos" className="modal fade modalAdicionalPaquete" role="dialog">
        <div className="modal-dialog additional">
          {/* Modal content */}
          <div className="modal-content">
            <div className="modal-header small">
              <button type="button" className="close" data-dismiss="modal">×</button>
              <h4 className="modal-title padding-left-none">Términos y condiciones</h4>
            </div>
            <div className="modal-body">
              <div className="scroll-text">
                <p>La presente propuesta para solicitar productos de Banco Galicia por este medio, estará vigente desde el día 01/04/2018 al día 30/11/2018 y como tal está sujeta al cumplimiento de los requisitos comerciales y legales que para cada caso sean aplicables. En ningún caso se entenderá que el simple hecho de participar de la misma implica obligación alguna para el banco de otorgar producto alguno. Asimismo, es imprescindible que quien participe de la misma brinde la totalidad de los datos aquí requeridos, y que los mismos sean correctos, completos y veraces, que quien lo hace sea el titular de esos datos y que acepte  los presentes términos y condiciones. Si faltan datos o no se aceptan  los presentes términos y condiciones no será posible avanzar y se desestimará la participación. La aceptación de la presente  implicará sin lugar a objeción en contrario, que el participante de la misma acepta brindar sus datos a Banco Galicia, garantiza que los datos brindados son de su titularidad y que los mismos serán utilizados por esta entidad al solo efecto de la solicitud que efectúe y no serán utilizados para nada mas, ni serán compartidos en modo alguno con terceros. El titular de los datos admite expresamente que la presente cumple los requisitos de los artículos 5, y 8 de la Ley 25.326, y que los datos recabados son necesarios a los efectos de que el Banco analice la solicitud de productos que pueda efectuar el participante. La Ley de Protección de los Datos Personales (Ley N° 25.326) es una norma de orden público que regula la actividad de las bases de datos que registran información de carácter personal. Su objeto es garantizar a las personas el control del uso de sus datos personales. El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis (6) meses, salvo que se acredite un interés legítimo al efecto conforme lo establecido en el artículo 14, inciso 3 de la Ley Nº 25.326. La DIRECCION NACIONAL DE PROTECCIÓN DE DATOS PERSONALES, Órgano de Control de la Ley Nº 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las normas sobre protección de datos personales. Banco Galicia asume el carácter de Responsable Registrado ya que ha cumplimentado con todos los requisitos de licitud que exige esta ley, que es regulada por la Dirección Nacional de Protección de Datos Personales. Para poder continuar te efectuaremos una serie de preguntas, las cuáles son obligatorias, y ante la falta de respuesta o la incorrección en las mismas, no te será posible avanzar. En caso de solicitar productos se te pedirá que indiques un domicilio de recepción para los mismos. De ser aprobados y otorgados por el Banco para efectivizar la entrega en el domicilio declarado, los productos deberán ser recibidos por quién efectuó la solicitud con presentación de DNI en original y fotocopia. Y además allí se te pedirá que suscribas la documentación correspondiente.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-xs" data-dismiss="modal">Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
