import { apiRequest } from "./api";

export function registerUser(data) {
  return apiRequest("/auth/register", "POST", data);
}

export function loginUser(data) {
  return apiRequest("/auth/login", "POST", data);
}

export function fetchProfile(token) {
  return apiRequest("/auth/profile", "GET", null, token);
}
