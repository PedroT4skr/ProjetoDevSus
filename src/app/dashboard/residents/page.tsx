'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Filter, MoreVertical, Mail, MapPin, Calendar } from 'lucide-react';
import styles from './residents.module.css';

export default function ResidentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock de moradores
  const residents = [
    { id: 1, name: 'Carlos Alberto', email: 'carlos@email.com', apt: '101', joined: '12/01/2024', requests: 45 },
    { id: 2, name: 'Ana Beatriz', email: 'ana@email.com', apt: '402', joined: '15/02/2024', requests: 12 },
    { id: 3, name: 'Roberto Lima', email: 'roberto@email.com', apt: '205', joined: '03/03/2024', requests: 8 },
    { id: 4, name: 'Fernanda Souza', email: 'fernanda@email.com', apt: '1103', joined: '10/04/2024', requests: 29 },
    { id: 5, name: 'João Mendes', email: 'joao@email.com', apt: '601', joined: '22/04/2024', requests: 3 },
  ];

  const filteredResidents = residents.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.apt.includes(searchTerm)
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.container}
    >
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1>Gestão de Moradores</h1>
          <p>Total de {residents.length} moradores cadastrados no sistema.</p>
        </div>
        <button className={styles.addBtn}>
          <Plus size={18} /> Novo Morador
        </button>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou apartamento..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className={styles.filterBtn}>
          <Filter size={18} /> Filtros
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Contato</th>
              <th>Apto</th>
              <th>Desde</th>
              <th>Coletas</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredResidents.map((res) => (
              <tr key={res.id}>
                <td>
                  <div className={styles.userName}>
                    <div className={styles.avatar}>{res.name.charAt(0)}</div>
                    <span>{res.name}</span>
                  </div>
                </td>
                <td>
                   <div className={styles.contactInfo}>
                      <Mail size={14} /> {res.email}
                   </div>
                </td>
                <td>
                  <div className={styles.aptInfo}>
                    <MapPin size={14} /> {res.apt}
                  </div>
                </td>
                <td>
                  <div className={styles.dateInfo}>
                    <Calendar size={14} /> {res.joined}
                  </div>
                </td>
                <td>
                  <span className={styles.requestBadge}>{res.requests}</span>
                </td>
                <td>
                  <button className={styles.actionBtn}><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
