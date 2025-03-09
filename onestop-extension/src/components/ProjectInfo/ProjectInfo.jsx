import {
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Loader,
  Text,
  Title,
} from "@mantine/core";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import QACard from "./QACard";
import LinkCard from "./LinkCard";
import useLinkStore from "../../store/useLinkStore";
import useQAStore from "../../store/useQAStore";

const ProjectInfo = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { links, fetchLinks } = useLinkStore();
  const { questions, fetchQuestions } = useQAStore();

  useEffect(() => {
    fetchLinks(projectId);
    fetchQuestions(projectId);
  }, [projectId, fetchLinks, fetchQuestions]);

  return (
    <Container p={0}>
      <Flex gap="xs" justify="center" align="center">
        <Title order={6}>Project Resources</Title>
        <Button size="compact-xs" onClick={() => navigate("/")}>
          Back
        </Button>
      </Flex>

      <Divider label="Links" labelPosition="center" my={0} />

      {links && links.length === 0 ? (
        <Text size="xs" align="center" my={0}>
          No links yet
        </Text>
      ) : links ? (
        <Grid gutter="xs">
          {links.map((link) => (
            <Grid.Col key={link._id}>
              <LinkCard link={link} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Loader type="dots" />
      )}

      <Divider label="Q&A" labelPosition="center" my={0} />

      {questions.length === 0 ? (
        <Text size="xs" align="center" my={0}>
          No Q&A yet
        </Text>
      ) : questions ? (
        <Grid gutter="xs">
          {questions.map((qa) => (
            <Grid.Col key={qa._id}>
              <QACard qa={qa} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Loader type="dots" />
      )}
    </Container>
  );
};

export default ProjectInfo;
