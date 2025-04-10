import { axiosPrivate, axiosPublic } from "@/axios/axios";
import { Team, CreateTeamDto, UpdateTeamDto, ApiResponse } from "@/types/team.type";



class TeamService {
  async getAllTeam(): Promise<ApiResponse<Team[]>> {
    try {
      const res = await axiosPublic.get("/Team");
      return {
        success: true,
        data: res.data,
        message: "Teams fetched successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async getTeamById(id: string): Promise<ApiResponse<Team>> {
    try {
      const res = await axiosPublic.get(`/Team/${id}`);
      return {
        success: true,
        data: res.data,
        message: "Team fetched",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async createTeam(data: CreateTeamDto): Promise<ApiResponse<Team>> {
    try {
      const res = await axiosPublic.post("/Team", data);
      console.log(res.data, "createTeam");
      return {
        success: true,
        data: res.data,
        message: "Team created successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async updateTeam(
    id: string,
    data: UpdateTeamDto
  ): Promise<ApiResponse<Team>> {
    try {
        const res = await axiosPublic.put(`/Team/${id}`, data);
      return {
        success: true,
        data: res.data,
        message: "Team updated successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async deleteTeam(id: string): Promise<ApiResponse<null>> {
    try {
      const res = await axiosPublic.delete(`/Team/${id}`);
      return {
        success: true,
        data: null,
        message: "Team deleted successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): ApiResponse<any> {
    return {
      success: false,
      data: null,
      message: error?.response?.data?.message || "Something went wrong",
      status: error?.response?.status || 500,
      error: error?.response?.data?.errors || null,
    };
  }
}

export default new TeamService();
