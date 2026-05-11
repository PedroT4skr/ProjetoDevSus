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

  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % 2);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

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
          <p>Seu condomínio já reciclou um total de <strong>128kg</strong> este mês.</p>
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

      <section className={styles.statsRow}>
        <div className={styles.statMiniCard}>
          <div className={styles.statMiniIcon} style={{ background: '#ecfdf5', color: '#10b981' }}>
            <CheckCircle2 size={18} />
          </div>
          <div className={styles.statMiniInfo}>
            <span>{requests.filter(r => r.status === 'COLETADO').length}</span>
            <p>Concluídas</p>
          </div>
          <span className={styles.miniTrend}>+12%</span>
        </div>
        
        <div className={styles.statMiniCard}>
          <div className={styles.statMiniIcon} style={{ background: '#fffbeb', color: '#f59e0b' }}>
            <Clock size={18} />
          </div>
          <div className={styles.statMiniInfo}>
            <span>{requests.filter(r => r.status === 'PENDENTE' || r.status === 'EM_ROTA').length}</span>
            <p>Em progresso</p>
          </div>
        </div>

        <div className={styles.statMiniCard}>
          <div className={styles.statMiniIcon} style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <Zap size={18} />
          </div>
          <div className={styles.statMiniInfo}>
            <span>450</span>
            <p>EcoPoints</p>
          </div>
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

        <section className={styles.carouselCard}>
          <AnimatePresence mode="wait">
            {carouselIndex === 0 ? (
              <motion.div 
                key="impact"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={styles.carouselContent}
              >
                <div className={styles.impactHeader}>
                  <div className={styles.impactIconBox}><Star size={20} /></div>
                  <h4>Seu EcoImpacto</h4>
                </div>
                <div className={styles.impactMain}>
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={styles.impactValue}
                  >
                    12.4<span>kg</span>
                  </motion.div>
                  <p>CO2 evitado este mês</p>
                </div>
                <div className={styles.impactFooter}>
                  <div className={styles.treeProgress}>
                    <div className={styles.treeIcon}>🌳</div>
                    <div className={styles.treeText}>
                       <strong>5 Árvores</strong>
                       <span>Salvas pela sua ação</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="tips"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={styles.carouselContent}
              >
                <div className={styles.impactHeader}>
                  <Sparkles size={24} className={styles.impactIcon} />
                  <h4>Dicas de Reciclagem</h4>
                </div>
                <div className={styles.tipsList}>
                  <div className={styles.miniTip}>
                    <span>💡</span>
                    <p><strong>Lave as embalagens:</strong> Retirar restos de comida ajuda no valor do material.</p>
                  </div>
                  <div className={styles.miniTip}>
                    <span>📦</span>
                    <p><strong>Compacte caixas:</strong> Economiza espaço e facilita o transporte.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className={styles.carouselDots}>
            <div className={`${styles.dot} ${carouselIndex === 0 ? styles.activeDot : ''}`} />
            <div className={`${styles.dot} ${carouselIndex === 1 ? styles.activeDot : ''}`} />
          </div>
        </section>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
          <section className={styles.historySection}>
            <div className={styles.sectionHeader}>
              <h3>Histórico de Coletas</h3>
              <span className={styles.historyBadge}>{requests.length} total</span>
            </div>

            <div className={styles.historyList}>
              {requests.length > 0 ? (
                <>
                  {requests.slice(0, 3).map(req => (
                    <div key={req.id} className={styles.historyItem}>
                      <div className={styles.historyIcon}>{RESIDUE_TYPES.find(t => t.type === req.residueType)?.icon}</div>
                      <div className={styles.historyInfo}>
                        <div className={styles.historyRow}>
                          <h4>{req.residueType}</h4>
                          <span className={`${styles.statusBadge} ${styles[req.status.toLowerCase()]}`}>
                            {req.status === 'COLETADO' ? 'Concluído' : req.status === 'PENDENTE' ? 'Aguardando' : req.status === 'EM_ROTA' ? 'Em Rota' : 'Cancelado'}
                          </span>
                        </div>
                        <p>{req.status === 'COLETADO' ? 'Coletado em 12/05' : req.status === 'PENDENTE' ? 'Disponível às ' + req.availableTime : 'Status: ' + req.status}</p>
                      </div>
                    </div>
                  ))}
                  {requests.length > 3 && (
                    <button 
                      className={styles.viewAllButton}
                      onClick={() => router.push('/dashboard/history')}
                    >
                      Ver todo o histórico <ArrowUpRight size={14} />
                    </button>
                  )}
                </>
              ) : (
                <div className={styles.emptyHistory}>
                  <p>Nenhuma coleta registrada.</p>
                  <button className={styles.outlineButton} onClick={() => setIsModalOpen(true)}>
                    Fazer minha primeira coleta
                  </button>
                </div>
              )}
            </div>
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
