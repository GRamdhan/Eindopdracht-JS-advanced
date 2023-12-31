import React, { useState, useEffect } from 'react';
import {
  Heading,
  Box,
  List,
  ListItem,
  Button,
  Modal,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    category: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch events from the JSON Server API
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    try {
      const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      fetchEvents();
      onClose();

      setNewEvent({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        category: '',
      });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTermLower) ||
        event.description.toLowerCase().includes(searchTermLower) ||
        event.category.toLowerCase().includes(searchTermLower)
    );
    setFilteredEvents(filtered);
  };




  const handleFilter = () => {
    if (selectedCategory) {
      const filtered = events.filter((event) => event.category === selectedCategory);
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>List of Events</Heading>
      <FormControl mb={4}>
        <Input
          placeholder="Search events"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button colorScheme="teal" ml={2} onClick={handleSearch}>
          Search
        </Button>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Filter by Category</FormLabel>
        <Select
          placeholder="Select category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
        </Select>
        <Button colorScheme="teal" ml={2} onClick={handleFilter}>
          Apply Filter
        </Button>
      </FormControl>
      <Button colorScheme="teal" mb={4} onClick={onOpen}>
        Add Event
      </Button>
      <List>
        {filteredEvents.map((event) => (
          <ListItem key={event.id} mb={4}>
            
            {event.title} - {event.description} - {event.startTime} - {event.endTime} - {event.category}
          </ListItem>
        ))}
      </List>

      <Modal isOpen={isOpen} onClose={onClose}>
        <FormControl mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Enter title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Enter description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Start Time</FormLabel>
          <Input
            type="datetime-local"
            value={newEvent.startTime}
            onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>End Time</FormLabel>
          <Input
            type="datetime-local"
            value={newEvent.endTime}
            onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Category</FormLabel>
          <Input
            placeholder="Enter category"
            value={newEvent.category}
            onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleAddEvent}>
          Save
        </Button>
      </Modal>
    </Box>
  );
};

export default EventsPage;