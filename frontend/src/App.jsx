import "@mantine/core/styles.css";
import { Container, MantineProvider } from "@mantine/core";
import ProjectList from "./components/Projects/ProjectList";
import { Route, Routes } from "react-router";
import ProjectInfo from "./components/ProjectInfo/ProjectInfo";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      defaultColorScheme="dark"
    >
      <Container py="md">
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/:projectId/info" element={<ProjectInfo />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Container>
    </MantineProvider>
  );
}

export default App;
