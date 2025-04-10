interface ApiResponse<T> {
  success: boolean;
  data: T | null; // Nullable data for error cases
  message: string; // Always present
  status: number;
  error?: ApiError; // Optional error field for failure cases
}

interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export type { ApiResponse, ApiError };
