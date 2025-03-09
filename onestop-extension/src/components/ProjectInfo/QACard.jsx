import { Anchor, Badge, Card, Group, Text, Title } from "@mantine/core";

const QACard = ({ qa }) => {
  return (
    <Card shadow="xl" padding={4} radius="md" withBorder maw={400}>
      <Group justify="space-between">
        <Title order={6}>{qa.question}</Title>
        <Text size="xs" c="gray">
          {new Date(qa.createdAt).toLocaleDateString()}
        </Text>
      </Group>

      {qa.answer && (
        <Text size="xs" c="gray">
          {qa.answer}
        </Text>
      )}

      {qa.url && (
        <Anchor
          c="orange"
          href={qa.url}
          target="_blank"
          underline="hover"
          size="xs"
          my={1}
        >
          Q&A Link
        </Anchor>
      )}

      {qa.tags && qa.tags.length > 0 && (
        <Group mt={2}>
          {qa.tags.map((tag, index) => (
            <Badge key={index} color="red" size="xs" variant="light">
              {tag}
            </Badge>
          ))}
        </Group>
      )}
    </Card>
  );
};

export default QACard;
