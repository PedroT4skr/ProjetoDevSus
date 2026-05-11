'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { RequestRepository } from '@/services/repositories';
import { CollectionRequest, ResidueType } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  AlertCircle,
  Package,
  ArrowRight,
  Leaf
} from 'lucide-react';
import styles from './ResidentDashboard.module.css';

const RESIDUE_TYPES: { type: ResidueType; icon: string; label: string; color: string }[] = [
  { type: 'PLASTICO', icon: '🥤', label: 'Plástico', color: '#60a5fa' },
  { type: 'PAPEL', icon: '📄', label: 'Papel', color: '#fbbf24' },
  { type: 'VIDRO', icon: '🍾', label: 'Vidro', color: '#10b981' },
  { type: 'METAL', icon: '🥫', label: 'Metal', color: '#94a3b8' },
  { type: 'ORGANICO', icon: '🍎', label: 'Orgânico', color: '#8b5cf6' },
];

export default function ResidentDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<CollectionRequest[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState<{
    type: ResidueType | '';
    time: string;
    obs: string;
  }>({ type: '', time: '', obs: '' });

  useEffect(() => {
    let isMounted = true;
    const fetch = async () => {
      if (user) {
        const data = await RequestRepository.getByResident(user.id);
        if (isMounted) setRequests(data);
      }
    };
    fetch();
    return () => { isMounted = false; };
  }, [user]);

  const handleCreateRequest = async () => {
    if (!user || !newRequest.type) return;

    await RequestRepository.create({
      residentId: user.id,
      residentName: user.name,
      apartment: user.apartment || '',
      residueType: newRequest.type as ResidueType,
      status: 'PENDENTE',
      availableTime: newRequest.time,
      observation: newRequest.obs
    });

    setIsModalOpen(false);
    setNewRequest({ type: '', time: '', obs: '' });
    loadRequests();
  };

  const activeRequest = requests.find(r => r.status !== 'COLETADO' && r.status !== 'CANCELADO');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h2>Olá, {user?.name.split(' ')[0]} 👋</h2>
          <p>Como está o descarte hoje?</p>
        </div>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
          <Plus size={20} /> Nova Solicitação
        </button>
      </header>

      <section className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#d1fae5', color: '#059669' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h3>{requests.filter(r => r.status === 'COLETADO').length}</h3>
            <p>Coletas Realizadas</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#fef3c7', color: '#d97706' }}>
            <Clock size={24} />
          </div>
          <div>
            <h3>{requests.filter(r => r.status === 'PENDENTE' || r.status === 'EM_ROTA').length}</h3>
            <p>Em Andamento</p>
          </div>
        </div>
      </section>

      {activeRequest ? (
        <section className={styles.activeSection}>
          <div className={styles.sectionHeader}>
            <h3>Próxima Coleta</h3>
            <span className={`${styles.badge} ${styles[activeRequest.status.toLowerCase()]}`}>
              {activeRequest.status}
            </span>
          </div>
          <div className={styles.activeCard}>
             <div className={styles.activeInfo}>
                <div className={styles.residueIconBig}>
                  {RESIDUE_TYPES.find(t => t.type === activeRequest.residueType)?.icon}
                </div>
                <div>
                  <h4>{activeRequest.residueType}</h4>
                  <p><Clock size={14} /> Disponível às: {activeRequest.availableTime}</p>
                </div>
             </div>
             <div className={styles.steps}>
                <div className={`${styles.step} ${styles.active}`}>
                  <div className={styles.stepCircle}><CheckCircle2 size={16} /></div>
                  <span>Solicitado</span>
                </div>
                <div className={`${styles.step} ${activeRequest.status === 'EM_ROTA' ? styles.active : ''}`}>
                  <div className={styles.stepCircle}><Package size={16} /></div>
                  <span>Em Rota</span>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepCircle}><Trash2 size={16} /></div>
                  <span>Coletado</span>
                </div>
             </div>
          </div>
        </section>
      ) : (
        <section className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Leaf size={48} />
          </div>
          <h3>Tudo limpo por aqui!</h3>
          <p>Sua lixeira está vazia. Que tal separar algo para reciclar?</p>
          <button className={styles.outlineButton} onClick={() => setIsModalOpen(true)}>
            Solicitar Agora
          </button>
        </section>
      )}

      {/* Modal de Solicitação */}
      <AnimatePresence>
        {isModalOpen && (
          <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
            <motion.div 
              className={styles.modal} 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h3>Solicitar Coleta</h3>
                <button onClick={() => setIsModalOpen(false)}><AlertCircle size={24} /></button>
              </div>

              <div className={styles.modalBody}>
                <label>Tipo de Resíduo</label>
                <div className={styles.typeGrid}>
                  {RESIDUE_TYPES.map(t => (
                    <button 
                      key={t.type}
                      className={`${styles.typeButton} ${newRequest.type === t.type ? styles.selectedType : ''}`}
                      onClick={() => setNewRequest({...newRequest, type: t.type})}
                      style={{ '--hover-color': t.color } as React.CSSProperties}
                    >
                      <span className={styles.typeIcon}>{t.icon}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Horário de Disponibilidade</label>
                    <input 
                      type="time" 
                      className={styles.input}
                      value={newRequest.time}
                      onChange={e => setNewRequest({...newRequest, time: e.target.value})}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Observações (Opcional)</label>
                  <textarea 
                    className={styles.textarea}
                    placeholder="Ex: Deixarei na porta do bloco..."
                    value={newRequest.obs}
                    onChange={e => setNewRequest({...newRequest, obs: e.target.value})}
                  />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button className={styles.cancelButton} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button 
                  className={styles.confirmButton} 
                  disabled={!newRequest.type || !newRequest.time}
                  onClick={handleCreateRequest}
                >
                  Confirmar <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
