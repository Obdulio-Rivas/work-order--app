import React from "react";
import {
  Link
} from "react-router-dom";

export const Navigation = () => {
  return (
    <>
      <nav className={"navbar navbar-expand-lg navbar-light bg-light px-4"}>
        <Link className="navbar-brand" to="/">
          Work Orders App
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/newWorkOrder">
                Nueva Orden
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/workOrders">
                Lista Ordenes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/newClient">
                Nuevo Cliente
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/newEmployee">
                Nuevo Empleado
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/test">
                Test
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
