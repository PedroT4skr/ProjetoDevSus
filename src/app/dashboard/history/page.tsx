'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { RequestRepository } from '@/services/repositories';
import { CollectionRequest } from '@/lib/types';
import { 
  Search, 
  Filter,
  ArrowUpDown
} from 'lucide-react';
import styles from './history.module.css';

export default function HistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState<CollectionRequest[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      let data: CollectionRequest[] = [];
      if (user.role === 'MORADOR') {
        data = await RequestRepository.getByResident(user.id);
      } else if (user.role === 'COLETOR') {
        data = await RequestRepository.getByCollector(user.id);
      } else {
        data = await RequestRepository.getAll();
      }
      setHistory(data);
    };
    fetchHistory();
  }, [user]);

  const filteredHistory = history.filter(h => 
    h.residueType.toLowerCase().includes(filter.toLowerCase()) ||
    h.apartment.includes(filter)
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Histórico de Atividades</h2>
        <p>Acompanhe todos os registros anteriores.</p>
      </header>

      <div className={styles.controls}>
        <div className={styles.search}>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Buscar por tipo ou apto..." 
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>
        <button className={styles.filterButton}>
          <Filter size={18} /> Filtrar
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Data <ArrowUpDown size={14} /></th>
              <th>Resíduo</th>
              <th>Local</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map(item => (
              <tr key={item.id}>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>{item.residueType}</td>
                <td>Apto {item.apartment}</td>
                <td>
                  <span className={`${styles.badge} ${styles[item.status.toLowerCase()]}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredHistory.length === 0 && (
          <div className={styles.empty}>Nenhum registro encontrado.</div>
        )}
      </div>
    </div>
  );
}
