
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./start.module.css";

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <main className={`${styles["login-container"]} d-flex align-items-center justify-content-end min-vh-100 p-5`}>
      <div className={`${styles.card} card shadow p-5`} style={{ width: "24rem" }}>
        
        <div className={`${styles["welcome-text"]} mb-4`}>
          <h1 className={styles.title1}>Bienvenido a</h1>
          <h1 className={styles.title2}>Aivory</h1>
          <p>Sistema de gestión clínica - Casa Veterinaria</p>
        </div>

        <form>
          <div className="mb-3">
            <label htmlFor="inputEmail" className={`${styles.label} form-label`}>
              Correo electrónico
            </label>

            <input
              type="email"
              className={`${styles.input} form-control`}
              id="inputEmail"
              aria-describedby="emailHelp"
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

          <div className={styles.remember}>
            <p>¿Olvidaste tu contraseña?</p>
          </div>

          <button type="submit" className={`${styles.btn} btn w-100`}>
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Iniciar sesión
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
