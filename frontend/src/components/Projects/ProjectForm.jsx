import { useState } from "react";
import useProjectStore from "../../stores/useProjectStore";
import {
  Button,
  Group,
  LoadingOverlay,
  Paper,
  TagsInput,
  Textarea,
  TextInput,
} from "@mantine/core";

const ProjectForm = ({ onClose }) => {
  const { createProject } = useProjectStore();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagsChange = (tags) => {
    setFormData((prev) => ({
      ...prev,
      tags,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProject(formData);
      onClose();
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper p="md" withBorder>
      <LoadingOverlay
        visible={loading}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Project Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          mb="sm"
        />
        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          mb="sm"
          autosize
          minRows={2}
          maxRows={3}
        />
        <TagsInput
          label="Tags"
          value={formData.tags}
          onChange={handleTagsChange}
          placeholder="Add tags and press Enter"
          mb="md"
        />
        <Group position="right">
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </Group>
      </form>
    </Paper>
  );
};

export default ProjectForm;
