'use client';

import { useState, useEffect } from 'react';
import { RequestRepository } from '@/services/repositories';
import { CollectionRequest } from '@/lib/types';
import { motion } from 'framer-motion';
import { 
  Users, 
  Truck, 
  Trash2,
  TrendingUp,
  Activity,
  Calendar,
  Filter,
  Download,
  MoreHorizontal,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const [requests, setRequests] = useState<CollectionRequest[]>([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const allReqs = await RequestRepository.getAll();
      setRequests(allReqs);
      setUserCount(128); // Mock mais realista
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Total de Coletas', value: requests.length, icon: Trash2, color: '#10b981', trend: '+12%' },
    { label: 'Moradores Ativos', value: userCount, icon: Users, color: '#3b82f6', trend: '+5.4%' },
    { label: 'Em Andamento', value: requests.filter(r => r.status === 'EM_ROTA').length, icon: Truck, color: '#f59e0b', trend: 'Estável' },
    { label: 'Taxa de Reciclagem', value: '84%', icon: TrendingUp, color: '#8b5cf6', trend: '+2.1%' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.container}
    >
      <header className={styles.header}>
        <div className={styles.headerInfo}>
          <h1>Dashboard Administrativo</h1>
          <p>Visão geral da sustentabilidade no Condomínio Solar.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.filterBtn}><Filter size={18} /> Filtros</button>
          <button className={styles.exportBtn}><Download size={18} /> Exportar</button>
        </div>
      </header>

      {/* Grid de Estatísticas Principais */}
      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={styles.statCard}
          >
            <div className={styles.statTop}>
              <div className={styles.statIcon} style={{ background: `${stat.color}15`, color: stat.color }}>
                <stat.icon size={24} />
              </div>
              <div className={styles.trendBadge} style={{ color: stat.trend.startsWith('+') ? '#10b981' : '#64748b' }}>
                {stat.trend} <ArrowUpRight size={14} />
              </div>
            </div>
            <div className={styles.statContent}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.mainGrid}>
        {/* Gráfico de Volume */}
        <div className={styles.chartSection}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <Activity size={18} />
              <h4>Volume de Descarte Semanal</h4>
            </div>
            <div className={styles.cardSelect}>
              <Calendar size={14} />
              <span>Últimos 7 dias</span>
            </div>
          </div>
          <div className={styles.chartBody}>
            <div className={styles.barGrid}>
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className={styles.barWrapper}>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={styles.bar}
                  />
                </div>
              ))}
            </div>
            <div className={styles.barLabels}>
              <span>SEG</span><span>TER</span><span>QUA</span><span>QUI</span><span>SEX</span><span>SAB</span><span>DOM</span>
            </div>
          </div>
        </div>

        {/* Atividade Recente e Coletores */}
        <div className={styles.sideCol}>
          <div className={styles.activityCard}>
            <div className={styles.cardHeader}>
              <h4>Atividade em Tempo Real</h4>
              <MoreHorizontal size={18} className={styles.moreIcon} />
            </div>
            <div className={styles.activityList}>
              {requests.slice(0, 5).map((req, i) => (
                <div key={req.id} className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                     <Clock size={14} />
                  </div>
                  <div className={styles.activityInfo}>
                    <p><strong>Apto {req.apartment}</strong> solicitou {req.residueType.toLowerCase()}</p>
                    <div className={styles.activityMeta}>
                      <span>{new Date(req.createdAt).toLocaleTimeString([], { hour: '2d', minute: '2d' })}</span>
                      <span className={styles.statusTag} data-status={req.status}>
                        {req.status === 'PENDENTE' ? 'Pendente' : 'Em Rota'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {requests.length === 0 && <p className={styles.empty}>Sem atividades recentes.</p>}
            </div>
          </div>

          <div className={styles.collectorsCard}>
            <h4>Coletores de Plantão</h4>
            <div className={styles.collectorsList}>
               <div className={styles.collectorMini}>
                  <div className={styles.cAvatar} style={{ background: '#3b82f6' }}>JS</div>
                  <div className={styles.cInfo}>
                    <strong>João Silva</strong>
                    <span>Disponível</span>
                  </div>
                  <div className={styles.cStatus} />
               </div>
               <div className={styles.collectorMini}>
                  <div className={styles.cAvatar} style={{ background: '#10b981' }}>MO</div>
                  <div className={styles.cInfo}>
                    <strong>Maria Oliveira</strong>
                    <span>Em Coleta</span>
                  </div>
                  <div className={styles.cStatus} style={{ background: '#f59e0b' }} />
               </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
