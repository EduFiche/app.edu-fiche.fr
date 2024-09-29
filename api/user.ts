import apiClient from "@/lib/axios";

interface AuthResponse {
  isAuthenticated: boolean;
}

export async function checkAuth(): Promise<AuthResponse> {
  try {
    const response = await apiClient.get<AuthResponse>("/check-auth");
    return response.data;
  } catch (error) {
    console.error("Failed to check authentication", error);
    throw error;
  }
}

interface GoogleSignInResponse {
  success: boolean;
  message: string;
}

export async function googleSignIn(): Promise<GoogleSignInResponse> {
  try {
    const response = await apiClient.post<GoogleSignInResponse>("/google-sign-in");
    return response.data;
  } catch (error) {
    console.error("Failed to sign in with Google", error);
    throw error;
  }
}
