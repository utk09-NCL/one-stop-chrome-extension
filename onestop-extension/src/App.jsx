import "@mantine/core/styles.css";
import { Container, MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router";
import ProjectList from "./components/Projects/ProjectList";
import ProjectInfo from "./components/ProjectInfo/ProjectInfo";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      defaultColorScheme="dark"
    >
      <Container
        p="xs"
        style={{
          width: "400px",
          maxHeight: "600px",
          overflow: "auto",
        }}
      >
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
