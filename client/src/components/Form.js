import React, { useState } from "react";
import ReactExport from "react-export-excel";
import Header from './Header'
import "./form.css";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// FUNCION PARA VALIDAR FORMULARIO
function validarForm(input) {
  let error = {};
  if (!input.nombre) {
    error.nombre = "Escribe un nombre, es un campo obligatorio";
  }
  if (!input.apellido) {
    error.apellido = "Escribe un apellido, es un campo obligatorio";
  }
  if (!input.correo) {
    error.correo = "Escribe un correo, es un campo obligatorio";
  }
  if (!input.telefono || input.telefono.length < 10) {
    error.telefono = "Escribe un telefono válido, es un campo obligatorio";
  }
  if (!input.direccion) {
    error.direccion = "Escribe una direccion, es un campo obligatorio";
  }

  return error;
}
function Form() {
  // STATE PARA EL FORMULARIO
  const datos = [];
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    correo: '',
    telefono: '',
  });
  const[enable, setEnable] = useState(0)

  function handleOnChange(e) {
    e.preventDefault();

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validarForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setEnable(1)
   
  }

  function pushear(e) {
    if (Object.keys(errors).length === 0) {
      e.preventDefault();
      datos.push(input);
      console.log(datos);
    } else {
      alert("No se puede guardar los datos, existen errores");
    }
  }

  return (
    <div>
      <Header/>
      <form>
        <div className="cont">
          <label>Nombre</label>
          <div className="cont-interno">
            <input
              type="text"
              name="nombre"
              value={input.nombre}
              onChange={(e) => handleOnChange(e)}
            />
            {errors.nombre && <p className="errores">{errors.nombre}</p>}
          </div>
        </div>
        <div className="cont">
          <label>Apellido</label>
          <div className="cont-interno">
            <input
              type="text"
              name="apellido"
              value={input.apellido}
              onChange={(e) => handleOnChange(e)}
            />
            {errors.apellido && <p className="errores">{errors.apellido}</p>}
          </div>
        </div>
        <div className="cont">
          <label>Dirección</label>
          <div className="cont-interno">
            <input
              type="text"
              name="direccion"
              value={input.direccion}
              onChange={(e) => handleOnChange(e)}
            />
            {errors.direccion && <p className="errores">{errors.direccion}</p>}
          </div>
        </div>
        <div className="cont">
          <label>Correo Electronico</label>
          <div className="cont-interno">
            <input
              type="email"
              name="correo"
              value={input.correo}
              onChange={(e) => handleOnChange(e)}
            />
            {errors.correo && <p className="errores">{errors.correo}</p>}
          </div>
        </div>
        <div className="cont">
          <label>Numero de Teléfono</label>
          <div className="cont-interno">
            <input
              type="tel"
              name="telefono"
              pattern="[0-9]{10}"
              value={input.telefono}
              onChange={(e) => handleOnChange(e)}
            />
            {errors.telefono && <p className="errores">{errors.telefono}</p>}
          </div>
        </div>
        {Object.keys(errors).length > 0 || enable === 0 ? (
          <ExcelFile
            className="boton-descarga"
            element={<button disabled> Descargar Excel</button>}
          />
        ) : (
          <ExcelFile
            className="boton-descarga"
            element={<button onClick={pushear}> Descargar Excel</button>} filename='Formulario'>
            <ExcelSheet data={datos}  name='formulario' >
              <ExcelColumn  label="Nombre" value="nombre" />
              <ExcelColumn label="Apellido" value="apellido" />
              <ExcelColumn label="Direccion" value="direccion" />
              <ExcelColumn label="Correo" value="correo" />
              <ExcelColumn label="Telefono" value="telefono" />
            </ExcelSheet>
          </ExcelFile>
        )}
      </form>
    </div>
  );
}

export default Form;
