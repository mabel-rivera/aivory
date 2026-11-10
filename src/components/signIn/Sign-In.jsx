
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./sign-in.module.css";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    return (
        <main className={`${styles.loginContainer} d-flex align-items-center justify-content-end min-vh-100 p-5`}>
            <div className={`${styles.card} card shadow p-5`} style={{ width: "24rem" }}>

                <div className={`${styles["welcome-text"]} mb-4`}>
                    <h1 className={styles.title1}>Bienvenido a</h1>
                    <h1 className={styles.title2}>Aivory</h1>
                    <p>Sistema de gestión clínica - Casa Veterinaria</p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        navigate("/");
                    }}
                >
                    <div className="mb-3">
                        <label htmlFor="inputNom" className={`${styles.label} form-label`}>
                            Nombres
                        </label>
                        <input
                            type="text"
                            className={`${styles.input} form-control`}
                            id="inputNom"
                            aria-describedby="nom"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputApe" className={`${styles.label} form-label`}>
                            Apellidos
                        </label>
                        <input
                            type="text"
                            className={`${styles.input} form-control`}
                            id="inputApe"
                            aria-describedby="apell"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputCorreo" className={`${styles.label} form-label`}>
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            className={`${styles.input} form-control`}
                            id="inputCorreo"
                            aria-describedby="correo"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputPassword" className={`${styles.label} form-label`}>
                            Contraseña
                        </label>

                        <div className={styles["password-container"]}>
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`${styles.input} form-control`}
                                id="inputPassword"
                            />

                            <i
                                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} ${styles["password-toggle"]}`}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputConfirmPass" className={`${styles.label} form-label`}>
                            Confirmar contraseña
                        </label>

                        <div className={styles["password-container"]}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className={`${styles.input} form-control`}
                                id="inputConfirmPass"
                            />

                            <i
                                className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"} ${styles["password-toggle"]}`}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            ></i>
                        </div>
                    </div>

                    <button type="submit" className={`${styles.btn} btn w-100`}>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Registrarse
                    </button>
                </form>

                <div className={styles.registerText}>
                    <p>¿Ya tienes una cuenta?</p>
                    <span onClick={() => navigate("/")}>Inicia sesión</span>
                </div>

            </div>
        </main>
    );
};

export default SignIn;
