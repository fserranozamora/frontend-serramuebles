import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Menu = () => {
    // Inicializa la navegación de React Router
    const navigate = useNavigate();
    // useLocation nos permite saber en qué página estamos para iluminar el botón activo
    const location = useLocation();

    // 🌟 CONTROL RESPONSIVE TOTAL: Oculta el menú, libera el Navbar y elimina el overlay al cambiar de ruta
    useEffect(() => {
        const body = document.querySelector('body');
        
        // Detectar si estamos en celular o tablet (Pantallas menores a 992px)
        if (window.innerWidth < 992 && body) {
            
            // Remover las clases que mantienen el menú encima bloqueando la vista
            body.classList.remove('sidebar-open');
            body.classList.add('sidebar-collapse');
            body.classList.add('sidebar-closed');

            // ⚠️ ELIMINAR EL OVERLAY: Borramos la capa oscura de AdminLTE que congela el Navbar y la página
            const overlay = document.getElementById('sidebar-overlay');
            if (overlay) {
                overlay.remove(); 
            }
        }
    }, [location.pathname]); // Se ejecuta instantáneamente cada vez que cambias de página

    // Función para limpiar el almacenamiento y redireccionar
    const cerrarSesion = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Función auxiliar para añadir la clase 'active' (Tolerante a subrutas de editar/agregar)
    const checkActive = (ruta) => {
        return location.pathname.startsWith(ruta) ? "active" : "";
    };

    return ( 
        // nav-sidebar y nav-flat controlan la estética y evitan desbordamientos en pantallas pequeñas
        <nav className="mt-2 px-2" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 60px)' }}>
            <ul 
                className="nav nav-pills nav-sidebar flex-column nav-flat nav-child-indent" 
                data-widget="treeview" 
                role="menu" 
                data-accordion="false"
            >
                {/* Opción: Inicio con Icono de Casa */}
                <li className="nav-item">
                    <Link to={"/home"} className={`nav-link ${checkActive("/home")}`}>
                        <i className="nav-icon fas fa-home text-muted" />
                        <p className="text-truncate">Inicio</p>
                    </Link>
                </li>

                {/* Opción: Herramientas */}
                <li className="nav-item">
                    <Link to={"/herramientas"} className={`nav-link ${checkActive("/herramientas")}`}>
                        <i className="nav-icon fas fa-tools text-success" />
                        <p className="text-truncate">Herramientas</p>
                    </Link>
                </li>

                {/* Opción: Insumos */}
                <li className="nav-item">
                    <Link to={"/insumos"} className={`nav-link ${checkActive("/insumos")}`}>
                        <i className="nav-icon fas fa-box text-warning" />
                        <p className="text-truncate">Insumos</p>
                    </Link>
                </li>

                {/* Opción: Materiales */}
                <li className="nav-item">
                    <Link to={"/materiales"} className={`nav-link ${checkActive("/materiales")}`}>
                        <i className="nav-icon fas fa-brush text-info" />
                        <p className="text-truncate">Materiales</p>
                    </Link>
                </li>

                {/* Separador visual para computadoras y pantallas táctiles */}
                <li className="nav-header border-top my-2 pt-2 text-truncate" style={{ fontSize: '1.0rem' }}>
                    CUENTA
                </li>

                {/* Botón de cerrar sesión integrado */}
                <li className="nav-item">
                    <span 
                        onClick={cerrarSesion} 
                        className="nav-link text-truncate" 
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                        <i className="nav-icon fas fa-sign-out-alt text-truncate" />
                        <p className="text-truncate">Salir</p>
                    </span>
                </li>
            </ul>
        </nav>
    );
}
 
export default Menu;
