import { useState } from 'react'
import './App.css'
import { iniciarSesion, registrarUsuario } from './services/authService'

/**
 * Componente principal de la aplicación.
 * Gestiona el formulario de inicio de sesión del sistema Don Juan.
 */
function App() {
  // Estado para almacenar el usuario ingresado.
  const [usuario, setUsuario] = useState('')

  // Estado para almacenar la contraseña ingresada.
  const [password, setPassword] = useState('')

  // Estado para mostrar mensajes al usuario.
  const [mensaje, setMensaje] = useState('')

  // Estado para controlar si se muestra el formulario de registro.
const [mostrarRegistro, setMostrarRegistro] = useState(false)

// Estado para almacenar el usuario del registro.
const [nuevoUsuario, setNuevoUsuario] = useState('')

// Estado para almacenar la contraseña del registro.
const [nuevaPassword, setNuevaPassword] = useState('')

 /**
 * Gestiona el inicio de sesión del usuario.
 */
const manejarInicioSesion = async (evento) => {
  evento.preventDefault()

  // Validamos que ambos campos tengan información.
  if (!usuario.trim() || !password.trim()) {
    setMensaje('Por favor, completa todos los campos.')
    return
  }

  try {
    // Utilizamos el servicio centralizado de autenticación.
    const resultado = await iniciarSesion(
      usuario.trim(),
      password
    )

    // Procesamos la respuesta de la API.
    if (resultado.ok) {
      setMensaje(resultado.datos.mensaje)
    } else {
      setMensaje(
        resultado.datos.mensaje || 'Error en la autenticación'
      )
    }
  } catch (error) {
    // Informamos si no es posible comunicarse con la API.
    console.error('Error al conectar con la API:', error)
    setMensaje('No fue posible conectar con el servidor.')
  }
}
  
  /**
 * Envía los datos del nuevo usuario a la API
 * para realizar el proceso de registro.
 */
/**
 * Gestiona el registro de un nuevo usuario.
 */
const manejarRegistro = async (evento) => {
  evento.preventDefault()

  // Validamos que ambos campos tengan información.
  if (!nuevoUsuario.trim() || !nuevaPassword.trim()) {
    setMensaje('Por favor, completa todos los campos del registro.')
    return
  }

  try {
    // Utilizamos el servicio centralizado de registro.
    const resultado = await registrarUsuario(
      nuevoUsuario.trim(),
      nuevaPassword
    )

    // Procesamos la respuesta de la API.
    if (resultado.ok) {
      setMensaje(resultado.datos.mensaje)
      setNuevoUsuario('')
      setNuevaPassword('')
    } else {
      setMensaje(
        resultado.datos.mensaje ||
        'No fue posible registrar el usuario.'
      )
    }
  } catch (error) {
    // Informamos si no es posible comunicarse con la API.
    console.error('Error al conectar con la API:', error)
    setMensaje('No fue posible conectar con el servidor.')
  }


}
  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand">
          <span className="brand-mark">DJ</span>

          <div>
            <h1>Don Juan</h1>
            <p>Gestión de arrendamientos</p>
          </div>
        </div>

        <div className="welcome">
          <h2>Bienvenido</h2>
          <p>Inicia sesión para continuar</p>
        </div>

 {mostrarRegistro ? (
  <form onSubmit={manejarRegistro}>
    <div className="form-group">
      <label htmlFor="nuevoUsuario">Usuario</label>

      <input
        id="nuevoUsuario"
        type="text"
        placeholder="Crea tu usuario"
        value={nuevoUsuario}
        onChange={(evento) => setNuevoUsuario(evento.target.value)}
        autoComplete="username"
      />
    </div>

    <div className="form-group">
      <label htmlFor="nuevaPassword">Contraseña</label>

      <input
        id="nuevaPassword"
        type="password"
        placeholder="Crea tu contraseña"
        value={nuevaPassword}
        onChange={(evento) => setNuevaPassword(evento.target.value)}
        autoComplete="new-password"
      />
    </div>

    {mensaje && (
      <p className="message" role="alert">
        {mensaje}
      </p>
    )}

    <button type="submit" className="login-button">
      Crear cuenta
    </button>

    <button
      type="button"
      className="back-button"
      onClick={() => {
        setMostrarRegistro(false)
        setMensaje('')
      }}
    >
      Volver al inicio de sesión
    </button>
  </form>
) : (
  <form onSubmit={manejarInicioSesion}>
    <div className="form-group">
      <label htmlFor="usuario">Usuario</label>

      <input
        id="usuario"
        type="text"
        placeholder="Ingresa tu usuario"
        value={usuario}
        onChange={(evento) => setUsuario(evento.target.value)}
        autoComplete="username"
      />
    </div>

    <div className="form-group">
      <label htmlFor="password">Contraseña</label>

      <input
        id="password"
        type="password"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChange={(evento) => setPassword(evento.target.value)}
        autoComplete="current-password"
      />
    </div>

    {mensaje && (
      <p className="message" role="alert">
        {mensaje}
      </p>
    )}

    <button type="submit" className="login-button">
      Iniciar sesión
    </button>
  </form>
)}

       <div className="register-link">
  <span>¿No tienes una cuenta?</span>

  <button
    type="button"
    onClick={() => {
      setMostrarRegistro(true)
      setMensaje('')
    }}
  >
    Registrarse
  </button>
</div>
      </section>

      <footer>
        <p>© 2026 Don Juan · Plataforma de arrendamientos</p>
      </footer>
    </main>
  )
}

export default App