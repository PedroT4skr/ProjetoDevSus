'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { RequestRepository } from '@/services/repositories';
import { CollectionRequest } from '@/lib/types';
import { 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Navigation, 
  Package,
  AlertCircle,
  TrendingUp,
  Zap,
  Route,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CollectorDashboard.module.css';

export default function CollectorDashboard() {
  const { user } = useAuth();
  const [pendingRequests, setPendingRequests] = useState<CollectionRequest[]>([]);
  const [myTasks, setMyTasks] = useState<CollectionRequest[]>([]);

  const loadData = useCallback(async () => {
    if (!user) return;
    const pending = await RequestRepository.getPending();
    const tasks = await RequestRepository.getByCollector(user.id);
    setPendingRequests(pending);
    setMyTasks(tasks.filter(t => t.status === 'EM_ROTA'));
  }, [user]);

  useEffect(() => {
    const init = async () => {
      await loadData();
    };
    init();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, [loadData]);

  const handleAccept = async (id: string) => {
    if (!user) return;
    await RequestRepository.updateStatus(id, 'EM_ROTA', user.id);
    loadData();
  };

  const handleComplete = async (id: string) => {
    await RequestRepository.updateStatus(id, 'COLETADO');
    loadData();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2>Painel do Coletor</h2>
          <p>Olá, {user?.name.split(' ')[0]}! Veja suas tarefas para hoje.</p>
        </motion.div>
      </header>

      <div className={styles.statsRow}>
        {[
          { label: 'Coletas Hoje', value: '12', icon: <Package size={20} />, delay: 0.1 },
          { label: 'EcoPontos', value: '450', icon: <Zap size={20} />, delay: 0.2 },
          { label: 'Km Estimados', value: '5.2', icon: <Route size={20} />, delay: 0.3 },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            className={styles.statCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stat.delay }}
          >
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statInfo}>
              <h4>{stat.value}</h4>
              <p>{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.mainGrid}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3><Navigation size={18} className={styles.activeIcon} /> Em Rota Agora</h3>
            <span className={styles.typeBadge}>{myTasks.length}</span>
          </div>
          <div className={styles.scrollArea}>
            <AnimatePresence mode="popLayout">
              {myTasks.length === 0 ? (
                <motion.div 
                  className={styles.emptyState}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <TrendingUp size={40} />
                  <p>Inicie uma coleta ao lado para começar sua rota.</p>
                </motion.div>
              ) : (
                myTasks.map(task => (
                  <motion.div 
                    key={task.id} 
                    className={styles.taskCard}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: 50 }}
                  >
                    <div className={styles.cardTop}>
                      <div className={styles.residentInfo}>
                        <div className={styles.avatar}>{task.residentName.charAt(0)}</div>
                        <div>
                          <h4>{task.residentName}</h4>
                          <p>Apto {task.apartment}</p>
                        </div>
                      </div>
                      <span className={styles.typeBadge}>{task.residueType}</span>
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.detail}>
                        <Clock size={16} /> {task.availableTime}
                      </div>
                      {task.observation && (
                        <div className={styles.observation}>
                          <AlertCircle size={14} /> {task.observation}
                        </div>
                      )}
                    </div>
                    <button 
                      className={styles.completeButton}
                      onClick={() => handleComplete(task.id)}
                    >
                      Finalizar Coleta
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3><Package size={18} className={styles.pendingIcon} /> Disponíveis para Coleta</h3>
            <span className={styles.typeBadge}>{pendingRequests.length}</span>
          </div>
          <div className={styles.scrollArea}>
            <AnimatePresence mode="popLayout">
              {pendingRequests.length === 0 ? (
                <motion.div 
                  className={styles.emptyState}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <CheckCircle2 size={40} />
                  <p>Bom trabalho! Nenhuma coleta pendente no momento.</p>
                </motion.div>
              ) : (
                pendingRequests.map(req => (
                  <motion.div 
                    key={req.id} 
                    className={styles.listCard}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                  >
                    <div className={styles.listMain}>
                      <div className={styles.locationInfo}>
                        <MapPin size={20} color="#2563eb" />
                        <div>
                          <span className={styles.locName}>Apartamento {req.apartment}</span>
                          <span className={styles.locSub}>{req.residueType} • {req.availableTime}</span>
                        </div>
                      </div>
                      <button 
                        className={styles.acceptButton}
                        onClick={() => handleAccept(req.id)}
                      >
                        Aceitar
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}
