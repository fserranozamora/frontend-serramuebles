import React, {Fragment} from "react";
import { BrowserRouter as Router,Route,Routes,Navigate } from "react-router-dom";
import Login from "./paginas/auth/Login";
import Registro from "./paginas/auth/Registro";
import Home from "./Home";
import MostrarHerramientas from "./paginas/modulos/herramientas/MostrarHerramientas";
import AgregarHerramientas from "./paginas/modulos/herramientas/AgregarHerramientas";
import EditarHerramientas from "./paginas/modulos/herramientas/EditarHerramientas";
import MostrarInsumos from "./paginas/modulos/insumos/MostrarInsumos";
import AgregarInsumos from "./paginas/modulos/insumos/AgregarInsumos";
import EditarInsumos from "./paginas/modulos/insumos/EditarInsumos";
import MostrarMateriales from "./paginas/modulos/materiales/MostrarMateriales";
import AgregarMateriales from "./paginas/modulos/materiales/AgregarMateriales";
import EditarMateriales from "./paginas/modulos/materiales/EditarMateriales";
import RutasProtegidas from "./paginas/auth/RutasProtegidas";

function App() {
  return (
    <div className="App">
      <Fragment>
        <Router>
          <Routes>
            <Route path="/" element ={<Navigate to = "/login"/>}></Route>
            <Route path="/login" exact element ={<Login/>}></Route>
            <Route path="/Registro" exact element ={<Registro/>}></Route>
            <Route path="/home" exact element ={<RutasProtegidas element={<Home/>}/>}></Route>
            <Route path="/herramientas" exact element ={<RutasProtegidas element={<MostrarHerramientas/>}/>}></Route>
            <Route path="/herramientas/agregar" exact element ={<RutasProtegidas element={<AgregarHerramientas/>}/>}></Route>
            <Route path="/herramientas/editar/:id" exact element ={<RutasProtegidas element={<EditarHerramientas/>}/>}></Route>
            <Route path="/insumos" exact element ={<RutasProtegidas element={<MostrarInsumos/>}/>}></Route>
            <Route path="/insumos/agregar" exact element ={<RutasProtegidas element={<AgregarInsumos/>}/>}></Route>
            <Route path="/insumos/editar/:id" exact element ={<RutasProtegidas element={<EditarInsumos/>}/>}></Route>
            <Route path="/materiales" exact element ={<RutasProtegidas element={<MostrarMateriales/>}/>}></Route>
            <Route path="/materiales/agregar" exact element ={<RutasProtegidas element={<AgregarMateriales/>}/>}></Route>
            <Route path="/materiales/editar/:id" exact element ={<RutasProtegidas element={<EditarMateriales/>}/>}></Route>
          </Routes>
        </Router>
      </Fragment>
    </div>
  );
}

export default App;
