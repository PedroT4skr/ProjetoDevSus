'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Leaf, 
  Shield, 
  Zap, 
  Truck, 
  Building2, 
  BarChart3, 
  Users, 
  CheckCircle2,
  Globe,
  Award
} from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      {/* Navbar Minimalista */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <Leaf className={styles.logoIcon} />
            <span>DevSus</span>
          </div>
          <div className={styles.navLinks}>
            <Link href="#features">Recursos</Link>
            <Link href="#impact">Impacto</Link>
            <Link href="#how-it-works">Como Funciona</Link>
          </div>
          <div className={styles.navActions}>
            <Link href="/login" className={styles.loginLink}>Entrar</Link>
            <Link href="/register" className={styles.navCta}>Começar Agora</Link>
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        {/* Hero Section Premium */}
        <section className={styles.heroSection}>
          <div className={styles.heroGrid}>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={styles.heroInfo}
            >
              <div className={styles.heroBadge}>
                <SparkleIcon /> Lançamento v2.0
              </div>
              <h1 className={styles.mainTitle}>
                A revolução da <span className={styles.textGradient}>coleta seletiva</span> no seu condomínio.
              </h1>
              <p className={styles.heroSub}>
                O DevSus conecta moradores e coletores em uma plataforma inteligente, 
                transformando resíduos em impacto positivo através de logística otimizada 
                e gamificação da sustentabilidade.
              </p>
              <div className={styles.heroActions}>
                <Link href="/register" className={styles.primaryBtn}>
                  Criar minha conta <ArrowRight size={20} />
                </Link>
                <Link href="#features" className={styles.secondaryBtn}>
                  Saiba mais sobre a solução
                </Link>
              </div>
              <div className={styles.socialProof}>
                <div className={styles.avatarGroup}>
                  {[1,2,3,4].map(i => (
                    <div key={i} className={styles.avatarMini} />
                  ))}
                </div>
                <p>+500 moradores já estão fazendo a diferença</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className={styles.heroVisual}
            >
              <div className={styles.glassCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardDot} style={{ background: '#ff5f56' }} />
                  <div className={styles.cardDot} style={{ background: '#ffbd2e' }} />
                  <div className={styles.cardDot} style={{ background: '#27c93f' }} />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.statsPreview}>
                    <div className={styles.statLine}>
                      <span>Impacto Mensal</span>
                      <strong>+2.4 tons</strong>
                    </div>
                    <div className={styles.progressLine}>
                      <div className={styles.fill} style={{ width: '70%' }} />
                    </div>
                  </div>
                  <div className={styles.floatingBadges}>
                    <div className={styles.fBadge}><Zap size={14} /> Logística Real-time</div>
                    <div className={styles.fBadge}><Shield size={14} /> 100% Seguro</div>
                  </div>
                </div>
              </div>
              <div className={styles.heroCircle} />
            </motion.div>
          </div>
        </section>

        {/* Estatísticas de Impacto */}
        <section id="impact" className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <StatCard icon={<Globe />} value="128k" label="Kg de Co2 evitados" />
            <StatCard icon={<Users />} value="1.2k" label="Usuários Ativos" />
            <StatCard icon={<Award />} value="98%" label="Taxa de Reciclagem" />
            <StatCard icon={<Building2 />} />
          </div>
        </section>

        {/* Benefícios / Features */}
        <section id="features" className={styles.featuresSection}>
          <div className={styles.sectionHeading}>
            <h2>Tecnologia que <span className={styles.textGradient}>simplifica</span> a vida.</h2>
            <p>Desenvolvemos ferramentas específicas para cada peça do ecossistema de sustentabilidade urbana.</p>
          </div>
          
          <div className={styles.featuresGrid}>
            <FeatureCard 
              icon={<Shield className={styles.featIcon} />}
              title="Para Moradores"
              desc="Agende coletas em segundos, escolha o melhor horário e acompanhe o coletor em tempo real. Ganhe EcoPoints que podem ser trocados por benefícios exclusivos no seu condomínio."
            />
            <FeatureCard 
              icon={<Truck className={styles.featIcon} />}
              title="Para Coletores"
              desc="Visualize todas as solicitações em um mapa inteligente. Otimize sua rota, economize tempo e tenha o controle total do seu fluxo de trabalho com um painel de alta performance."
            />
            <FeatureCard 
              icon={<BarChart3 className={styles.featIcon} />}
              title="Para Administradores"
              desc="Acesse relatórios detalhados de impacto ambiental, gerencie usuários e tenha visibilidade total da eficiência da coleta no seu condomínio ou empresa."
            />
          </div>
        </section>

        {/* Como Funciona Step-by-Step */}
        <section id="how-it-works" className={styles.howSection}>
          <div className={styles.howContainer}>
            <div className={styles.howInfo}>
              <h3>Como funciona o ecossistema DevSus?</h3>
              <p>Uma jornada simples para um impacto extraordinário na forma como lidamos com nossos resíduos diários.</p>
              
              <div className={styles.stepsList}>
                <StepItem num="01" title="Cadastre-se" text="Crie sua conta como morador ou coletor em menos de 2 minutos." />
                <StepItem num="02" title="Solicite ou Aceite" text="Moradores pedem coleta; coletores aceitam as tarefas disponíveis." />
                <StepItem num="03" title="Rastreamento" text="Acompanhe todo o processo, desde a saída até a finalização da coleta." />
                <StepItem num="04" title="Gere Impacto" text="Veja seu ranking de sustentabilidade subir e contribua para o planeta." />
              </div>
            </div>
            <div className={styles.howVisual}>
               <div className={styles.visualMockup}>
                 {/* Placeholder para imagem do app */}
                 <div className={styles.appScreen}>
                    <div className={styles.appHeader} />
                    <div className={styles.appContent}>
                       <div className={styles.skeletonLine} />
                       <div className={styles.skeletonLine} style={{ width: '60%' }} />
                       <div className={styles.skeletonCircle} />
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className={styles.ctaFinal}>
          <div className={styles.ctaContent}>
            <h2>Pronto para transformar seu condomínio?</h2>
            <p>Junte-se a centenas de pessoas que já estão revolucionando a gestão de resíduos com o DevSus.</p>
            <Link href="/register" className={styles.footerCta}>
              Começar Agora Gratuitamente
            </Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <Leaf size={24} />
              <span>DevSus</span>
            </div>
            <p>Tecnologia a serviço do meio ambiente. Criando cidades mais inteligentes e sustentáveis, uma coleta por vez.</p>
          </div>
          <div className={styles.footerLinks}>
            <h4>Plataforma</h4>
            <Link href="/login">Login</Link>
            <Link href="/register">Registro</Link>
            <Link href="#features">Recursos</Link>
          </div>
          <div className={styles.footerLinks}>
            <h4>Legal</h4>
            <Link href="#">Privacidade</Link>
            <Link href="#">Termos de Uso</Link>
            <Link href="#">Cookies</Link>
          </div>
          <div className={styles.footerLinks}>
            <h4>Contato</h4>
            <Link href="mailto:contato@devsus.com">contato@devsus.com</Link>
            <p>+55 (11) 9999-9999</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2026 DevSus. Todos os direitos reservados. Feito com 🌱 para o futuro.</p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ icon, value = "50+", label = "Condomínios Atendidos" }: { icon: React.ReactNode, value?: string, label?: string }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statInfo}>
        <h4>{value}</h4>
        <p>{label}</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={styles.featureCard}
    >
      <div className={styles.featIconContainer}>{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className={styles.featLink}>Saiba mais <ArrowRight size={16} /></div>
    </motion.div>
  );
}

function StepItem({ num, title, text }: { num: string, title: string, text: string }) {
  return (
    <div className={styles.stepItem}>
      <div className={styles.stepNum}>{num}</div>
      <div className={styles.stepInfo}>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M3 5h4"/>
      <path d="M21 17v4"/>
      <path d="M19 19h4"/>
    </svg>
  );
}
