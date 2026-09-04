import React from 'react';

const Footer = () => {
    return (
        /* 
          - flex-column flex-md-row: Apila verticalmente en móviles y separa a los extremos en PC de forma limpia.
          - text-center text-md-left: Centra los textos en pantallas pequeñas y los alinea a la izquierda en monitores grandes.
          - py-3 px-3: Colchón interno simétrico para que los textos respiren y no toquen las líneas del cuadro.
        */
        <footer className="main-footer d-flex flex-column flex-md-row justify-content-md-between align-items-center text-center text-md-left py-3 px-3">
            
            {/* Sección de Copyright con tus datos reales */}
            <div className="mb-2 mb-md-0">
                <strong>Copyright &copy; 2026 - Laboratorios Serrano S.A.S.</strong>
                {/* Un pequeño texto complementario estándar opcional para equilibrar el diseño en smartphones */}
                <span className="text-muted small d-block d-sm-inline ml-sm-1">Todos los derechos reservados.</span>
            </div>

            {/* Sección de Versión: Centrada abajo en móviles y a la extrema derecha en laptops/PC */}
            <div className="text-muted">
                <b>Version</b> 1.0.10
            </div>
            
        </footer>
    );
}

export default Footer;
