import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };

    if (isLogin) {
      // Aquí puedes manejar el inicio de sesión
      try {
        const response = await axios.post("https://rohisel.com/login", user, {
          withCredentials: true,
        });
        console.log(response.data);
        if (response.data.message === "Inicio de sesión exitoso") {
          // Si el inicio de sesión es exitoso, mostrar un toast de éxito
          toast.success(response.data.message);
          navigate("/dashboard");
        } else {
          // Si hay otro mensaje en la respuesta, mostrarlo como un error
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // Aquí puedes manejar la creación del usuario
      try {
        const response = await axios.post("https://rohisel.com/register", user);
        console.log(response.data);
        if (response.data.message) {
          // Si hay un mensaje en la respuesta, mostrarlo
          toast.error(response.data.message);
        } else {
          toast.success("Usuario creado exitosamente");
          // Limpia los campos después de un registro exitoso
          setEmail("");
          setPassword("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-500">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl mb-4">
          {isLogin ? "Iniciar sesión" : "Crear usuario"}
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-4">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded mt-1"
            />
          </label>
          <input
            type="submit"
            value={isLogin ? "Iniciar sesión" : "Crear usuario"}
            className="w-full px-3 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
          />
        </form>
        <Toaster position="top-right" />
        <button
          onClick={toggleForm}
          className="w-full px-3 py-2 mt-4 text-blue-500 border rounded cursor-pointer hover:bg-blue-100"
        >
          {isLogin ? "Crear una cuenta" : "Ya tengo una cuenta"}
        </button>
      </div>
    </div>
  );
}

export default HomePage;
