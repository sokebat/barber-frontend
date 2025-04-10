// contexts/TeamContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import TeamService from "@/services/team.service"; // Adjust the import path
import {
  Team,
  CreateTeamDto,
  UpdateTeamDto,
  ApiResponse,
} from "@/types/team.type";

interface TeamContextType {
  teams: Team[];
  loading: boolean;
  error: string | null;
  getAllTeams: () => Promise<void>;
  getTeamById: (id: string) => Promise<Team | null>;
  createTeam: (data: CreateTeamDto) => Promise<Team | null>;
  updateTeam: (id: string, data: UpdateTeamDto) => Promise<Team | null>;
  deleteTeam: (id: string) => Promise<boolean>;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

interface TeamProviderProps {
  children: ReactNode;
}

export const TeamProvider: React.FC<TeamProviderProps> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const teamService = TeamService; // Since it's already instantiated

  const getAllTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: ApiResponse<Team[]> = await teamService.getAllTeam();
      console.log(response,"response")
      if (response.success && response.data) {
        setTeams(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to fetch teams");
    } finally {
      setLoading(false);
    }
  };

  const getTeamById = async (id: string): Promise<Team | null> => {
    try {
      setLoading(true);
      setError(null);
      const response: ApiResponse<Team> = await teamService.getTeamById(id);
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.message);
        return null;
      }
    } catch (err) {
      setError("Failed to fetch team");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createTeam = async (data: CreateTeamDto): Promise<Team | null> => {
    try {
      setLoading(true);
      setError(null);
      const response: ApiResponse<Team> = await teamService.createTeam(data);
      if (response.success && response.data) {
        setTeams((prev) => [...prev, response.data]);
        return response.data;
      } else {
        setError(response.message);
        return null;
      }
    } catch (err) {
      setError("Failed to create team");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateTeam = async (
    id: string,
    data: UpdateTeamDto
  ): Promise<Team | null> => {
    try {
      setLoading(true);
      setError(null);
      const response: ApiResponse<Team> = await teamService.updateTeam(
        id,
        data
      );
      if (response.success && response.data) {
        setTeams((prev) =>
          prev.map((team) =>
            team.id === response.data.id ? response.data : team
          )
        );
        return response.data;
      } else {
        setError(response.message);
        return null;
      }
    } catch (err) {
      setError("Failed to update team");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteTeam = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const response: ApiResponse<null> = await teamService.deleteTeam(id);
      if (response.success) {
        setTeams((prev) => prev.filter((team) => team.id !== parseInt(id)));
        return true;
      } else {
        setError(response.message);
        return false;
      }
    } catch (err) {
      setError("Failed to delete team");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Fetch teams on mount
  useEffect(() => {
    getAllTeams();
  }, []);

  const value: TeamContextType = {
    teams,
    loading,
    error,
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};

// Custom hook
export const useTeam = (): TeamContextType => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
};
