import apiClient from "@/lib/axios";

interface AuthResponse {
  isAuthenticated: boolean;
  message?: string;
}

export async function checkAuth(): Promise<AuthResponse> {
  try {
    const response = await apiClient.get("/auth/check");
    return response.data;
  } catch (error) {
    console.error("Failed to check authentication", error);
    throw error;
  }
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Failed to login", error);
    throw error;
  }
}

export async function register(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const response = await apiClient.post("/auth/register", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to register", error);
    throw error;
  }
}

export async function logout(): Promise<AuthResponse> {
  try {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Failed to logout", error);
    throw error;
  }
}
