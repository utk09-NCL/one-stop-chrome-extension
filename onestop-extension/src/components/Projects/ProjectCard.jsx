import { Badge, Button, Card, Group, Text, Title } from "@mantine/core";
import { Link } from "react-router";

const ProjectCard = ({ project }) => {
  return (
    <Card shadow="sm" padding="xs" radius="md" withBorder>
      <Group justify="space-between">
        <Title order={6}>{project.name}</Title>
        <Link to={`/${project._id}/info`}>
          <Button variant="subtle" size="compact-xs">
            View Details
          </Button>
        </Link>
      </Group>

      {project.description && (
        <Text size="xs" c="gray">
          {project.description}
        </Text>
      )}

      {project.tags && project.tags.length > 0 && (
        <Group mt={2}>
          {project.tags.map((tag, index) => (
            <Badge key={index} size="xs" mx={-2}>
              {tag}
            </Badge>
          ))}
        </Group>
      )}
    </Card>
  );
};

export default ProjectCard;
