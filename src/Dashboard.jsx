import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

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

    const data = new FormData(event.target);
    const formData = Object.fromEntries(data.entries());

    const response = await fetch("/api/formData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("Datos del formulario enviados con éxito");
    } else {
      console.error("Error al enviar los datos del formulario");
    }
  };

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
    <div className="flex bg-blue-500 gap-4 overflow-x-hidden">
      <aside
        className={`flex flex-col justify-between w-64 ${
          !showForm ? "h-screen" : ""
        } bg-white text-blue-500 shadow-lg`}
      >
        <div className="p-4 text-center">
          <h1 className="text-4xl mb-4">Dashboard</h1>
          <h2 className="text-2xl mb-4">Bienvenido, usuario {userId}</h2>
        </div>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300 "
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
      <section className="text-white">
        <h1 className="text-4xl p-4">Contenido del dashboard</h1>
        <hr className="w-screen mb-8" />
        {!showForm ? (
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">
              Crear nuevo proyecto
            </h2>
            <button
              onClick={handleStart}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300"
            >
              Comenzar
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="text-black [&>label]:text-white [&>h4]:text-white [&>h3]:text-white [&>input]:text-white "
          >
            <label className="block mb-2">Nombre del proyecto:</label>
            <input type="text" className="px-3 py-2 border rounded mt-1" />

            <label className="block mb-2">Ubicación:</label>
            <input type="text" className="px-3 py-2 border rounded mt-1" />

            <label className="block mb-2">Address:</label>
            <input type="text" className="px-3 py-2 border rounded mt-1" />

            <label className="block mb-2">Profesional del método DMAIC:</label>
            <input type="text" className="px-3 py-2 border rounded mt-1" />

            <label className="block mb-2">Realizada el:</label>
            <input type="date" className="px-3 py-2 border rounded mt-1" />

            <label className="block mb-2">Date Inspección:</label>
            <input type="date" className="px-3 py-2 border rounded mt-1" />

            <h3 className="text-xl mt-4 mb-2">Ciclo DMAIC</h3>

            <h4 className="text-lg mt-4 mb-2">Definir</h4>
            <label className="block mb-2">
              ¿Cuáles son los objetivos del proyecto?
            </label>
            <textarea
              className=" px-3 py-2 border rounded mt-1"
              rows="2"
            ></textarea>

            <label className="block mb-2">
              Enumere los productos finales para los clientes (internos y
              externos)
            </label>
            <textarea
              className=" px-3 py-2 border rounded mt-1"
              rows="2"
            ></textarea>

            <h4 className="text-lg mt-4 mb-2">Medida</h4>
            <label className="block mb-2">
              ¿Se ha desarrollado un plan de recopilación de datos para
              cuantificar el problema?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="dataCollectionPlan"
                  value="Sí"
                  className="mr-2 text-white"
                />
                Sí
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="dataCollectionPlan"
                  value="No"
                  className="mr-2"
                />
                No
              </label>
            </div>

            <label className="block mb-2">
              ¿Se determina el rendimiento actual del proceso a través de la
              evaluación comparativa?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="benchmarking"
                  value="Sí"
                  className="mr-2"
                />
                Sí
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="benchmarking"
                  value="No"
                  className="mr-2"
                />
                No
              </label>
            </div>

            <label className="block mb-2">Planteamiento del problema</label>
            <textarea
              className=" px-3 py-2 border rounded mt-1"
              rows="2"
            ></textarea>

            <h4 className="text-lg mt-4 mb-2">Analizar</h4>
            <label className="block mb-2">
              ¿Cuáles son los objetivos del rendimiento?
            </label>
            <textarea
              className=" px-3 py-2 border rounded mt-1"
              rows="2"
            ></textarea>

            <label className="block mb-2">
              Identifique los pasos del proceso con valor/sin valor añadido
            </label>
            <textarea
              className=" px-3 py-2 border rounded mt-1"
              rows="2"
            ></textarea>

            <label className="block mb-2">
              Especifique las fuentes de variación
            </label>
            <textarea
              className=" px-3 py-2 border rounded mt-1"
              rows="2"
            ></textarea>

            <label className="block mb-2">
              Describa las pocas entradas vitales en relación con el producto
            </label>
            <textarea
              className=" px-3 py-2 border rounded mt-1"
              rows="2"
            ></textarea>

            <label className="block mb-2">Causa raíz del problema</label>
            <textarea
              className=" px-3 py-2 border rounded mt-1"
              rows="2"
            ></textarea>

            <h4 className="text-lg mt-4 mb-2">Mejorar</h4>
            <label className="block mb-2">Posibles soluciones</label>
            <textarea
              className=" px-3 py-2 border rounded mt-1"
              rows="2"
            ></textarea>

            <label className="block mb-2">
              ¿Están bien definidas las tolerancias operativas del posible
              sistema?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="operationalTolerances"
                  value="Sí"
                  className="mr-2"
                />
                Sí
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="operationalTolerances"
                  value="No"
                  className="mr-2"
                />
                No
              </label>
            </div>

            <label className="block mb-2">
              ¿Se realizaron experimentos de diseño?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="designExperiments"
                  value="Sí"
                  className="mr-2"
                />
                Sí
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="designExperiments"
                  value="No"
                  className="mr-2"
                />
                No
              </label>
            </div>

            <label className="block mb-2">
              ¿Se validaron las posibles mejoras a través de estudios piloto?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pilotStudies"
                  value="Sí"
                  className="mr-2"
                />
                Sí
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pilotStudies"
                  value="No"
                  className="mr-2"
                />
                No
              </label>
            </div>

            <label className="block mb-2">
              ¿Se evaluaron y reevaluaron las posibles soluciones?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="solutionsEvaluation"
                  value="Sí"
                  className="mr-2"
                />
                Sí
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="solutionsEvaluation"
                  value="No"
                  className="mr-2"
                />
                No
              </label>
            </div>

            <h4 className="text-lg mt-4 mb-2">Controlar</h4>
            <label className="block mb-2">
              ¿Cuál es el sistema de seguimiento y control establecido?
            </label>
            <textarea
              className=" px-3 py-2 border rounded mt-1"
              rows="2"
            ></textarea>

            <label className="block mb-2">
              ¿Se implementó el control estadístico de los procesos?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="statisticalControl"
                  value="Sí"
                  className="mr-2"
                />
                Sí
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="statisticalControl"
                  value="No"
                  className="mr-2"
                />
                No
              </label>
            </div>

            <label className="block mb-2">
              Plan de transferencia (traspaso al propietario del proceso)
            </label>
            <textarea
              className=" px-3 py-2 border rounded mt-1"
              rows="2"
            ></textarea>

            <label className="block mb-2">
              ¿Se verificaron los beneficios, ahorros o evasión de costes y el
              crecimiento de las ganancias?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="benefitsVerification"
                  value="Sí"
                  className="mr-2"
                />
                Sí
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="benefitsVerification"
                  value="No"
                  className="mr-2"
                />
                No
              </label>
            </div>

            <h4 className="text-lg mt-4 mb-2">Finalización</h4>
            <label className="block mb-2">Recomendaciones adicionales</label>
            <textarea
              className=" px-3 py-2 border rounded mt-1"
              rows="2"
            ></textarea>
            <div className="py-8">
              <button
                type="submit"
                className=" px-4 py-2 bg-white text-black rounded w-96  transition-colors duration-300"
              >
                Guardar
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
