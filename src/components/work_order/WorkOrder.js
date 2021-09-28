import React, { useEffect, useState } from "react";
import { getGroupOrder } from "../../helpers/getGroupOrder";
import { getClients } from "../../services/getClients";
import { getEmployees } from "../../services/getEmployees";
import { getUsers } from "../../services/getUsers";
import { postWorkOrder } from "../../services/postWorkOrder";
import { Input } from "../form/Input";
import { Select } from "../form/Select";

const initialWorkOrder = {
  group_order: getGroupOrder(),
  service_name: "",
  description_service: "",
  observation_service: "",
  total_payment: 0,
  advance_payment: 0,
  remaining_payment: 0,
  id_method_payment: 0,
  id_user: 0,
  id_employee: 0,
  id_client: 0,
};

const method_payment = [
  {
    id_method_payment: 0,
    method_payment: "Efectivo",
  },
  {
    id_method_payment: 1,
    method_payment: "Cheque",
  },
];

export const WorkOrder = () => {
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);

  const [workOrder, setWorkOrder] = useState(initialWorkOrder);
  const [message, setMessage] = useState('');

  const handlerInputChange = (e) => {
    const { name, value, pattern } = e.target;
    const regex = new RegExp(pattern);
    if (regex.test(value)) {
      setWorkOrder({
        ...workOrder,
        [name]: value,
      });
    }
  };

  const handlerOnSubmit = (e) => {
    e.preventDefault();
    postWorkOrder(workOrder).then((res) => {
      setMessage(res.message)
      setWorkOrder(initialWorkOrder);
    });
  };

  const handlerOnClear = (e) => {
    e.preventDefault();
    setWorkOrder(initialWorkOrder);
  };

  useEffect(() => {
    setWorkOrder((workOrder) => {
      return {
        ...workOrder,
        remaining_payment: workOrder.total_payment - workOrder.advance_payment,
      };
    });
  }, [workOrder.total_payment, workOrder.advance_payment]);

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getEmployees()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getClients()
      .then((res) => {
        setClients(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <form className={'mt-3'} onSubmit={handlerOnSubmit}>
        <h2>Crear Orden de Trabajo</h2>
        <div className={"form-group"}>
          <Input
            label={"Orden de grupo:"}
            type={"text"}
            name={"group_order"}
            value={workOrder.group_order}
            disabled={true}
            placeholder={"00-2021"}
            handlerInputChange={handlerInputChange}
          />
          <Input
            label={"Servicio:"}
            type={"text"}
            name={"service_name"}
            value={workOrder.service_name}
            pattern={"^[a-zA-Z_ ]*$"}
            placeholder={"Nombre del servicio..."}
            handlerInputChange={handlerInputChange}
          />
          <Input
            label={"Descripcion:"}
            type={"text"}
            name={"description_service"}
            value={workOrder.description_service}
            pattern={"^[a-zA-Z0-9_, ]*$"}
            placeholder={"Descripcion del servicio..."}
            handlerInputChange={handlerInputChange}
          />
          <Input
            label={"Observacion:"}
            type={"text"}
            name={"observation_service"}
            value={workOrder.observation_service}
            pattern={"^[a-zA-Z0-9_, ]*$"}
            placeholder={"Observacion del servicio..."}
            handlerInputChange={handlerInputChange}
          />
        </div>
        <div className={"form-group"}>
          <Input
            label={"Precio:"}
            type={"number"}
            name={"total_payment"}
            value={workOrder.total_payment}
            pattern={"^[0-9]+([.][0-9]{1,2})?$"}
            placeholder={"0.00"}
            handlerInputChange={handlerInputChange}
          />
          <Input
            label={"Adelanto:"}
            type={"number"}
            name={"advance_payment"}
            value={workOrder.advance_payment}
            pattern={"^[0-9]+([.][0-9]{1,2})?$"}
            placeholder={"0.00"}
            handlerInputChange={handlerInputChange}
          />
          <Input
            label={"Restante:"}
            type={"number"}
            name={"remaining_payment"}
            value={workOrder.remaining_payment}
            pattern={"^[0-9]+([.][0-9]{1,2})?$"}
            disabled={true}
            placeholder={"0.00"}
            handlerInputChange={handlerInputChange}
          />
        </div>
        <div className={"form-group"}>
          <Select
            label={"Forma de pago:"}
            name={"id_method_payment"}
            defaultValue={0}
            defaultOption={"Seleccione una opcion"}
            handlerInputChange={handlerInputChange}
          >
            {method_payment.map(({ id_method_payment, method_payment }) => (
              <option
                key={id_method_payment}
                value={id_method_payment}
              >{`${method_payment}`}</option>
            ))}
          </Select>
          <Select
            label={"Usuario:"}
            name={"id_user"}
            defaultValue={0}
            defaultOption={"Seleccione una opcion"}
            handlerInputChange={handlerInputChange}
          >
            {users.map(({ id_user, name, lastname }) => (
              <option
                key={id_user}
                value={id_user}
              >{`${name} ${lastname}`}</option>
            ))}
          </Select>
          <Select
            label={"Empleado:"}
            name={"id_employee"}
            defaultValue={0}
            defaultOption={"Seleccione una opcion"}
            handlerInputChange={handlerInputChange}
          >
            {employees.map(({ id_employee, name, lastname }) => (
              <option
                key={id_employee}
                value={id_employee}
              >{`${name} ${lastname}`}</option>
            ))}
          </Select>
          <Select
            label={"Cliente:"}
            name={"id_client"}
            defaultValue={0}
            defaultOption={"Seleccione una opcion"}
            handlerInputChange={handlerInputChange}
          >
            {clients.map(({ id_client, name, lastname }) => (
              <option
                key={id_client}
                value={id_client}
              >{`${name} ${lastname}`}</option>
            ))}
          </Select>
        </div>
        <div className={'form-group'}>
        <small id="passwordHelpBlock" className="form-text text-muted">
          {message}
        </small>
        </div>
        <div className={"form-group mt-3 mb-3"}>
          <button className={'btn btn-primary m-2'} type="submit">Registrar</button>
          <button className={'btn btn-primary'} onClick={handlerOnClear}>Limpiar</button>
        </div>
      </form>
    </>
  );
};
