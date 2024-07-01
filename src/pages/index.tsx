import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Home = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add the user's message
    setMessages([...messages, { text: input, isUser: true }]);
    setLoading(true);

    try {
      const response = await axios.post('/api/chat', { message: input });
      const aiMessage = response.data.response;

      // Add the AI's message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: aiMessage, isUser: false }
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Error communicating with AI', isUser: false }
      ]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-4 overflow-y-auto">
        <Navbar></Navbar>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded-lg max-w-xs ${
              message.isUser ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-300 text-black'
            }`}
          >
            {message.text}
          </div>
        ))}
        {loading && <div className="p-2 my-2 rounded-lg max-w-xs bg-gray-300 text-black">Typing...</div>}
      </div>
      <div className="p-4 bg-gray-100">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
