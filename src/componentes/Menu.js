import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return ( 
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                        <i className="nav-icon fas fa-home" />
                        <p>
                            Inicio
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/herramientas"} className="nav-link">
                        <i className="nav-icon fas fa-check" />
                        <p>
                            Herramientas
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/insumos"} className="nav-link">
                        <i className="nav-icon fas fa-check" />
                        <p>
                            Insumos
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/materiales"} className="nav-link">
                        <i className="nav-icon fas fa-check" />
                        <p>
                            Materiales
                        </p>
                    </Link>
                </li>
            </ul>
        </nav>
     );
}
 
export default Menu;