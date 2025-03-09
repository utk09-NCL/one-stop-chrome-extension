import { Anchor, Badge, Card, Group, Text, Title } from "@mantine/core";

const LinkCard = ({ link }) => {
  return (
    <Card shadow="xl" padding="lg" radius="md" withBorder>
      <Group justify="space-between">
        <Title order={4}>{link.title}</Title>
        <Text size="xs" c="gray">
          {new Date(link.createdAt).toLocaleDateString()}
        </Text>
      </Group>

      {link.notes && (
        <Text size="sm" c="gray">
          {link.notes}
        </Text>
      )}

      {link.url && (
        <Anchor c="lime" href={link.url} target="_blank" underline="hover">
          {link.url}
        </Anchor>
      )}

      {link.tags && link.tags.length > 0 && (
        <Group mt="md">
          {link.tags.map((tag, index) => (
            <Badge key={index} color="cyan">
              {tag}
            </Badge>
          ))}
        </Group>
      )}
    </Card>
  );
};

export default LinkCard;
