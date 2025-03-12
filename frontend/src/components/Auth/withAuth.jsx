import { useNavigate } from "react-router";
import useAuthStore from "../../stores/useAuthStore";
import { useEffect, useState } from "react";
import { Center, Loader } from "@mantine/core";

// eslint-disable-next-line no-unused-vars
const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const { user, loading, checkAuthStatus } = useAuthStore();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      const verifyAuth = async () => {
        const isAuthenticated = await checkAuthStatus();
        if (!isAuthenticated) {
          navigate("/auth");
        }
        setChecking(false);
      };
      verifyAuth();
    }, [navigate, checkAuthStatus]);

    if (checking || loading) {
      return (
        <Center h={300}>
          <Loader size="md" />
        </Center>
      );
    }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
