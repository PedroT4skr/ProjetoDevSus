'use client';

import { useState, useEffect } from 'react';
import { RequestRepository } from '@/services/repositories';
import { CollectionRequest } from '@/lib/types';
import { 
  Users, 
  Truck, 
  Trash2,
  TrendingUp,
  Activity
} from 'lucide-react';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const [requests, setRequests] = useState<CollectionRequest[]>([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const allReqs = await RequestRepository.getAll();
      setRequests(allReqs);
      // Simulação de contagem de usuários
      setUserCount(12); // Mock
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Total Coletas', value: requests.length, icon: Trash2, color: '#10b981' },
    { label: 'Usuários Ativos', value: userCount, icon: Users, color: '#3b82f6' },
    { label: 'Em Andamento', value: requests.filter(r => r.status === 'EM_ROTA').length, icon: Truck, color: '#f59e0b' },
    { label: 'Taxa Reciclagem', value: '84%', icon: TrendingUp, color: '#8b5cf6' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Visão Geral do Condomínio</h2>
        <p>Relatórios e estatísticas em tempo real.</p>
      </header>

      <div className={styles.statsGrid}>
        {stats.map(stat => (
          <div key={stat.label} className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: `${stat.color}15`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className={styles.statContent}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartPlaceholder}>
          <div className={styles.chartHeader}>
            <Activity size={18} />
            <h4>Volume de Coletas (Semanal)</h4>
          </div>
          <div className={styles.barGrid}>
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <div key={i} className={styles.bar} style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className={styles.barLabels}>
            <span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span><span>D</span>
          </div>
        </div>

        <div className={styles.recentActivity}>
          <h4>Atividade Recente</h4>
          <div className={styles.activityList}>
            {requests.slice(0, 4).map(req => (
              <div key={req.id} className={styles.activityItem}>
                <div className={styles.dot}></div>
                <div className={styles.activityInfo}>
                  <p><strong>Apto {req.apartment}</strong> solicitou coleta de {req.residueType.toLowerCase()}</p>
                  <span>{new Date(req.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
            {requests.length === 0 && <p className={styles.empty}>Sem atividades recentes.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
