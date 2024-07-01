// pages/activities.tsx
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Activities = () => {
  const [sessions, setSessions] = useState<number[]>([]);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; session: number }[]>([]);

  useEffect(() => {
    // Simulated data for demonstration
    const mockMessages = [
      { text: 'Hello', isUser: true, session: 1 },
      { text: 'Hi there!', isUser: false, session: 1 },
      { text: 'How are you?', isUser: true, session: 2 },
      { text: 'I am fine.', isUser: false, session: 2 },
    ];

    setMessages(mockMessages);
    const sessionCounts = [1, 2].map(
      (session) => mockMessages.filter((msg) => msg.session === session).length
    );
    setSessions(sessionCounts);
  }, []);

  const chartData = {
    labels: sessions.map((_, index) => `Session ${index + 1}`),
    datasets: [
      {
        label: 'Messages per Session',
        data: sessions,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <Box className="flex flex-col h-screen">
      <Navbar />
      <Box padding={4}>
        <Typography variant="h4" gutterBottom>
          Chat Activities
        </Typography>
        <Box marginBottom={4}>
          <Bar data={chartData} />
        </Box>
        <Typography variant="h5" gutterBottom>
          Message Details
        </Typography>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${message.isUser ? 'User' : 'Bot'}: ${message.text}`}
                primaryTypographyProps={{ color: message.isUser ? 'primary' : 'textSecondary' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Activities;
