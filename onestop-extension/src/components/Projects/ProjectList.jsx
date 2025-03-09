import {
  Button,
  Container,
  Flex,
  Grid,
  Group,
  Loader,
  Title,
} from "@mantine/core";
import { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import useProjectStore from "../../store/useProjectStore";

const ProjectList = () => {
  const { projects, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <Container p={0}>
      <Flex gap="xs" justify="center" align="center">
        <Title order={6}>My Projects</Title>
        <Button variant="outline" size="xs">
          Refresh Projects
        </Button>
      </Flex>

      {projects.length === 0 ? (
        <Group justify="center">
          <Loader type="oval" size={12} />
        </Group>
      ) : (
        <Grid gutter="xs" mt="sm">
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
