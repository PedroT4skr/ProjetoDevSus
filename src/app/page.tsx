import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.badge}>DevSus v2.0</div>
        <h1 className={styles.title}>
          Coleta <span className={styles.gradient}>Sustentável</span> Inteligente
        </h1>
        <p className={styles.description}>
          Transformando a reciclagem em condomínios com tecnologia de ponta e logística eficiente.
        </p>
        
        <div className={styles.actions}>
          <button className={styles.primaryButton}>Começar Agora</button>
          <button className={styles.secondaryButton}>Saiba Mais</button>
        </div>
      </div>
      
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Moradores</h3>
          <p>Solicite coletas em segundos e acompanhe o status em tempo real.</p>
        </div>
        <div className={styles.card}>
          <h3>Coletores</h3>
          <p>Otimize suas rotas e gerencie seus plantões com facilidade.</p>
        </div>
        <div className={styles.card}>
          <h3>Condomínios</h3>
          <p>Gestão completa e relatórios de sustentabilidade detalhados.</p>
        </div>
      </div>
    </main>
  );
}
