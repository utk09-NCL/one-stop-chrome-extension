import {
  Button,
  Container,
  Grid,
  Group,
  Loader,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import useProjectStore from "../../stores/useProjectStore";

const ProjectList = () => {
  const { projects, fetchProjects, loading } = useProjectStore();
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <Container>
      <Title align="center" mb="md">
        My Projects
      </Title>
      <Group position="apart" mb="md">
        <Button variant="outline" onClick={() => fetchProjects()}>
          Refresh Projects
        </Button>
        <Button onClick={() => setFormOpen(true)}>Create New Project</Button>
      </Group>

      <Modal
        opened={formOpen}
        onClose={() => setFormOpen(false)}
        title="Create New Project"
        size="md"
      >
        <ProjectForm onClose={() => setFormOpen(false)} />
      </Modal>

      {loading ? (
        <Group justify="center">
          <Loader />
        </Group>
      ) : projects.length === 0 ? (
        <Text align="center" c="gray">
          No projects found. Create a new project to get started.
        </Text>
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
