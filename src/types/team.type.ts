// src/types/team.type.ts
export interface Team {
  id: string; // Guid as string
  name: string;
  description: string;
  profileImageUrl?: string;
  specialty: string;
}

export interface CreateTeamDto {
  name: string;
  description: string;
  profileImageUrl?: string;
  specialty: string;
}

export interface UpdateTeamDto {
  id: string;
  name: string;
  description: string;
  profileImageUrl?: string;
  specialty: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  status: number;
  error?: any;
}
