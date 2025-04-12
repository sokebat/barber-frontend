// src/services/team.service.ts
import { axiosPublic } from '@/axios/axios';
import { Team, CreateTeamDto, UpdateTeamDto, ApiResponse } from '@/types/team.type';

class TeamService {
  async getAllTeam(): Promise<ApiResponse<Team[]>> {
    try {
      const res = await axiosPublic.get('/Team');
      return {
        success: true,
        data: res.data,
        message: 'Teams fetched successfully',
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error, 'Failed to fetch teams');
    }
  }

  async getTeamById(id: string): Promise<ApiResponse<Team>> {
    try {
      const res = await axiosPublic.get(`/Team/${id}`);
      return {
        success: true,
        data: res.data,
        message: 'Team fetched successfully',
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error, `Failed to fetch team with ID: ${id}`);
    }
  }

  async createTeam(data: CreateTeamDto): Promise<ApiResponse<Team>> {
    try {
      // Validate required fields before sending to API
      if (!data.name.trim()) {
        return {
          success: false,
          data: null,
          message: 'Name is required',
          status: 400,
        };
      }
      if (!data.specialty.trim()) {
        return {
          success: false,
          data: null,
          message: 'Specialty is required',
          status: 400,
        };
      }

      const res = await axiosPublic.post('/Team', data);
      return {
        success: true,
        data: res.data,
        message: 'Team created successfully',
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error, 'Failed to create team');
    }
  }

  async updateTeam(id: string, data: UpdateTeamDto): Promise<ApiResponse<Team>> {
    try {
      // Validate required fields before sending to API
      if (!data.name.trim()) {
        return {
          success: false,
          data: null,
          message: 'Name is required',
          status: 400,
        };
      }
      if (!data.specialty.trim()) {
        return {
          success: false,
          data: null,
          message: 'Specialty is required',
          status: 400,
        };
      }
      
      // Ensure ID in data matches URL parameter
      if (id !== data.id.toString()) {
        return {
          success: false,
          data: null,
          message: 'ID mismatch between URL and data',
          status: 400,
        };
      }

      const res = await axiosPublic.put(`/Team/${id}`, data);
      return {
        success: true,
        data: res.data,
        message: 'Team updated successfully',
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error, `Failed to update team with ID: ${id}`);
    }
  }

  async deleteTeam(id: string): Promise<ApiResponse<null>> {
    try {
      const res = await axiosPublic.delete(`/Team/${id}`);
      return {
        success: true,
        data: null,
        message: 'Team deleted successfully',
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error, `Failed to delete team with ID: ${id}`);
    }
  }

  private handleError(error: any, defaultMessage: string): ApiResponse<any> {
    // Check for network errors
    if (error.code === 'ERR_NETWORK') {
      return {
        success: false,
        data: null,
        message: 'Network error. Please check your internet connection.',
        status: 0,
        error: error,
      };
    }
    
    // Check for timeout errors
    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        data: null,
        message: 'Request timed out. Please try again later.',
        status: 408,
        error: error,
      };
    }

    // Handle HTTP errors with response
    if (error.response) {
      // Extract API error message if available
      const errorMessage = error.response.data?.message || 
                          (error.response.data?.errors && 
                           Object.values(error.response.data.errors).flat().join(', ')) || 
                          defaultMessage;
      
      // Handle different status codes
      switch (error.response.status) {
        case 400:
          return {
            success: false,
            data: null,
            message: errorMessage || 'Invalid request data',
            status: error.response.status,
            error: error.response.data?.errors || null,
          };
        case 401:
          return {
            success: false,
            data: null,
            message: 'Authentication required. Please login again.',
            status: error.response.status,
            error: error.response.data?.errors || null,
          };
        case 403:
          return {
            success: false,
            data: null,
            message: 'You do not have permission to perform this action.',
            status: error.response.status,
            error: error.response.data?.errors || null,
          };
        case 404:
          return {
            success: false,
            data: null,
            message: errorMessage || 'Resource not found',
            status: error.response.status,
            error: error.response.data?.errors || null,
          };
        case 409:
          return {
            success: false,
            data: null,
            message: errorMessage || 'Conflict with existing data',
            status: error.response.status,
            error: error.response.data?.errors || null,
          };
        case 422:
          return {
            success: false,
            data: null,
            message: errorMessage || 'Validation error',
            status: error.response.status,
            error: error.response.data?.errors || null,
          };
        case 500:
        case 502:
        case 503:
          return {
            success: false,
            data: null,
            message: 'Server error. Please try again later.',
            status: error.response.status,
            error: error.response.data?.errors || null,
          };
        default:
          return {
            success: false,
            data: null,
            message: errorMessage || defaultMessage,
            status: error.response.status,
            error: error.response.data?.errors || null,
          };
      }
    }

    // Generic error fallback
    return {
      success: false,
      data: null,
      message: defaultMessage,
      status: 500,
      error: error,
    };
  }
}

export default new TeamService();