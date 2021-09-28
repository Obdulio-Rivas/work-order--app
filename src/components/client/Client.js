import React, { useState, useEffect } from "react";
import { getMunicipalities } from "../../services/getMunicipalities";
import { getDepartments } from "../../services/getDepartments";
import { postClient } from "../../services/postClient";
import { Input } from "../form/Input";
import { Select } from "../form/Select";

const initialClient = {
  name: "",
  lastname: "",
  DUI: "",
  NIT: "",
  address: "",
  id_municipality: 0,
  id_department: 0,
  registry_number: "",
  company_type: 0,
};

const company_types = [
  {
    id_company_type: 1,
    company_type: "Tipo 1",
  },
  {
    id_company_type: 2,
    company_type: "Tipo 2",
  },
];

export const Client = () => {

  const [client, setClient] = useState(initialClient);
  const [municipalities, setMunicipalities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getDepartments().then((res)=>{
      setDepartments(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    getMunicipalities().then((res)=>{
      setMunicipalities(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const handlerInputChange = (e) => {
    const { name, value, pattern } = e.target;
    const regex = new RegExp(pattern);
    if (regex.test(value)) {
      setClient({
        ...client,
        [name]: value,
      });
    }
  };

  const handlerOnSubmit = (e) => {
    e.preventDefault();
    postClient(client).then((res) => {
      setMessage(res.message)
      setClient(initialClient);
    });
  };

  const handlerOnClear = (e) => {
    e.preventDefault();
    setClient(initialClient);
  };

  return (
    <>
      <form className={'mt-3'} onSubmit={handlerOnSubmit}>
        <h2>Registrar Cliente</h2>
        <div className={"form-group"}>
          <Input
            label={"Nombre:"}
            type={"text"}
            name={"name"}
            value={client.name}
            pattern={"^[a-zA-Z_ ]*$"}
            placeholder={"Nombre del empleado..."}
            handlerInputChange={handlerInputChange}
          />
          <Input
            label={"Apellido:"}
            type={"text"}
            name={"lastname"}
            value={client.lastname}
            pattern={"^[a-zA-Z_ ]*$"}
            placeholder={"Apellido del empleado..."}
            handlerInputChange={handlerInputChange}
          />
          <Input
            label={"DUI:"}
            type={"text"}
            name={"DUI"}
            value={client.DUI}
            pattern={"^[0-9]*$"}
            placeholder={"DUI"}
            handlerInputChange={handlerInputChange}
          />
          <Input
            label={"NIT:"}
            type={"text"}
            name={"NIT"}
            value={client.NIT}
            pattern={"^[0-9]*$"}
            placeholder={"NIT"}
            handlerInputChange={handlerInputChange}
          />
          <Input
            label={"Direccion:"}
            type={"text"}
            name={"address"}
            value={client.address}
            pattern={"^[a-zA-Z ]*$"}
            placeholder={"Direccion del cliente..."}
            handlerInputChange={handlerInputChange}
          />
          <Select
            label={"Municipio:"}
            name={"id_municipality"}
            defaultValue={0}
            defaultOption={"Seleccione una opcion"}
            handlerInputChange={handlerInputChange}
          >
            {municipalities.map(({ id_municipality, municipality }) => (
              <option
                key={id_municipality}
                value={id_municipality}
              >{`${municipality}`}</option>
            ))}
          </Select>
          <Select
            label={"Departamento:"}
            name={"id_department"}
            defaultValue={0}
            defaultOption={"Seleccione una opcion"}
            handlerInputChange={handlerInputChange}
          >
            {departments.map(({ id_department, department }) => (
              <option
                key={id_department}
                value={id_department}
              >{`${department}`}</option>
            ))}
          </Select>
          <Input
            label={"Numero de registro:"}
            type={"text"}
            name={"registry_number"}
            value={client.registry_number}
            pattern={"^[0-9]*$"}
            placeholder={"Numero de registro..."}
            handlerInputChange={handlerInputChange}
          />
          <Select
            label={"Rubro:"}
            name={"company_type"}
            defaultValue={0}
            defaultOption={"Seleccione una opcion"}
            handlerInputChange={handlerInputChange}
          >
            {company_types.map(({ id_company_type, company_type }) => (
              <option
                key={id_company_type}
                value={id_company_type}
              >{`${company_type}`}</option>
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
