import { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Badge,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled components
const ChatContainer = styled(Paper)(({ theme }) => ({
  height: "calc(100vh - 100px)",
  margin: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
}));

const MessageArea = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: "auto",
  padding: theme.spacing(2),
}));

const InputArea = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const OnlineBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const TeamChatPage = () => {
  const [currentTeam, setCurrentTeam] = useState(1);
  const [teams] = useState([
    { id: 1, name: "Team 1" },
    { id: 2, name: "Team 2" },
    { id: 3, name: "Team 3" },
  ]);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        text: "Hello 1st team!",
        sender: "John Doe",
        timestamp: "10:00 AM",
      },
      {
        id: 2,
        text: "Hi John! How's the project going?",
        sender: "You",
        timestamp: "10:01 AM",
      },
    ],
    2: [
      {
        id: 1,
        text: "Hello 2nd team!",
        sender: "Jane Smith",
        timestamp: "09:00 AM",
      },
    ],
    3: [
      {
        id: 1,
        text: "Hello 3rd team!",
        sender: "Mike Johnson",
        timestamp: "11:00 AM",
      },
    ],
  });

  const [onlineUsers] = useState({
    1: [
      { id: 1, name: "John Doe", avatar: "/path/to/avatar1.jpg", online: true },
      {
        id: 2,
        name: "Jane Smith",
        avatar: "/path/to/avatar2.jpg",
        online: true,
      },
      {
        id: 3,
        name: "Mike Johnson",
        avatar: "/path/to/avatar3.jpg",
        online: false,
      },
    ],
    2: [
      {
        id: 4,
        name: "Sarah Wilson",
        avatar: "/path/to/avatar4.jpg",
        online: true,
      },
      {
        id: 5,
        name: "Tom Brown",
        avatar: "/path/to/avatar5.jpg",
        online: false,
      },
    ],
    3: [
      {
        id: 6,
        name: "Emily Davis",
        avatar: "/path/to/avatar6.jpg",
        online: true,
      },
      {
        id: 7,
        name: "Alex Turner",
        avatar: "/path/to/avatar7.jpg",
        online: true,
      },
    ],
  });

  const messageEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTeamChange = (event) => {
    setCurrentTeam(event.target.value);
  };

  // Handle sending new messages
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: "You",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prevMessages) => ({
        ...prevMessages,
        [currentTeam]: [...(prevMessages[currentTeam] || []), newMessage],
      }));
      setMessage("");
    }
  };

  return (
    <Grid container spacing={1}>
      {/* Online Users Sidebar */}
      <Grid item xs={3}>
        <Paper
          sx={{ height: "calc(100vh - 100px)", margin: 1, overflow: "auto" }}
        >
          {/* Team Selector */}
          <Box sx={{ p: 2 }}>
            <FormControl fullWidth size="small">
              <Select
                value={currentTeam}
                onChange={handleTeamChange}
                sx={{ mb: 2 }}
              >
                {teams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Divider />
          <Typography variant="h6" sx={{ p: 2 }}>
            Online Users
          </Typography>
          <Divider />
          <List>
            {onlineUsers[currentTeam]?.map((user) => (
              <ListItem key={user.id}>
                <ListItemAvatar>
                  <OnlineBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    invisible={!user.online}
                  >
                    <Avatar alt={user.name} src={user.avatar} />
                  </OnlineBadge>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={user.online ? "Online" : "Offline"}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Chat Area */}
      <Grid item xs={9}>
        <ChatContainer>
          {/* Team Name Header */}
          <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="h6">
              {teams.find((team) => team.id === currentTeam)?.name}
            </Typography>
          </Box>

          <MessageArea>
            {messages[currentTeam]?.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "You" ? "flex-end" : "flex-start",
                  mb: 2,
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor:
                      msg.sender === "You" ? "#1976d2" : "#f5f5f5",
                    color: msg.sender === "You" ? "#ffffff" : "#000000",
                    maxWidth: "70%",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1">{msg.text}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.8,
                      color: msg.sender === "You" ? "#ffffff" : "#666666",
                    }}
                  >
                    {msg.sender} • {msg.timestamp}
                  </Typography>
                </Paper>
              </Box>
            ))}
            <div ref={messageEndRef} />
          </MessageArea>

          <InputArea>
            <form onSubmit={handleSendMessage}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <IconButton
                  type="submit"
                  color="primary"
                  disabled={!message.trim()}
                  sx={{
                    backgroundColor: message.trim()
                      ? "primary.main"
                      : "grey.200",
                    color: message.trim() ? "white" : "grey.500",
                    "&:hover": {
                      backgroundColor: message.trim()
                        ? "primary.dark"
                        : "grey.300",
                    },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </form>
          </InputArea>
        </ChatContainer>
      </Grid>
    </Grid>
  );
};

export default TeamChatPage;
