import "@mantine/core/styles.css";
import { Badge, Container, MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      defaultColorScheme="dark"
    >
      <Container py="md">
        <h1>Hello!</h1>
        <Badge size="lg" color="orange">
          MLH GHW Cloud Week!
        </Badge>
      </Container>
    </MantineProvider>
  );
}

export default App;
