'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Truck, Star, MapPin, Clock, Phone } from 'lucide-react';
import styles from './collectors.module.css';

const MOCK_COLLECTORS = [
  { id: 1, name: 'João Silva', email: 'joao.s@consus.com', phone: '(11) 98765-4321', rating: 4.9, coletas: 124, status: 'Em Rota', vehicle: 'EcoTruck 01' },
  { id: 2, name: 'Maria Oliveira', email: 'maria.o@consus.com', phone: '(11) 98765-4322', rating: 4.8, coletas: 89, status: 'Disponível', vehicle: 'EcoTruck 03' },
  { id: 3, name: 'Carlos Santos', email: 'carlos.s@consus.com', phone: '(11) 98765-4323', rating: 4.7, coletas: 215, status: 'Folga', vehicle: 'EcoTruck 02' },
  { id: 4, name: 'Roberto Lima', email: 'roberto.l@consus.com', phone: '(11) 98765-4324', rating: 5.0, coletas: 45, status: 'Em Rota', vehicle: 'EcoTruck 05' },
  { id: 5, name: 'Sandra Rosa', email: 'sandra.r@consus.com', phone: '(11) 98765-4325', rating: 4.6, coletas: 156, status: 'Manutenção', vehicle: 'EcoTruck 04' },
];

export default function CollectorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={styles.container}
    >
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1>Gestão de Coletores</h1>
          <p>Monitore a performance, disponibilidade e rotas da equipe de coleta.</p>
        </div>
        <button className={styles.addBtn}>
          <Plus size={18} /> Novo Coletor
        </button>
      </header>

      <div className={styles.statsRow}>
        <div className={styles.miniStat}>
          <span>Coletores Ativos</span>
          <strong>{MOCK_COLLECTORS.filter(c => c.status !== 'Folga').length}</strong>
        </div>
        <div className={styles.miniStat}>
          <span>Em Rota agora</span>
          <strong>{MOCK_COLLECTORS.filter(c => c.status === 'Em Rota').length}</strong>
        </div>
        <div className={styles.miniStat}>
          <span>Avaliação Média</span>
          <strong>4.8 <Star size={16} fill="#f59e0b" color="#f59e0b" /></strong>
        </div>
      </div>

      <div className={styles.grid}>
        {MOCK_COLLECTORS.map((col) => (
          <motion.div 
            key={col.id} 
            whileHover={{ y: -5 }}
            className={styles.collectorCard}
          >
            <div className={styles.cardTop}>
              <div className={styles.mainInfo}>
                <div className={styles.avatar}>{col.name.charAt(0)}</div>
                <div>
                  <h3>{col.name}</h3>
                  <span className={styles.vehicleTag}>{col.vehicle}</span>
                </div>
              </div>
              <span className={styles.statusBadge} data-status={col.status}>
                {col.status}
              </span>
            </div>

            <div className={styles.cardStats}>
              <div className={styles.statItem}>
                <Star size={14} color="#f59e0b" />
                <span>{col.rating}</span>
              </div>
              <div className={styles.statItem}>
                <Truck size={14} color="#3b82f6" />
                <span>{col.coletas} coletas</span>
              </div>
            </div>

            <div className={styles.cardActions}>
               <button className={styles.actionBtn} title="Ligar"><Phone size={16} /></button>
               <button className={styles.actionBtn} title="Ver Rota"><MapPin size={16} /></button>
               <button className={styles.actionBtn} title="Histórico"><Clock size={16} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
