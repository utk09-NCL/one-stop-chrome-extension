import "@mantine/core/styles.css";
import { Container, MantineProvider } from "@mantine/core";
import ProjectList from "./components/Projects/ProjectList";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      defaultColorScheme="dark"
    >
      <Container py="md">
        <ProjectList />
      </Container>
    </MantineProvider>
  );
}

export default App;
