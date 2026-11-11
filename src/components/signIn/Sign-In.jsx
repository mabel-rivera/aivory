
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./sign-in.module.css";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        nombres: "",
        apellidos: "",
        telefono: "",
        correo: "",
        contrasena: "",
        confirmar_contrasena: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Actualizar los valores del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
        setError("");
        setSuccess("");
    };

    // Enviar los datos al backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.contrasena !== formData.confirmar_contrasena) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("http://localhost:8000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                const mensaje = Array.isArray(data.detail)
                    ? data.detail.map((item) => item.msg).join(", ")
                    : data.detail || "No fue posible completar el registro.";

                throw new Error(mensaje);
            }

            setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");

            // Limpiar todos los campos del formulario
            setFormData({
                nombres: "",
                apellidos: "",
                telefono: "",
                correo: "",
                contrasena: "",
                confirmar_contrasena: ""
            });

        } catch (err) {
            console.error("Error al registrar médico:", err);
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
        <main className={`${styles.loginContainer} d-flex align-items-center justify-content-end min-vh-100 p-5`}>
            <div className={`${styles.card} card shadow p-5`}>

                <div className={`${styles["welcome-text"]} mb-4`}>
                    <h1 className={styles.title1}>Bienvenido a</h1>
                    <h1 className={styles.title2}>Aivory</h1>
                    <p>Sistema de gestión clínica - Casa Veterinaria</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="row">

                        {/* Nombres */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="inputNom" className={`${styles.label} form-label`}>
                                Nombres
                            </label>
                            <input
                                type="text"
                                className={`${styles.input} form-control`}
                                id="inputNom"
                                name="nombres"
                                value={formData.nombres}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Apellidos */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="inputApe" className={`${styles.label} form-label`}>
                                Apellidos
                            </label>
                            <input
                                type="text"
                                className={`${styles.input} form-control`}
                                id="inputApe"
                                name="apellidos"
                                value={formData.apellidos}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Teléfono */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="inputTelefono" className={`${styles.label} form-label`}>
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                className={`${styles.input} form-control`}
                                id="inputTelefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Correo */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="inputCorreo" className={`${styles.label} form-label`}>
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                className={`${styles.input} form-control`}
                                id="inputCorreo"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Contraseña */}
                        <div className="col-md-6 mb-3">
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

                        {/* Confirmar contraseña */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="inputConfirmPass" className={`${styles.label} form-label`}>
                                Confirmar contraseña
                            </label>

                            <div className={styles["password-container"]}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className={`${styles.input} form-control`}
                                    id="inputConfirmPass"
                                    name="confirmar_contrasena"
                                    value={formData.confirmar_contrasena}
                                    onChange={handleChange}
                                    required
                                />

                                <i
                                    className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"} ${styles["password-toggle"]}`}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                ></i>
                            </div>
                        </div>

                        {/* Mensaje de éxito */}
                        {success && (
                            <div className="alert alert-success d-flex align-items-center" role="alert">
                                <i className="bi bi-check-circle-fill me-2"></i>
                                {success}
                            </div>
                        )}

                        {/* Mensaje de error */}
                        {error && (
                            <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <i className="bi bi-exclamation-circle-fill me-2"></i>
                                {error}
                            </div>
                        )}

                    </div>

                    <button
                        type="submit"
                        className={`${styles.btn} btn w-100 mt-2`}
                        disabled={loading}
                    >
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>

                </form>

                <div className={styles.registerText}>
                    <p>¿Ya tienes una cuenta?</p>
                    <span onClick={() => navigate("/")}>Inicia sesión</span>
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

export default SignIn;
