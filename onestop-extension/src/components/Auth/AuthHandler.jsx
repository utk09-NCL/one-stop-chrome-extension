import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { Alert, Button, Center, Loader, Stack, Text } from "@mantine/core";

const AuthHandler = () => {
  const { user, loading, error, checkAuthStatus } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuthStatus();
      setChecking(false);
    };
    verifyAuth();
    const interval = setInterval(checkAuthStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [checkAuthStatus]);

  const handleLogin = () => {
    const isExtension =
      typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id;
    const authUrl =
      "http://localhost:5001/auth/github?redirect=http://localhost:5173/auth/extension-callback";

    if (isExtension && chrome.tabs && chrome.tabs.create) {
      chrome.tabs.create({
        url: authUrl,
      });
    } else {
      window.open(authUrl, "_blank");
    }
  };

  if (checking || loading) {
    return (
      <Center h={100}>
        <Loader size="sm" />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert color="red" title="Authentication Error">
        {error}
      </Alert>
    );
  }

  if (!user) {
    return (
      <Stack align="center" spacing="xs">
        <Text size="sm">Please log in to continue</Text>
        <Button onClick={handleLogin} size="sm">
          Login with GitHub
        </Button>
        <Text size="xs" c="dimmed" ta="center">
          This will open a new browser tab for authentication
        </Text>
      </Stack>
    );
  }

  return (
    <Text size="sm" c="green" ta="center">
      Connected as {user.displayName || user.username}
    </Text>
  );
};

export default AuthHandler;
