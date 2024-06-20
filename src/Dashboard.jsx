import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
function Dashboard() {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [proyecto, setProyecto] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptiondas, setSelectedOptiondas] = useState(null);
  const handleStart = () => {
    setShowForm(true);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/dashboard", { withCredentials: true })
      .then((response) => {
        if (response.data.userId) {
          setUserId(response.data.userId);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/logout", null, { withCredentials: true })
      .then(() => {
        setUserId(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nombre", event.target.nombre.value);
    formData.append("imagen", event.target.imagen.files[0]);
    formData.append("opcion", event.target.opcion.value);
    formData.append("ubicacion", event.target.ubicacion.value);
    formData.append("profesional", event.target.profesional.value);
    formData.append("descripcion", event.target.descripcion.value);
    formData.append("objetivos", event.target.objetivos.value);
    formData.append("enumere", event.target.enumere.value);
    formData.append("imagen2", event.target.imagen2.files[0]);
    formData.append("planRecopilacion", selectedOption);
    formData.append("rendimientoProceso", selectedOptiondas);
    formData.append(
      "Planteamientodelproblema",
      event.target.Planteamientoproblema.value
    );
    formData.append("imagen3", event.target.imagen3.files[0]);
    formData.append("opcion2", event.target.opcion2.value);
    formData.append("objetivosanalizar", event.target.objetivosanalizar.value);
    formData.append("enumereanalizar", event.target.enumereanalizar.value);
    formData.append("fuentesvariacion", event.target.fuentesvariacion.value);
    formData.append("entradasvitales", event.target.entradasvitales.value);
    formData.append("causaproblema", event.target.causaproblema.value);
    formData.append("imagen4", event.target.imagen4.files[0]);
    formData.append("opcion3", event.target.opcion3.value);
    formData.append("userId", userId);
    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const obtenerProyectoMasReciente = async () => {
    setHasClicked(true);
    try {
      const res = await axios.get("http://localhost:3000/proyecto/" + userId);
      setProyecto(res.data);
      console.log("Proyecto más reciente:", res.data);
    } catch (error) {
      console.error("Error al obtener el proyecto más reciente:", error);
    }
  };

  useEffect(() => {
    if (hasClicked && userId) {
      obtenerProyectoMasReciente();
    }
  }, [hasClicked, userId]);

  useEffect(() => {
    if (!userId) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1000);

      // Limpia el temporizador si el componente se desmonta
      return () => clearTimeout(timer);
    }
  }, [userId, navigate]);

  return (
    <div className="flex gap-4 overflow-x-hidden bg-blue-500">
      <aside
        className={`flex flex-col justify-between w-96 ${
          !showForm ? "h-screen" : ""
        } bg-white text-blue-500 shadow-lg`}
      >
        <div className="p-4 text-center">
          <h1 className="mb-4 text-4xl">Dashboard</h1>
          <h2 className="mb-4 text-2xl">Bienvenido, usuario {userId}</h2>
        </div>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-64 px-4 py-2 text-white transition-colors duration-300 bg-blue-500 rounded hover:bg-blue-700 "
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
      <section className="text-white">
        <h1 className="py-4 text-4xl">Contenido del dashboard</h1>
        <hr className="w-screen mb-8" />
        {!showForm ? (
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-2xl font-semibold text-center text-blue-500">
              Crear nuevo proyecto
            </h2>
            <button
              onClick={handleStart}
              className="px-4 py-2 mt-4 text-white transition-colors duration-300 bg-blue-500 rounded w-80 hover:bg-blue-700"
            >
              Comenzar
            </button>
            <button
              className="px-4 py-2 mt-4 text-white transition-colors duration-300 bg-blue-500 rounded w-80 hover:bg-blue-700"
              onClick={obtenerProyectoMasReciente}
            >
              Obtener proyecto más reciente
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="text-black [&>label]:text-white [&>h4]:text-white [&>h3]:text-white [&>input]:text-white "
          >
            <div className="px-4">
              <div className="flex flex-col mb-4 [&>label]:text-white [&>h1]:text-white">
                <label htmlFor="nombre">Nombre del proyecto:</label>
                <input
                  type="text"
                  name="nombre"
                  className="w-64 h-10 mb-2 border border-gray-300 rounded"
                />
                <label htmlFor="ubicacion">Ubicacion</label>
                <input
                  type="text"
                  name="ubicacion"
                  className="w-64 h-10 mb-2 border border-gray-300 rounded"
                />
                <label htmlFor="profesional">
                  Profesional del metodo DMAIC
                </label>
                <input
                  type="text"
                  name="profesional"
                  className="w-64 h-10 mb-2 border border-gray-300 rounded"
                />
                <label htmlFor="descripcion">Realizada el</label>
                <input
                  type="date"
                  name="descripcion"
                  className="w-64 h-10 mb-2 border border-gray-300 rounded"
                />
                <label htmlFor="imagen">Imagen del proyecto:</label>
                <input type="file" accept=".jpeg, .jpg" name="imagen" />

                <h1 className="mt-4 mb-4 text-4xl font-bold">Ciclo DMAIC</h1>
                <h1 className="py-4 text-2xl fontbold">Definir</h1>
                <label htmlFor="objetivos">
                  Cuales son los objetivos del proyecto?
                </label>
                <input
                  type="text"
                  name="objetivos"
                  className="w-64 h-10 mb-2 border border-gray-300 rounded"
                />
                <label htmlFor="enumere">
                  Enumere los productos finales para los clientes (internos y
                  externos)
                </label>
                <input
                  type="text"
                  name="enumere"
                  className="w-64 h-10 mb-2 border border-gray-300 rounded"
                />
                <label htmlFor="imagen2">Imagen de Definir</label>
                <input type="file" accept=".jpeg, .jpg" name="imagen2" />

                <label htmlFor="imagendescripcion1">
                  Descripcion de la imagen
                </label>
                <select name="opcion" className="w-64 py-2">
                  <option value="Carta del proyecto (Project Charter)">
                    Carta del proyecto (Project Charter)
                  </option>
                  <option value="Matriz de la voz del cliente (VOC)">
                    Matriz de la voz del cliente (VOC)
                  </option>
                  <option value="Despliegue de funcion de la calidad (QFD)">
                    Despliegue de funcion de la calidad (QFD)
                  </option>
                  <option value="Analisis de riego">Analisis de riego</option>
                  <option value="Matriz de vianilidad del proyecto">
                    Matriz de vianilidad del proyecto
                  </option>
                  <option value="Mapa de procesos (SIPOC)">
                    Mapa de procesos (SIPOC)
                  </option>
                </select>
                <h1 className="mt-4 mb-4 text-2xl font-bold">Medida</h1>
                <label htmlFor="" className="mb-4">
                  ¿Se ha desarrollado un plan de recopilación de datos para
                  cuantificar el problema?
                </label>
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    id="si"
                    name="planRecopilacion"
                    value="si"
                    className="hidden"
                    onChange={() => setSelectedOption("si")}
                  />
                  <label
                    htmlFor="si"
                    className={`w-64 px-4 py-2 mr-2 text-center transition-colors duration-300 rounded cursor-pointer ${
                      selectedOption === "si"
                        ? "text-black bg-gray-200"
                        : "text-black bg-white"
                    } hover:bg-gray-200`}
                  >
                    Si
                  </label>
                  <input
                    type="radio"
                    id="no"
                    name="planRecopilacion"
                    value="no"
                    className="hidden"
                    onChange={() => setSelectedOption("no")}
                  />
                  <label
                    htmlFor="no"
                    className={`w-64 px-4 py-2 mr-2 text-center transition-colors duration-300 rounded cursor-pointer ${
                      selectedOption === "no"
                        ? "text-black bg-gray-200"
                        : "text-black bg-white"
                    } hover:bg-gray-200`}
                  >
                    No
                  </label>
                </div>
                <label htmlFor="">
                  ¿Se determina el rendimiento actual del proceso a través de la
                  evaluación comparativa?
                </label>
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    id="si2"
                    name="rendimientoProceso"
                    value="si"
                    className="hidden"
                    onChange={() => setSelectedOptiondas("si")}
                  />
                  <label
                    htmlFor="si2"
                    className={`w-64 px-4 py-2 mr-2 text-center transition-colors duration-300 rounded cursor-pointer ${
                      selectedOptiondas === "si"
                        ? "text-black bg-gray-200"
                        : "text-black bg-white"
                    } hover:bg-gray-200`}
                  >
                    Si
                  </label>
                  <input
                    type="radio"
                    id="no2"
                    name="rendimientoProceso"
                    value="no"
                    className="hidden"
                    onChange={() => setSelectedOptiondas("no")}
                  />
                  <label
                    htmlFor="no2"
                    className={`w-64 px-4 py-2 mr-2 text-center transition-colors duration-300 rounded cursor-pointer ${
                      selectedOptiondas === "no"
                        ? "text-black bg-gray-200"
                        : "text-black bg-white"
                    } hover:bg-gray-200`}
                  >
                    {" "}
                    No{" "}
                  </label>
                </div>
                <label htmlFor="Planteamientoproblema">
                  Planteamiento del problema
                </label>
                <input
                  type="text"
                  name="Planteamientoproblema"
                  className="w-64 h-10 mb-2 text-black border border-gray-300 rounded"
                />
                <label htmlFor="imagen3">Imagen de Medida</label>
                <input type="file" accept=".jpeg, .jpg" name="imagen3" />
                <label htmlFor="descripcion">
                  Descripcion de la imagen de Medida
                </label>
                <select name="opcion2" className="w-64 py-2">
                  <option value="Plan de recoleccion de datos">
                    Plan de recoleccion de datos
                  </option>
                  <option value="Estudios R & R ">Estudios R & R</option>
                  <option value="Estadistica Basica">Estadistica Basica</option>
                  <option value="Capacidad de proceso">
                    Capacidad de proceso
                  </option>
                  <option value="Calculos de Nivel Sigma (Z)">
                    Calculos de Nivel Sigma (Z)
                  </option>
                  <option value="Analisis graficos">Analisis graficos</option>
                  <option value="Diagramas de Pareto">
                    Diagramas de Pareto
                  </option>
                  <option value="Graficos de control">
                    Graficos de control
                  </option>
                </select>
                <h1>Analizar</h1>
                <label htmlFor="¿Cuáles son los objetivos del rendimiento?">
                  ¿Cuáles son los objetivos del rendimiento?
                </label>
                <input
                  type="text"
                  name="objetivosanalizar"
                  className="w-64 h-10 mb-2 border border-gray-300 rounded"
                />
                <label htmlFor="Identifique los pasos del proceso con valor/sin valor añadido">
                  Identifique los pasos del proceso con valor/sin valor añadido
                </label>
                <input
                  type="text"
                  name="enumereanalizar"
                  className="w-64 h-10 mb-2 border border-gray-300 rounded"
                />
                <label htmlFor="Especifique las fuentes de variación">
                  Especifique las fuentes de variación
                </label>

                <input
                  type="text"
                  name="fuentesvariacion"
                  className="w-64 h-10 mb-2 border border-gray-300 rounded"
                />
                <label htmlFor="Describa las pocas entradas vitales en relación con el producto">
                  Describa las pocas entradas vitales en relación con el
                  producto
                </label>
                <input
                  type="text"
                  name="entradasvitales"
                  className="w-64 h-10 mb-2 border border-gray-300 rounded"
                />
                <label htmlFor="Causa raíz del problema">
                  Causa raíz del problema
                </label>
                <input
                  type="text"
                  name="causaproblema"
                  className="w-64 h-10 mb-2 border border-gray-300 rounded"
                />
                <input type="file" accept=".jpeg, .jpg" name="imagen4" />
                <select name="opcion3" className="w-64 py-2">
                  <option value="Prueba de hipotesis">
                    Prueba de hipotesis
                  </option>
                  <option value="Analisis grafico">Analisis grafico</option>
                  <option value="Pruebas T">Pruebas T</option>
                  <option value="ANOVA (Analisis de varianza)">
                    ANOVA (Analisis de varianza)
                  </option>
                  <option value="Diagramas de dispersion">
                    Diagramas de dispersion
                  </option>
                  <option value="Analisis de regresion">
                    Analisis de regresion
                  </option>
                  <option value="Diseño de experimentos (DOE)">
                    Diseño de experimentos (DOE)
                  </option>
                </select>
              </div>
              <button
                type="submit"
                className="w-64 px-4 py-2 mb-8 text-black transition-colors duration-300 bg-white rounded"
              >
                Guardar
              </button>
            </div>
          </form>
        )}
        {hasClicked && (
          <div className="fixed inset-0 z-10 overflow-y-auto text-black">
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                {proyecto ? (
                  <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                    <h2 className="mb-4 text-xl font-semibold text-blue-500">
                      Proyecto más reciente
                    </h2>
                    <h3>Nombre: {proyecto.nombre}</h3>
                    <img
                      src={`data:image/jpeg;base64,${proyecto.imagen}`}
                      alt={proyecto.nombre}
                    />
                    <p>Ubicación: {proyecto.ubicacion}</p>
                    <p>Profesional: {proyecto.profesional}</p>
                    <p>Descripción: {proyecto.descripcion}</p>
                    <p>Objetivos: {proyecto.objetivos}</p>
                    <p>Enumere: {proyecto.enumere}</p>
                    <img
                      src={`data:image/jpeg;base64,${proyecto.imagen2}`}
                      alt="Imagen 2"
                    />
                    <h4>Opción: {proyecto.opcion}</h4>
                    <img
                      src={`data:image/jpeg;base64,${proyecto.imagen3}`}
                      alt="Imagen 2"
                    />
                    <img
                      src={`data:image/jpeg;base64,${proyecto.imagen4}`}
                      alt="Imagen 2"
                    />
                  </div>
                ) : (
                  <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                    <p>No hay proyectos disponibles.</p>
                  </div>
                )}
                <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setHasClicked(false); // Cierra el modal del proyecto
                      setShowPDF(true); // Abre el modal del PDF
                    }}
                  >
                    Ver PDF
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setHasClicked(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showPDF && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-800 bg-opacity-50">
            <div className="w-screen h-screen p-5 bg-white rounded">
              {" "}
              {/* Aquí se cambió el tamaño */}
              <PDFViewer width="100%" height="95%">
                <MyDocument proyecto={proyecto} />
              </PDFViewer>
              <button
                onClick={() => setShowPDF(false)}
                className="px-4 py-2 text-white bg-blue-500 rounded"
              >
                Cerrar PDF
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
