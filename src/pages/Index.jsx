import { Box, Button, Container, Flex, IconButton, Input, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit, FaSave } from "react-icons/fa";
import { useState } from "react";

const Note = ({ note, onDelete, onEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editText, setEditText] = useState(note.text);

  const handleEdit = () => {
    onEdit(note.id, editText);
    onClose();
  };

  return (
    <Box p={4} bg={note.color} borderRadius="lg" boxShadow="md">
      {isOpen ? (
        <Input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          placeholder="Edit your note"
          size="sm"
        />
      ) : (
        <Text>{note.text}</Text>
      )}
      <Flex justify="space-between" mt={2}>
        <IconButton icon={<FaTrash />} onClick={() => onDelete(note.id)} aria-label="Delete note" size="sm" />
        {isOpen ? (
          <IconButton icon={<FaSave />} onClick={handleEdit} aria-label="Save note" size="sm" />
        ) : (
          <IconButton icon={<FaEdit />} onClick={onOpen} aria-label="Edit note" size="sm" />
        )}
      </Flex>
    </Box>
  );
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState("");

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      text: newNoteText,
      color: "yellow.100"
    };
    setNotes([...notes, newNote]);
    setNewNoteText("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (id, text) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return { ...note, text };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <Container maxW="container.xl" p={5}>
      <Flex mb={5} justify="space-between">
        <Input
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          placeholder="Add a new note"
          size="md"
        />
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addNote}>
          Add Note
        </Button>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={5}>
        {notes.map(note => (
          <Note key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;