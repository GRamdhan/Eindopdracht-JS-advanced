// EventPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Heading,
  Box,
  Image,
  Text,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

const EventPage = () => {
  const { eventId } = useParams();
  const history = useHistory();
  const [event, setEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedEvent, setEditedEvent] = useState({});
  const toast = useToast();
  const cancelRef = useRef();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        const data = await response.json();
        setEvent(data);
        setEditedEvent(data); // Initialize editedEvent with the fetched event details
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedEvent),
      });

      if (!response.ok) {
        throw new Error('Failed to save edits');
      }

      // Display success message
      toast({
        title: 'Edits saved',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setIsEditing(false);
      setEvent(editedEvent); // Update the displayed event details
    } catch (error) {
      console.error('Error saving edits:', error);

      // Display error message
      toast({
        title: 'Error saving edits',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    // Reset the editedEvent to the original event details
    setEditedEvent(event);
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      // Display success message
      toast({
        title: 'Event deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Redirect to the events page after successful deletion
      history.push('/');
    } catch (error) {
      console.error('Error deleting event:', error);

      // Display error message
      toast({
        title: 'Error deleting event',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  if (!event) {
    return null; // Render loading state or redirect to an error page
  }

  return (
    <Box p={4}>
      <Heading mb={4}>{event.title}</Heading>
      <Image src={event.image} alt={event.title} mb={4} />
      <Text mb={4}>{event.description}</Text>
      <Text>
        <strong>Start Time:</strong> {new Date(event.startTime).toLocaleString()}
      </Text>
      <Text>
        <strong>End Time:</strong> {new Date(event.endTime).toLocaleString()}
      </Text>
      <Text>
        <strong>Categories:</strong> {event.categories.join(', ')}
      </Text>
      <Text>
        <strong>Created By:</strong> {event.creator.name}
      </Text>
      <Image src={event.creator.image} alt={event.creator.name} mt={4} />
      <Button colorScheme="teal" mt={4} onClick={handleEdit}>
        Edit
      </Button>
      <Button colorScheme="red" mt={4} ml={4} onClick={handleDelete}>
        Delete
      </Button>

      {/* Edit Modal */}
      <Modal isOpen={isEditing} onClose={handleCloseEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* ... (Edit form inputs and other elements) */}
            {/* Example: */}
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                value={editedEvent.title || ''}
                onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
              />
            </FormControl>
            {/* ... (Other form fields) */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSaveEdit}>
              Save
            </Button>
            <Button onClick={handleCloseEdit}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleting}
        leastDestructiveRef={cancelRef}
        onClose={handleCancelDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Event
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This action is irreversible and will permanently delete the event.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCancelDelete}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default EventPage;
