import "@mantine/core/styles.css";
import { Container, MantineProvider } from "@mantine/core";
import ProjectList from "./components/Projects/ProjectList";
import { Route, Routes } from "react-router";
import ProjectInfo from "./components/ProjectInfo/ProjectInfo";
import AuthPage from "./components/Auth/AuthPage";
import Header from "./components/Header";
import withAuth from "./components/Auth/withAuth";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      defaultColorScheme="dark"
    >
      <Container py="md">
        <Header />
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={withAuth(ProjectList)()} />
          <Route path="/:projectId/info" element={withAuth(ProjectInfo)()} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Container>
    </MantineProvider>
  );
}

export default App;
