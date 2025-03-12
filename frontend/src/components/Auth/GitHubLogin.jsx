import { useEffect, useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { useNavigate } from "react-router";
import { Button } from "@mantine/core";

const GitHubLogin = () => {
  const { user, checkAuthStatus } = useAuthStore();
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthStatus();
      if (isAuthenticated) {
        navigate("/");
      }
      setChecking(false);
    };

    checkAuth();
  }, [checkAuthStatus, navigate]);

  const handleLogin = () => {
    const redirectURL = window.location.origin;
    window.location.href = `http://localhost:5001/auth/github?redirect=${encodeURIComponent(
      redirectURL
    )}`;
  };

  if (checking) return null;
  if (user) return null;

  return <Button onClick={handleLogin}>Login with GitHub</Button>;
};

export default GitHubLogin;
