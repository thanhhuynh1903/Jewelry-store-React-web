export default function useAuth() {
    return JSON.parse(localStorage.getItem("token")) || "";
  }