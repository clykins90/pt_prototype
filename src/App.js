import React, { cloneElement } from 'react';
import { CssBaseline, AppBar, Toolbar, Drawer, List, ListItem, ListItemText, Typography, Box, IconButton, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InsightsIcon from '@mui/icons-material/Insights';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ProfitTracker from './components/ProfitTracker';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import NotesIcon from '@mui/icons-material/Notes';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import FolderIcon from '@mui/icons-material/Folder';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BuildIcon from '@mui/icons-material/Build';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShowChartIcon from '@mui/icons-material/ShowChart';

function App() {
  const topNavItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Jobs', icon: <BusinessIcon /> },
    { text: 'Calendar', icon: <CalendarTodayIcon /> },
    { text: 'Insights', icon: <InsightsIcon /> },
    { text: 'Engage', icon: <ChatIcon /> },
  ];

  const sideNavItems = [
    { text: 'Collapse', icon: <MenuIcon /> },
    { text: 'Overview', icon: <DashboardIcon /> },
    { text: 'Activity', icon: <HistoryIcon /> },
    { text: 'Fields', icon: <TextFieldsIcon /> },
    { text: 'Notes', icon: <NotesIcon /> },
    { text: 'Photos', icon: <PhotoLibraryIcon /> },
    { text: 'Documents', icon: <FolderIcon /> },
    { text: 'Financials', icon: <AccountBalanceIcon /> },
    { text: 'Work Orders', icon: <BuildIcon /> },
    { text: 'Forms', icon: <ListAltIcon /> },
    { text: 'Profit Tracker', icon: <ShowChartIcon /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          
          <AppBar 
            position="fixed" 
            color="default"
            elevation={1}
            sx={{ 
              zIndex: (theme) => theme.zIndex.drawer + 1,
              height: 48,
              bgcolor: 'white',
              '& .MuiToolbar-root': {
                minHeight: 48,
                padding: '0 16px',
                justifyContent: 'space-between'
              }
            }}
          >
            <Toolbar>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <img src="/birdie-logo.png" alt="Birdie" style={{ height: 32 }} />
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', color: '#00A5AC' }}>
                    Birdie Roofing Co.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {topNavItems.map((item) => (
                    <Button
                      key={item.text}
                      component={Link}
                      to="/"
                      startIcon={item.icon}
                      sx={{
                        color: '#666',
                        textTransform: 'none',
                        px: 2,
                        '&:hover': {
                          bgcolor: 'rgba(0,0,0,0.04)'
                        }
                      }}
                    >
                      {item.text}
                    </Button>
                  ))}
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton size="small">
                  <AddIcon />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f5f5f5', borderRadius: 1, padding: '4px 8px' }}>
                  <SearchIcon sx={{ color: '#666' }} />
                  <input 
                    placeholder="Search..." 
                    style={{ 
                      border: 'none', 
                      background: 'none',
                      outline: 'none',
                      padding: '4px',
                      width: 200
                    }} 
                  />
                </Box>
                <IconButton size="small">
                  <AccessTimeIcon />
                </IconButton>
                <IconButton size="small">
                  <NotificationsIcon />
                </IconButton>
                <IconButton size="small">
                  <AccountCircleIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          
          <Drawer
            variant="permanent"
            sx={{
              width: 60,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 60,
                boxSizing: 'border-box',
                marginTop: '48px',
                bgcolor: '#2F3941',
                color: 'white',
                borderRight: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowX: 'hidden'
              },
            }}
          >
            <List sx={{ width: '100%', p: 0 }}>
              {sideNavItems.map((item) => (
                <ListItem 
                  button 
                  key={item.text}
                  sx={{ 
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 0.75,
                    minHeight: 'unset',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    py: 0.5
                  }}>
                    {React.cloneElement(item.icon, { 
                      sx: { fontSize: 20, color: '#B9C2C8' } 
                    })}
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#B9C2C8',
                        fontSize: '0.6rem',
                        mt: 0.25,
                        textAlign: 'center',
                        lineHeight: 1,
                        maxWidth: 52
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Drawer>

          <Box component="main" sx={{ 
            flexGrow: 1, 
            p: 2,
            marginLeft: '60px',
            marginTop: '48px',
            bgcolor: '#F7F9FA'
          }}>
            <Routes>
              <Route path="/" element={<ProfitTracker />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 