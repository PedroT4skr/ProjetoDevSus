export type UserRole = 'MORADOR' | 'COLETOR' | 'ADMIN';

export type ResidueType = 'PLASTICO' | 'PAPEL' | 'VIDRO' | 'METAL' | 'ORGANICO';

export type RequestStatus = 'PENDENTE' | 'EM_ROTA' | 'COLETADO' | 'CANCELADO';

export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
  apartment?: string;
  block?: string;
  createdAt: string;
}

export interface CollectionRequest {
  id: string;
  residentId: string;
  residentName: string;
  apartment: string;
  residueType: ResidueType;
  status: RequestStatus;
  availableTime: string;
  observation?: string;
  collectorId?: string;
  createdAt: string;
}

export interface Schedule {
  id: string;
  collectorId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}
