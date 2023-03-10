import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <span>
      Developed by{" "}
      <strong>
        <a href="https://www.pbombonato.com" rel="noreferrer" target="_blank">
          Pablo Bombonato
        </a>
      </strong>
      .
    </span>
  </footer>
);

export default Footer;
