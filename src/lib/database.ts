import { User, CollectionRequest } from '../types';

const STORAGE_KEYS = {
  USERS: 'devsus_users',
  REQUESTS: 'devsus_requests',
  SCHEDULES: 'devsus_schedules',
  LOGGED_USER: 'devsus_auth_user'
};

class MockDatabase {
  private get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }

  private set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Users
  getUsers(): User[] {
    return this.get<User[]>(STORAGE_KEYS.USERS, []);
  }

  saveUser(user: User): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index > -1) {
      users[index] = user;
    } else {
      users.push(user);
    }
    this.set(STORAGE_KEYS.USERS, users);
  }

  // Requests
  getRequests(): CollectionRequest[] {
    return this.get<CollectionRequest[]>(STORAGE_KEYS.REQUESTS, []);
  }

  saveRequest(request: CollectionRequest): void {
    const requests = this.getRequests();
    const index = requests.findIndex(r => r.id === request.id);
    if (index > -1) {
      requests[index] = request;
    } else {
      requests.unshift(request);
    }
    this.set(STORAGE_KEYS.REQUESTS, requests);
  }

  // Auth
  getLoggedUser(): User | null {
    return this.get<User | null>(STORAGE_KEYS.LOGGED_USER, null);
  }

  setLoggedUser(user: User | null): void {
    this.set(STORAGE_KEYS.LOGGED_USER, user);
  }

  // Initial Seed
  seed(): void {
    if (this.getUsers().length === 0) {
      const admin: User = {
        id: 'admin-1',
        email: 'admin@devsus.com',
        password: 'admin',
        name: 'Administrador Sistema',
        role: 'ADMIN',
        createdAt: new Date().toISOString()
      };
      this.saveUser(admin);
      
      const collector: User = {
        id: 'collector-1',
        email: 'joao@coletor.com',
        password: '123',
        name: 'João Coletor',
        role: 'COLETOR',
        createdAt: new Date().toISOString()
      };
      this.saveUser(collector);
    }
  }
}

export const db = new MockDatabase();
