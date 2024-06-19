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
        className={`flex flex-col justify-between w-64 ${
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
            className="px-4 py-2 text-white transition-colors duration-300 bg-blue-500 rounded hover:bg-blue-700 "
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
      <section className="text-white">
        <h1 className="p-4 text-4xl">Contenido del dashboard</h1>
        <hr className="w-screen mb-8" />
        {!showForm ? (
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-xl font-semibold text-blue-500">
              Crear nuevo proyecto
            </h2>
            <button
              onClick={handleStart}
              className="px-4 py-2 mt-4 text-white transition-colors duration-300 bg-blue-500 rounded hover:bg-blue-700"
            >
              Comenzar
            </button>
            <button
              className="px-4 py-2 mt-4 text-white transition-colors duration-300 bg-blue-500 rounded hover:bg-blue-700"
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
            <div className="py-8">
              <div className="flex flex-col mb-4">
                <input type="text" name="nombre" />
                <input type="file" name="imagen" />
                <select name="opcion">
                  <option value="option1">Opción 1</option>
                  <option value="option2">Opción 2</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-black transition-colors duration-300 bg-white rounded w-96"
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
                    <h4>Opción: {proyecto.opcion}</h4>
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
              <PDFViewer width="100%" height="950">
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
