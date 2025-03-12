import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { Center, Loader } from "@mantine/core";

const withAuth = (Component) => {
  return (props) => {
    const { loading, checkAuthStatus } = useAuthStore();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      const verifyAuth = async () => {
        await checkAuthStatus();
        setChecking(false);
      };

      verifyAuth();
    }, [checkAuthStatus]);

    if (checking || loading) {
      return (
        <Center h={200}>
          <Loader size="sm" />
        </Center>
      );
    }

    return <Component {...props} />;
  };
};

export default withAuth;
