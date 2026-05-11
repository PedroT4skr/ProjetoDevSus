'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { RequestRepository } from '@/services/repositories';
import { CollectionRequest } from '@/lib/types';
import { 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Navigation, 
  Package,
  AlertCircle
} from 'lucide-react';
import styles from './CollectorDashboard.module.css';

export default function CollectorDashboard() {
  const { user } = useAuth();
  const [pendingRequests, setPendingRequests] = useState<CollectionRequest[]>([]);
  const [myTasks, setMyTasks] = useState<CollectionRequest[]>([]);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      if (!user) return;
      const pending = await RequestRepository.getPending();
      const tasks = await RequestRepository.getByCollector(user.id);
      if (isMounted) {
        setPendingRequests(pending);
        setMyTasks(tasks.filter(t => t.status === 'EM_ROTA'));
      }
    };

    loadData();
    const interval = setInterval(loadData, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [user]);

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
        <div>
          <h2>Painel de Coletas</h2>
          <p>Gerencie suas rotas e tarefas de hoje.</p>
        </div>
        <div className={styles.statusBadge}>
          <span className={styles.dot}></span> Online
        </div>
      </header>

      {myTasks.length > 0 && (
        <section className={styles.activeSection}>
          <div className={styles.sectionHeader}>
            <Navigation size={20} className={styles.primaryIcon} />
            <h3>Minhas Rotas Atuais</h3>
          </div>
          <div className={styles.taskGrid}>
            {myTasks.map(task => (
              <div key={task.id} className={styles.taskCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.residentInfo}>
                    <div className={styles.avatarSmall}>{task.residentName.charAt(0)}</div>
                    <div>
                      <h4>{task.residentName}</h4>
                      <p>Apto {task.apartment}</p>
                    </div>
                  </div>
                  <span className={styles.typeBadge}>{task.residueType}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.detail}>
                    <Clock size={16} /> <span>Disponível: {task.availableTime}</span>
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
                  <CheckCircle2 size={18} /> Marcar como Coletado
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className={styles.pendingSection}>
        <div className={styles.sectionHeader}>
          <Package size={20} className={styles.secondaryIcon} />
          <h3>Solicitações Pendentes ({pendingRequests.length})</h3>
        </div>

        {pendingRequests.length === 0 ? (
          <div className={styles.emptyState}>
            <CheckCircle2 size={48} color="var(--primary)" />
            <p>Nenhuma solicitação pendente no momento.</p>
          </div>
        ) : (
          <div className={styles.list}>
            {pendingRequests.map(req => (
              <div key={req.id} className={styles.listCard}>
                <div className={styles.listMain}>
                  <div className={styles.locationInfo}>
                    <MapPin size={20} color="var(--primary)" />
                    <div>
                      <span className={styles.locName}>Apartamento {req.apartment}</span>
                      <span className={styles.locSub}>{req.residueType} • {req.availableTime}</span>
                    </div>
                  </div>
                  <button 
                    className={styles.acceptButton}
                    onClick={() => handleAccept(req.id)}
                  >
                    Aceitar Coleta
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
