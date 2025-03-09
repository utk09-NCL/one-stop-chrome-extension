import { Anchor, Badge, Card, Group, Text, Title } from "@mantine/core";

const QACard = ({ qa }) => {
  return (
    <Card shadow="xl" padding="lg" radius="md" withBorder>
      <Group justify="space-between">
        <Title order={4}>{qa.question}</Title>
        <Text size="xs" c="gray">
          {new Date(qa.createdAt).toLocaleDateString()}
        </Text>
      </Group>

      {qa.answer && (
        <Text size="sm" c="gray">
          {qa.answer}
        </Text>
      )}

      {qa.url && (
        <Anchor c="orange" href={qa.url} target="_blank" underline="hover">
          {qa.url}
        </Anchor>
      )}

      {qa.tags && qa.tags.length > 0 && (
        <Group mt="md">
          {qa.tags.map((tag, index) => (
            <Badge key={index} color="red">
              {tag}
            </Badge>
          ))}
        </Group>
      )}
    </Card>
  );
};

export default QACard;
