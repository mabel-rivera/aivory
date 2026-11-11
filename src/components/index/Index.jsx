
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./start.module.css";

const Index = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        correo: "",
        contrasena: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Actualizar los campos
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setError("");
    };

    // Iniciar sesión
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:8000/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                const mensaje = Array.isArray(data.detail)
                    ? data.detail.map((item) => item.msg).join(", ")
                    : data.detail || "No fue posible iniciar sesión.";

                throw new Error(mensaje);
            }

            // Guardar el token JWT durante la sesión del navegador
            sessionStorage.setItem("aivory_token", data.access_token);
            sessionStorage.setItem("aivory_token_type", data.token_type);

            // Limpiar el formulario
            setFormData({
                correo: "",
                contrasena: ""
            });

            // Redirigir al panel principal
            navigate("/home");

        } catch (err) {
            console.error("Error al iniciar sesión:", err);

            setError(
                err.message === "Failed to fetch"
                    ? "No se pudo conectar con el servidor. Verifica que el backend esté funcionando."
                    : err.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={`${styles["login-container"]} d-flex align-items-center justify-content-end min-vh-100 p-5`}>
            <div className={`${styles.card} card shadow p-5`} style={{ width: "24rem" }}>

                <div className={`${styles["welcome-text"]} mb-4`}>
                    <h1 className={styles.title1}>Bienvenido a</h1>
                    <h1 className={styles.title2}>Aivory</h1>
                    <p>Sistema de gestión clínica - Casa Veterinaria</p>
                </div>

                <form onSubmit={handleSubmit}>

                    {/* Correo electrónico */}
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className={`${styles.label} form-label`}>
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            className={`${styles.input} form-control`}
                            id="inputEmail"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Contraseña */}
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className={`${styles.label} form-label`}>
                            Contraseña
                        </label>

                        <div className={styles["password-container"]}>
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`${styles.input} form-control`}
                                id="inputPassword"
                                name="contrasena"
                                value={formData.contrasena}
                                onChange={handleChange}
                                required
                            />

                            <i
                                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} ${styles["password-toggle"]}`}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>
                    </div>

                    {/* Recuperación de contraseña */}
                    <div className={styles.remember}>
                        <p>¿Olvidaste tu contraseña?</p>
                    </div>

                    {/* Mensaje de error */}
                    {error && (
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <i className="bi bi-exclamation-circle-fill me-2"></i>
                            {error}
                        </div>
                    )}

                    {/* Botón */}
                    <button
                        type="submit"
                        className={`${styles.btn} btn w-100`}
                        disabled={loading}
                    >
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        {loading ? "Ingresando..." : "Iniciar sesión"}
                    </button>

                </form>

                <div className={styles["register-text"]}>
                    <p>¿No tienes una cuenta?</p>
                    <span onClick={() => navigate("/sign-in")}>Regístrate</span>
                </div>

                {/* Pie de página */}
                <div className={styles["footer-login"]}>
                    <p className={styles.copyright}>© 2026 Casa Veterinaria</p>

                    <div className={styles["footer-info"]}>
                        <span>
                            <i className="bi bi-telephone"></i>
                            3007857570
                        </span>

                        <span>
                            <i className="bi bi-geo-alt"></i>
                            Ipiales, Nariño - Colombia
                        </span>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default Index;
