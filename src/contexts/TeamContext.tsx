// src/contexts/TeamContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import TeamService from "@/services/team.service";
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
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

interface TeamProviderProps {
  children: ReactNode;
}

export const TeamProvider: React.FC<TeamProviderProps> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: ApiResponse<Team[]> = await TeamService.getAllTeam();
      if (response.success && response.data) {
        setTeams(response.data);
      } else {
        setError(response.message || "Failed to fetch teams");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch teams";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getTeamById = async (id: string): Promise<Team | null> => {
    try {
      setLoading(true);
      setError(null);
      const response: ApiResponse<Team> = await TeamService.getTeamById(id);
      if (response.success && response.data) {
        return response.data;
      } else {
        const errorMessage =
          response.message || `Failed to fetch team with ID: ${id}`;
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : `Failed to fetch team with ID: ${id}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  const value: TeamContextType = {
    teams,
    loading,
    error,
    getAllTeams,
    getTeamById,
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};

export const useTeam = (): TeamContextType => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
};
