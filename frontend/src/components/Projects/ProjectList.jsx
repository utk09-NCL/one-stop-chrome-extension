import { Button, Container, Grid, Group, Loader, Title } from "@mantine/core";
import { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import useProjectStore from "../../stores/useProjectStore";

const ProjectList = () => {
  const { projects, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleLogin = () => {
    const redirectURL = window.location.origin;
    window.location.href = `http://localhost:5001/auth/github?redirect=${encodeURIComponent(
      redirectURL
    )}`;

    console.log("Login with GitHub clicked");
    console.log("Redirect URL:", redirectURL);
  };

  return (
    <Container>
      <Title align="center" mb="md">
        My Projects
      </Title>
      <Button variant="outline" fullWidth>
        Refresh Projects
      </Button>
      <Button onClick={handleLogin}>Login with GitHub</Button>
      {projects.length === 0 ? (
        <Group justify="center">
          <Loader type="oval" />
        </Group>
      ) : (
        <Grid gutter="md" mt="md">
          {projects.map((project) => (
            <Grid.Col key={project._id}>
              <ProjectCard project={project} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProjectList;
