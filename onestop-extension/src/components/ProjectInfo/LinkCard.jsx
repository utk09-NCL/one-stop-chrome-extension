import { Anchor, Badge, Card, Group, Text, Title } from "@mantine/core";

const LinkCard = ({ link }) => {
  return (
    <Card shadow="xs" padding={4} radius="md" withBorder maw={400}>
      <Group justify="space-between">
        <Title order={6}>{link.title}</Title>
        <Text size="xs" c="gray">
          {new Date(link.createdAt).toLocaleDateString()}
        </Text>
      </Group>

      {link.notes && (
        <Text size="xs" c="gray">
          {link.notes}
        </Text>
      )}

      {link.url && (
        <Anchor
          c="lime"
          href={link.url}
          target="_blank"
          underline="hover"
          size="xs"
          my={1}
        >
          Link
        </Anchor>
      )}

      {link.tags && link.tags.length > 0 && (
        <Group mt={2}>
          {link.tags.map((tag, index) => (
            <Badge key={index} color="cyan" size="xs" variant="light">
              {tag}
            </Badge>
          ))}
        </Group>
      )}
    </Card>
  );
};

export default LinkCard;
