import { Badge, Button, Card, Group, Text, Title } from "@mantine/core";
import { Link } from "react-router";

const ProjectCard = ({ project }) => {
  return (
    <Card shadow="xl" padding="lg" radius="md" withBorder>
      <Title order={4}>{project.name}</Title>
      <Text size="sm" c="gray">
        {project.description || "No description provided"}
      </Text>
      {project.tags && project.tags.length > 0 && (
        <Group mt="md">
          {project.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="gradient"
              gradient={{ from: "orange", to: "red", deg: 90 }}
            >
              {tag}
            </Badge>
          ))}
        </Group>
      )}
      <Group justify="flex-end">
        <Link to={`/${project._id}/info`}>
          <Button variant="light">View Details</Button>
        </Link>
      </Group>
    </Card>
  );
};

export default ProjectCard;
