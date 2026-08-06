import React from 'react';
import Menu from './Menu';
import logo from "../img/logo_serramuebles.png";
import "../componentes/SidebarContainer.css";
import { Link } from 'react-router-dom';

const SidebarContainer = () => {
    return (
        // os-host y os-theme-light aseguran el scroll táctil correcto en celulares sin romper la estructura
        <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ userSelect: 'none' }}>
            
            {/* Contenedor del Logotipo - Ajustado para que no se desborde */}
            <Link to={"/home"} className="brand-link d-flex flex-column align-items-center text-center py-3 border-bottom-0">
                <div className="px-3 mb-2 w-100 d-flex justify-content-center">
                    <img 
                        src={logo} 
                        className="img-fluid" 
                        alt="logo" 
                        style={{ maxWidth: '180px', height: 'auto', objectFit: 'contain' }} 
                    />
                </div>
                {/* text-truncate evita saltos de línea extraños en pantallas medianas o si la barra se colapsa */}
                <span className="brand-text font-weight-light text-truncate mt-1 text-muted" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                    Control de inventarios
                </span>
            </Link>

            {/* Cuerpo de la barra lateral */}
            <div className="sidebar px-2">
                
                {/* Panel de Navegación Rápida / Usuario */}
                <div className="user-panel mt-2 pb-2 mb-3 d-flex justify-content-center align-items-center">
                    <div className="info w-100 text-center">
                        <Link 
                            to={"/home"} 
                            className="d-block py-2 text-decoration-none rounded hover-menu-principal"
                            style={{ transition: 'all 0.2s ease' }}
                        >
                            <i className="nav-icon fas fa-th mr-2 text-info" />
                            <span className="font-weight-bold text-white text-truncate">Menú Principal</span>
                        </Link>
                    </div>
                </div>

                {/* Componente del Menú con sus enlaces de navegación */}
                <Menu />
            </div>
        </aside>
    );
}

export default SidebarContainer;
