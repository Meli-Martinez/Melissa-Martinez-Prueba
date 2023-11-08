import React from "react";
import {Link} from "react-router-dom";

import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Creación de Usuarios</h1>
      <Link to="/crear">Crear Usuario</Link>
    </div>
  )
}

export { Home };