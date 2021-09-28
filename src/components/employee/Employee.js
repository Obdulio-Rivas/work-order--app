import React, { useState } from "react";
import { postEmployee } from "../../services/postEmployee";
import { Input } from "../form/Input";
import { Select } from "../form/Select";

const initialEmployee = {
  name: "",
  lastname: "",
  DUI: "",
  NIT: "",
  salary: 0,
  employee_rol: 0,
};

const employee_rol = [
  {
    id_employee_rol: 1,
    rol: "Tornero",
  },
  {
    id_employee_rol: 2,
    rol: "Soldador",
  },
];

export const Employee = () => {

  const [employee, setEmployee] = useState(initialEmployee);
  const [message, setMessage] = useState('');

  const handlerInputChange = (e) => {
    const { name, value, pattern } = e.target;
    const regex = new RegExp(pattern);
    if (regex.test(value)) {
      setEmployee({
        ...employee,
        [name]: value,
      });
    }
  };

  const handlerOnSubmit = (e) => {
    e.preventDefault();
    postEmployee(employee).then((res) => {
      setMessage(res.message)
      setEmployee(initialEmployee);
    });
  };

  const handlerOnClear = (e) => {
    e.preventDefault();
    setEmployee(initialEmployee);
  };

  return (
    <>
      <form className={'mt-3'} onSubmit={handlerOnSubmit}>
        <h2>Registrar Empleado</h2>
        <div className={"form-group"}>
          <Input
            label={"Nombre:"}
            type={"text"}
            name={"name"}
            value={employee.name}
            pattern={"^[a-zA-Z_ ]*$"}
            placeholder={"Nombre del empleado..."}
            handlerInputChange={handlerInputChange}
          />
          <Input
            label={"Apellido:"}
            type={"text"}
            name={"lastname"}
            value={employee.lastname}
            pattern={"^[a-zA-Z_ ]*$"}
            placeholder={"Apellido del empleado..."}
            handlerInputChange={handlerInputChange}
          />
          <Input
            label={"DUI:"}
            type={"text"}
            name={"DUI"}
            value={employee.DUI}
            pattern={"^[0-9]{1,8}[-][0-9]?$"}
            placeholder={"DUI del empleado..."}
            handlerInputChange={handlerInputChange}
          />
          <Input
            label={"NIT:"}
            type={"text"}
            name={"NIT"}
            value={employee.NIT}
            pattern={"^[a-zA-Z_ ]*$"}
            placeholder={"NIT del empleado..."}
            handlerInputChange={handlerInputChange}
          />
        </div>
        <div className={"form-group"}>
          <Input
            label={"Salario:"}
            type={"number"}
            name={"salary"}
            value={employee.salary}
            pattern={"^[0-9]+([.][0-9]{1,2})?$"}
            placeholder={"0.00"}
            handlerInputChange={handlerInputChange}
          />
        </div>
        <div className={"form-group"}>
          <Select
            label={"Rol del empleado:"}
            name={"employee_rol"}
            defaultValue={0}
            defaultOption={"Seleccione una opcion"}
            handlerInputChange={handlerInputChange}
          >
            {employee_rol.map(({ id_employee_rol, rol }) => (
              <option
                key={id_employee_rol}
                value={rol}
              >{`${rol}`}</option>
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
