import React, { useState, useEffect } from "react";
import { getWorkOrders } from "../../services/getWorkOrders";
import { Link } from "react-router-dom";

export const WorkOrders = () => {
  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    getWorkOrders()
      .then((res) => {
        setWorkOrders(res.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <table className={"table mt-3"}>
        <thead>
          <tr>
            <th># Orden</th>
            <th>Servicio</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {workOrders.map((workOrder) => (
            <tr key={workOrder.id_work_order}>
              <td>{workOrder.id_work_order}</td>
              <td>{workOrder.service_name}</td>
              <td>${workOrder.total_payment}</td>
              <td>{workOrder.state}</td>
              <td>
                <Link to={`/printWorkOrder/${workOrder.id_work_order}`}>Imprimir</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
