import {
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Loader,
  Title,
} from "@mantine/core";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import QACard from "./QACard";
import LinkCard from "./LinkCard";
import useLinkStore from "../../stores/useLinkStore";
import useQAStore from "../../stores/useQAStore";

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
    <Container>
      <Group align="top">
        <Title mb="md" order={4}>
          Project Resources
        </Title>
        <Button size="compact-sm" onClick={() => navigate("/")}>
          Back to Project
        </Button>
      </Group>

      <Divider label="Links" labelPosition="center" my="md" />

      {links.length === 0 ? (
        <Loader type="dots" />
      ) : (
        <Grid gutter="md">
          {links.map((link) => (
            <Grid.Col key={link._id}>
              <LinkCard link={link} />
            </Grid.Col>
          ))}
        </Grid>
      )}

      <Divider label="Q&A" labelPosition="center" my="md" />

      {questions.length === 0 ? (
        <Loader type="dots" />
      ) : (
        <Grid gutter="md">
          {questions.map((qa) => (
            <Grid.Col key={qa._id}>
              <QACard qa={qa} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProjectInfo;
