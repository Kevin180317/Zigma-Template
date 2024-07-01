import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import toast, { Toaster } from "react-hot-toast";
function Dashboard() {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [proyecto, setProyecto] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [showPDF, setShowPDF] = useState(false);

  const cancelForm = () => {
    setShowForm(false);
  };
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
    formData.append(
      "posiblesSoluciones",
      event.target.posiblesSoluciones.value
    );

    formData.append("imagen5", event.target.imagen5.files[0]);
    formData.append("opcion4", event.target.opcion4.value);
    formData.append("userId", userId);
    formData.append(
      "sistemaSeguimiento",
      event.target.sistemaSeguimiento.value
    );

    formData.append("planTransferencia", event.target.planTransferencia.value);

    formData.append("imagen6", event.target.imagen6.files[0]);
    formData.append("opcion5", event.target.opcion5.value);
    formData.append("recomendaciones", event.target.recomendaciones.value);
    formData.append(
      "controlarcompletado",
      event.target.controlarcompletado.value
    );
    formData.append("mejorarcompletado", event.target.mejorarcompletado.value);
    formData.append(
      "analizarcompletado",
      event.target.analizarcompletado.value
    );
    formData.append("medidacompletado", event.target.medidacompletado.value);
    formData.append("definircompletado", event.target.definircompletado.value);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        setShowForm(false),
        toast.success("Proyecto creado con éxito"),

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      toast.error(
        "Error al subir la imagen, sube una imagen con capacidad menor a 150 kilobytes (KB) equivalen a 0.15 megabytes (MB)."
      );
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
    <div className="flex gap-4 px-8 overflow-x-hidden bg-blue-500 ">
      <aside
        className={`hidden md:block flex flex-col justify-between w-96 ${
          !showForm ? "h-screen" : ""
        } bg-white text-blue-500 shadow-lg`}
      >
        <div className="p-4 text-center">
          <h1 className="mb-4 text-4xl">Dashboard</h1>
          <h2 className="mb-4 text-2xl">Bienvenido, usuario {userId}</h2>
        </div>
        <div className="p-4 ">
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
        <button
          onClick={handleLogout}
          className="block w-64 px-4 py-2 mb-4 text-black transition-colors duration-300 bg-white rounded hover:bg-white md:hidden "
        >
          Cerrar sesión
        </button>
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
            className="text-black [&>label]:text-white [&>h4]:text-white [&>h3]:text-white [&>textarea
                              cols={30}
                  rows={3}]:text-white "
          >
            <div className="px-4">
              <div className="flex flex-col mb-4 [&>label]:text-white [&>h1]:text-white w-96">
                <label htmlFor="nombre">Nombre del proyecto:</label>
                <textarea
                  type="text"
                  name="nombre"
                  cols={30}
                  rows={3}
                  className="mb-2 border border-gray-300 rounded w-96"
                />
                <label htmlFor="ubicacion">Ubicacion</label>
                <textarea
                  type="text"
                  name="ubicacion"
                  cols={30}
                  rows={3}
                  className="mb-2 border border-gray-300 rounded w-96"
                />
                <label htmlFor="profesional">
                  Profesional del metodo DMAIC
                </label>
                <textarea
                  cols={30}
                  rows={3}
                  type="text"
                  name="profesional"
                  className="mb-2 border border-gray-300 rounded w-96"
                />
                <label htmlFor="descripcion">Realizada el</label>
                <textarea
                  cols={30}
                  rows={3}
                  type="date"
                  name="descripcion"
                  className="mb-2 border border-gray-300 rounded w-96"
                  min={
                    new Date(new Date().setHours(0, 0, 0, 0))
                      .toISOString()
                      .split("T")[0]
                  }
                />
                <label htmlFor="imagen">Imagen del proyecto:</label>
                <input
                  className="mb-4"
                  type="file"
                  accept=".jpeg, .jpg"
                  name="imagen"
                />

                <hr />
                <h1 className="py-4 text-4xl font-bold">Definir</h1>
                <label htmlFor="objetivos">
                  Cuales son los objetivos del proyecto?
                </label>
                <textarea
                  cols={30}
                  rows={3}
                  type="text"
                  name="objetivos"
                  className="mb-2 border border-gray-300 rounded w-96"
                />
                <label htmlFor="enumere">
                  Enumere los productos finales para los clientes (internos y
                  externos)
                </label>
                <textarea
                  cols={30}
                  rows={3}
                  type="text"
                  name="enumere"
                  className="mb-2 border border-gray-300 rounded w-96"
                />
                <label htmlFor="imagen2">Imagen de Definir</label>
                <input type="file" accept=".jpeg, .jpg" name="imagen2" />

                <label htmlFor="imagendescripcion1">
                  Descripcion de la imagen
                </label>
                <select name="opcion" className="py-2 mb-4 w-96">
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
                <label
                  htmlFor="
                  definircompletado
                "
                >
                  ¿El modulo esta completado?
                </label>
                <select
                  className="py-2 mb-4 w-96"
                  name="definircompletado"
                  id="definircompletado"
                >
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </select>
                <hr />

                <h1 className="mt-4 mb-4 text-4xl font-bold">Medida</h1>

                <label htmlFor="Planteamientoproblema">
                  Planteamiento del problema
                </label>
                <textarea
                  cols={30}
                  rows={3}
                  type="text"
                  name="Planteamientoproblema"
                  className="mb-2 text-black border border-gray-300 rounded w-96"
                />
                <label htmlFor="imagen3">Imagen de Medida</label>
                <input type="file" accept=".jpeg, .jpg" name="imagen3" />
                <label htmlFor="descripcion">
                  Descripcion de la imagen de Medida
                </label>
                <select name="opcion2" className="py-2 mb-4 w-96">
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
                <label
                  htmlFor="
                  medidacompletado
                "
                >
                  ¿El modulo esta completado?
                </label>
                <select
                  className="py-2 mb-4 w-96"
                  name="medidacompletado"
                  id="medidacompletado"
                >
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </select>
                <hr />
                <h1 className="mb-2 text-4xl font-bold">Analizar</h1>
                <label htmlFor="¿Cuáles son los objetivos del rendimiento?">
                  ¿Cuáles son los objetivos del rendimiento?
                </label>
                <textarea
                  cols={30}
                  rows={3}
                  type="text"
                  name="objetivosanalizar"
                  className="mb-2 border border-gray-300 rounded w-96"
                />
                <label htmlFor="Identifique los pasos del proceso con valor/sin valor añadido">
                  Identifique los pasos del proceso con valor/sin valor añadido
                </label>
                <textarea
                  cols={30}
                  rows={3}
                  type="text"
                  name="enumereanalizar"
                  className="mb-2 border border-gray-300 rounded w-96"
                />
                <label htmlFor="Especifique las fuentes de variación">
                  Especifique las fuentes de variación
                </label>

                <textarea
                  cols={30}
                  rows={3}
                  type="text"
                  name="fuentesvariacion"
                  className="mb-2 border border-gray-300 rounded w-96"
                />
                <label htmlFor="Describa las pocas entradas vitales en relación con el producto">
                  Describa las pocas entradas vitales en relación con el
                  producto
                </label>
                <textarea
                  cols={30}
                  rows={3}
                  type="text"
                  name="entradasvitales"
                  className="mb-2 border border-gray-300 rounded w-96"
                />
                <label htmlFor="Causa raíz del problema">
                  Causa raíz del problema
                </label>
                <textarea
                  cols={30}
                  rows={3}
                  type="text"
                  name="causaproblema"
                  className="mb-2 border border-gray-300 rounded w-96"
                />
                <input type="file" accept=".jpeg, .jpg" name="imagen4" />
                <label htmlFor="opcion3">Opcion de Analizar</label>
                <select name="opcion3" className="py-2 mb-4 w-96">
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
                <label
                  htmlFor="
                  analizarcompletado
                "
                >
                  ¿El modulo esta completado?
                </label>
                <select
                  className="py-2 mb-4 w-96"
                  name="analizarcompletado"
                  id="analizarcompletado"
                >
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </select>
                <hr />

                <h1 className="mb-2 text-4xl font-bold">Mejorar</h1>

                <label htmlFor="posiblesSoluciones">Posibles soluciones:</label>
                <textarea
                  cols={30}
                  rows={3}
                  type="text"
                  id="posiblesSoluciones"
                  name="posiblesSoluciones"
                  className="mb-2 border border-gray-300 rounded w-96"
                />

                <input type="file" accept=".jpeg, .jpg" name="imagen5" />
                <label htmlFor="opcion4">Opcion de Mejorar</label>
                <select name="opcion4" className="py-2 mb-4 w-96">
                  <option value="DOE">DOE</option>
                  <option value="Seleccion de soluciones">
                    Seleccion de soluciones
                  </option>
                  <option value="Planes piloto">Planes piloto</option>
                  <option value="Metodos Lean">Metodos Lean</option>
                  <option value="FMEA (Analisis de modo y efectos de falla)">
                    FMEA (Analisis de modo y efectos de falla)
                  </option>
                  <option value="Analisis costo - beneficio">
                    Analisis costo - beneficio
                  </option>
                </select>
                <label
                  htmlFor="
                  mejorarcompletado
                "
                >
                  ¿El modulo esta completado?
                </label>
                <select
                  className="py-2 mb-4 w-96"
                  name="mejorarcompletado"
                  id="mejorarcompletado"
                >
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </select>
                <hr />

                <h1 className="mb-2 text-4xl font-bold">Controlar</h1>

                <label htmlFor="sistemaSeguimiento">
                  ¿Cuál es el sistema de seguimiento y control establecido?
                </label>
                <textarea
                  cols={30}
                  rows={3}
                  type="text"
                  id="sistemaSeguimiento"
                  name="sistemaSeguimiento"
                  className="mb-2 border border-gray-300 rounded w-96"
                />

                <label htmlFor="planTransferencia">
                  Plan de transferencia (traspaso al propietario del proceso)
                </label>
                <textarea
                  cols={30}
                  rows={3}
                  type="text"
                  id="planTransferencia"
                  name="planTransferencia"
                  className="mb-2 border border-gray-300 rounded w-96"
                />

                <input type="file" accept=".jpeg, .jpg" name="imagen6" />
                <label htmlFor="opcion5">Opcion de Controlar</label>
                <select name="opcion5" className="py-2 w-96">
                  <option value="Planes de control">Planes de control</option>
                  <option value="Graficos de control">
                    Graficos de control
                  </option>
                  <option value="Manuales de entrenamiento">
                    Manuales de entrenamiento
                  </option>
                  <option value="Procedimiento de operacion estandar (SOP)">
                    Procedimiento de operacion estandar (SOP)
                  </option>
                  <option value="Mapas de procesos nuevos detallados">
                    Mapas de procesos nuevos detallados
                  </option>
                  <option value="Nivel Sigma del proceso">
                    Nivel Sigma del proceso
                  </option>
                  <option value="Habilidad del proceso">
                    Habilidad del proceso
                  </option>
                  <option value="Seguimiento de benificios">
                    Seguimiento de benificios
                  </option>
                </select>
                <label htmlFor="recomendaciones">
                  Recomendaciones para el proyecto
                </label>
                <textarea
                  cols={30}
                  rows={3}
                  type="text"
                  name="recomendaciones"
                  className="mb-2 border border-gray-300 rounded w-96"
                />
                <label
                  htmlFor="
                  controlarcompletado
                "
                >
                  ¿El modulo esta completado?
                </label>
                <select
                  className="py-2 mb-4 w-96"
                  name="controlarcompletado"
                  id="controlarcompletado"
                >
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 mb-8 text-black transition-colors duration-300 bg-white rounded w-96"
              >
                Guardar
              </button>
              <button
                onClick={cancelForm}
                className="px-4 py-2 mb-8 ml-4 text-black transition-colors duration-300 bg-white rounded w-96"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
        <Toaster position="top-right" />

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
                  <div className="px-4 pt-5 pb-4 font-semibold bg-white sm:p-6 sm:pb-4  [&>p]:text-2xl">
                    <h2 className="mb-4 text-3xl font-bold text-center text-blue-500">
                      Proyecto más reciente
                    </h2>
                    <img
                      src={`data:image/jpeg;base64,${proyecto.imagen}`}
                      alt={proyecto.nombre}
                    />
                    <p className="text-blue-500">
                      Nombre del proyecto:{" "}
                      <p className="text-black">{proyecto.nombre}</p>
                    </p>
                    <p className="text-blue-500">
                      Ubicación:{" "}
                      <p className="text-black">{proyecto.ubicacion}</p>
                    </p>
                    <p className="text-blue-500">
                      Objetivos:{" "}
                      <p className="text-black">{proyecto.objetivos}</p>
                    </p>
                    <p className="text-blue-500">
                      Enumere los productos finales para los clientes (internos
                      y externos)
                      <p className="text-black">{proyecto.enumere}</p>
                    </p>
                    <p className="text-blue-500">
                      Realizado el:{" "}
                      <p className="text-black">{proyecto.descripcion}</p>
                    </p>
                  </div>
                ) : (
                  <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                    <p>No hay proyectos disponibles.</p>
                  </div>
                )}
                <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  {proyecto?.definircompletado === "Si" &&
                  proyecto?.medidacompletado === "Si" &&
                  proyecto?.analizarcompletado === "Si" &&
                  proyecto?.mejorarcompletado === "Si" &&
                  proyecto?.controlarcompletado === "Si" ? (
                    <button
                      type="button"
                      className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = "/Plantilla.pdf";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      Descargar PDF
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setHasClicked(false);
                      setShowPDF(true);
                    }}
                  >
                    Ver información
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
