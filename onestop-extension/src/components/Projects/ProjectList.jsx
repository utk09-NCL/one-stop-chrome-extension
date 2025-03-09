import { Button, Container, Grid, Group, Loader, Title } from "@mantine/core";
import { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import useProjectStore from "../../store/useProjectStore";

const ProjectList = () => {
  const { projects, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <Container>
      <Title align="center" mb="md">
        My Projects
      </Title>
      <Button variant="outline" fullWidth>
        Refresh Projects
      </Button>
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
