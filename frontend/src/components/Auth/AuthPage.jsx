import { Container, Title } from "@mantine/core";
import GitHubLogin from "./GitHubLogin";

const AuthPage = () => {
  return (
    <Container>
      <Title order={3} mb="md">
        Please Login
      </Title>
      <GitHubLogin />
    </Container>
  );
};

export default AuthPage;
