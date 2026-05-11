'use client';

import { useState, useEffect, useCallback } from 'react';
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
  Leaf,
  Bell,
  Trophy,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  Zap,
  Star
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
  const [activeTab, setActiveTab] = useState<'PROXIMA' | 'HISTORICO'>('PROXIMA');
  const [newRequest, setNewRequest] = useState<{
    type: ResidueType | '';
    time: string;
    obs: string;
  }>({ type: '', time: '', obs: '' });

  const loadRequests = useCallback(async () => {
    if (user) {
      const data = await RequestRepository.getByResident(user.id);
      setRequests(data);
    }
  }, [user]);

  useEffect(() => {
    const init = async () => {
      await loadRequests();
    };
    init();
  }, [loadRequests]);

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
        <div className={styles.welcomeInfo}>
          <h2>Olá, {user?.name.split(' ')[0]}! 👋</h2>
          <p>O seu condomínio já reciclou um total de <strong>128kg</strong> este mês.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.iconButton} onClick={() => alert('Chat em breve!')}><MessageSquare size={20} /></button>
          <button className={styles.iconButton} onClick={() => alert('Notificações em breve!')}><Bell size={20} /></button>
        </div>
      </header>

      {/* Floating Background Elements */}
      <div className={styles.floatingLayer}>
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className={styles.floatingLeaf1}><Leaf size={24} /></motion.div>
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }} className={styles.floatingLeaf2}><Leaf size={16} /></motion.div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className={styles.floatingStar}><Sparkles size={20} /></motion.div>
      </div>

      <div className={styles.topGrid}>
        <section className={styles.heroCard}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}><Sparkles size={14} /> Novo no App</div>
            <h3>Facilite seu descarte</h3>
            <p>Solicite a coleta de recicláveis em segundos e ajude a transformar o futuro do nosso planeta.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.ctaButton} 
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={20} /> Solicitar Coleta
            </motion.button>
          </div>
          <div className={styles.heroComposition}>
             <div className={styles.compIcon1}><Trash2 size={48} /></div>
             <div className={styles.compIcon2}><Package size={40} /></div>
             <div className={styles.compIcon3}><Leaf size={32} /></div>
             <div className={styles.compCircle}></div>
          </div>
        </section>

      <section className={styles.newsBanner}>
        <div className={styles.newsTitle}>Notícias Verdes 🌿</div>
        <div className={styles.newsContent}>
          <motion.div 
            animate={{ x: [0, -200, 0] }} 
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className={styles.newsTrack}
          >
            <span>🎉 Condomínio bateu a meta de reciclagem de papel!</span>
            <span className={styles.newsDivider}>|</span>
            <span>🚛 Nova coleta de eletrônicos neste sábado às 10h.</span>
            <span className={styles.newsDivider}>|</span>
            <span>💡 Dica: Lave suas embalagens de iogurte antes de descartar.</span>
          </motion.div>
        </div>
      </section>

      <div className={styles.topGrid}>
        <section className={styles.heroCard}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}><Sparkles size={14} /> Novo no App</div>
            <h3>Facilite seu descarte</h3>
            <p>Solicite a coleta de recicláveis em segundos.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.ctaButton} 
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={20} /> Solicitar Coleta
            </motion.button>
          </div>
          <div className={styles.heroComposition}>
             <div className={styles.compIcon1}><Trash2 size={48} /></div>
             <div className={styles.compIcon2}><Package size={40} /></div>
             <div className={styles.compIcon3}><Leaf size={32} /></div>
             <div className={styles.compCircle}></div>
          </div>
        </section>

        <section className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#ecfdf5', color: '#10b981' }}>
              <CheckCircle2 size={24} />
            </div>
            <div className={styles.statData}>
              <div className={styles.statHeader}>
                  <h3>{requests.filter(r => r.status === 'COLETADO').length}</h3>
                  <span className={styles.trend}><ArrowUpRight size={12} /> +12%</span>
              </div>
              <p>Concluídas</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fffbeb', color: '#f59e0b' }}>
              <Clock size={24} />
            </div>
            <div className={styles.statData}>
              <h3>{requests.filter(r => r.status === 'PENDENTE' || r.status === 'EM_ROTA').length}</h3>
              <p>Em progresso</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#eff6ff', color: '#3b82f6' }}>
              <Zap size={24} />
            </div>
            <div className={styles.statData}>
              <h3>450</h3>
              <p>EcoPoints</p>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
          <section className={styles.activeSection}>
            <div className={styles.sectionHeader}>
              <h3>Painel de Ações</h3>
                <div className={styles.tabs}>
                    <button 
                      className={activeTab === 'PROXIMA' ? styles.activeTab : styles.tab}
                      onClick={() => setActiveTab('PROXIMA')}
                    >
                      Próxima Coleta
                    </button>
                    <button 
                      className={activeTab === 'HISTORICO' ? styles.activeTab : styles.tab}
                      onClick={() => setActiveTab('HISTORICO')}
                    >
                      Histórico
                    </button>
                </div>
            </div>

            {activeTab === 'PROXIMA' ? (
              activeRequest ? (
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
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>
                    <Leaf size={48} />
                  </div>
                  <h3>Tudo limpo!</h3>
                  <p>Que tal separar algo para reciclar agora?</p>
                  <button className={styles.outlineButton} onClick={() => setIsModalOpen(true)}>
                    Solicitar Coleta
                  </button>
                </div>
              )
            ) : (
              <div className={styles.historyList}>
                {requests.filter(r => r.status === 'COLETADO' || r.status === 'CANCELADO').length > 0 ? (
                  requests.filter(r => r.status === 'COLETADO' || r.status === 'CANCELADO').map(req => (
                    <div key={req.id} className={styles.historyItem}>
                      <div className={styles.historyIcon}>{RESIDUE_TYPES.find(t => t.type === req.residueType)?.icon}</div>
                      <div className={styles.historyInfo}>
                        <h4>{req.residueType}</h4>
                        <p>{req.status === 'COLETADO' ? 'Coletado em 12/05' : 'Cancelado'}</p>
                      </div>
                      <span className={styles.historyStatus}>{req.status}</span>
                    </div>
                  ))
                ) : (
                  <p className={styles.noHistory}>Nenhum histórico encontrado.</p>
                )}
              </div>
            )}
          </section>
        </div>

        <div className={styles.rightCol}>
          <section className={styles.rankingCard}>
            <div className={styles.cardHeader}>
                <h3>Ranking do Prédio</h3>
                <Trophy size={20} color="#f59e0b" />
            </div>
            <div className={styles.rankingList}>
                <div className={styles.rankingItem}>
                    <div className={styles.rankNum}>1</div>
                    <div className={styles.rankInfo}>
                        <span>Apt 102B</span>
                        <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '90%' }}></div></div>
                    </div>
                    <span className={styles.rankValue}>42kg</span>
                </div>
                <div className={styles.rankingItem}>
                    <div className={styles.rankNum}>2</div>
                    <div className={styles.rankInfo}>
                        <span>Apt 405A</span>
                        <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '75%' }}></div></div>
                    </div>
                    <span className={styles.rankValue}>38kg</span>
                </div>
                <div className={`${styles.rankingItem} ${styles.currentRank}`}>
                    <div className={styles.rankNum}>12</div>
                    <div className={styles.rankInfo}>
                        <span>Você (201C)</span>
                        <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '40%' }}></div></div>
                    </div>
                    <span className={styles.rankValue}>12.4kg</span>
                </div>
            </div>
          </section>

          <section className={styles.impactCard}>
            <div className={styles.impactIcon}><Star size={24} /></div>
            <h4>EcoImpacto</h4>
            <div className={styles.impactValue}>12.4kg</div>
            <p>CO2 evitado este mês</p>
            <div className={styles.impactDetail}>Equivalente a 5 árvores plantadas 🌳</div>
          </section>

          <section className={styles.tipsSection}>
            <h3>Dicas de Reciclagem</h3>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>💡</div>
              <div className={styles.tipText}>
                <h4>Lave as embalagens</h4>
                <p>Retirar restos de comida ajuda a manter o valor do material.</p>
              </div>
            </div>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>📦</div>
              <div className={styles.tipText}>
                <h4>Compacte caixas</h4>
                <p>Economiza espaço e facilita o transporte.</p>
              </div>
            </div>
          </section>
        </div>
      </div>

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
