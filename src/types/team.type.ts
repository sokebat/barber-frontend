// src/types/Team.types.ts

export interface Team {
    id: number;
    name: string;
    description: string;
    profileImageUrl: string;
    specialty: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateTeamDto {
    name: string;
    description: string;
    profileImageUrl: string;
    specialty: string;
  }
  
  export interface UpdateTeamDto {
    name?: string;
    description?: string;
    profileImageUrl?: string;
    specialty?: string;
  }
  

 export interface ApiResponse<T> {
    success: boolean;
    data: T | null;
    message: string;
    status: number;
    error?: any;
  }