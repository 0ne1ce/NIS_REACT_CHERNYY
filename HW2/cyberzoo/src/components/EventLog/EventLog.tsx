import React, { memo, useRef, useEffect } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Chip,
  Divider,
  Collapse,
  Badge,
} from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import HistoryIcon from '@mui/icons-material/History';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useEventLog } from '../../hooks';

const containerStyle: React.CSSProperties = {
  position: 'fixed',
  right: 20,
  top: 20,
  width: 360,
  maxHeight: 'calc(100vh - 40px)',
  zIndex: 1000,
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '12px 12px 0 0',
  cursor: 'pointer',
  userSelect: 'none',
};

const actionIconStyle = (action: string): React.CSSProperties => {
  const colors: Record<string, string> = {
    FEED: '#ff7675',
    PLAY: '#00b894',
    SLEEP: '#a29bfe',
    PET: '#fdcb6e',
  };
  
  return {
    backgroundColor: colors[action] || '#667eea',
    color: action === 'PET' ? '#2d3436' : '#ffffff',
  };
};

const EventLog: React.FC = memo(() => {
  const { events, clearEvents } = useEventLog();
  const listRef = useRef<HTMLUListElement>(null);
  const [isExpanded, setIsExpanded] = React.useState(true);

  useEffect(() => {
    if (listRef.current && events.length > 0) {
      listRef.current.scrollTop = 0;
    }
  }, [events]);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getActionEmoji = (action: string): string => {
    const emojis: Record<string, string> = {
      FEED: '🍖',
      PLAY: '🎾',
      SLEEP: '😴',
      PET: '🤚',
    };
    return emojis[action] || '📝';
  };

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearEvents();
  };

  return (
    <div style={containerStyle}>
      <Paper
        elevation={8}
        sx={{
          background: 'linear-gradient(145deg, rgba(26, 26, 46, 0.98) 0%, rgba(22, 33, 62, 0.98) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Заголовок */}
        <Box style={headerStyle} onClick={toggleExpanded}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Badge badgeContent={events.length} color="error" max={99}>
              <HistoryIcon sx={{ color: 'white' }} />
            </Badge>
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
              Журнал событий
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {events.length > 0 && (
              <IconButton
                size="small"
                onClick={handleClear}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
                aria-label="Очистить журнал"
              >
                <DeleteSweepIcon fontSize="small" />
              </IconButton>
            )}
            {isExpanded ? (
              <ExpandLessIcon sx={{ color: 'white' }} />
            ) : (
              <ExpandMoreIcon sx={{ color: 'white' }} />
            )}
          </Box>
        </Box>

        {/* Список событий */}
        <Collapse in={isExpanded}>
          {events.length === 0 ? (
            <Box
              sx={{
                p: 4,
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              <Typography variant="body2">
                Пока нет событий
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                Взаимодействуйте с питомцами!
              </Typography>
            </Box>
          ) : (
            <List
              ref={listRef}
              dense
              sx={{
                maxHeight: 400,
                overflow: 'auto',
                p: 0,
                '&::-webkit-scrollbar': {
                  width: 6,
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(255, 255, 255, 0.05)',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 3,
                },
              }}
            >
              {events.map((event, index) => (
                <React.Fragment key={event.id}>
                  <ListItem
                    sx={{
                      py: 1.5,
                      px: 2,
                      alignItems: 'flex-start',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Chip
                            label={`${getActionEmoji(event.action)} ${event.action}`}
                            size="small"
                            sx={{
                              ...actionIconStyle(event.action),
                              fontWeight: 600,
                              fontSize: '0.7rem',
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{ color: 'rgba(255, 255, 255, 0.4)' }}
                          >
                            {formatTime(event.timestamp)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                        >
                          {event.message}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < events.length - 1 && (
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          )}
        </Collapse>
      </Paper>
    </div>
  );
});

EventLog.displayName = 'EventLog';

export default EventLog;

