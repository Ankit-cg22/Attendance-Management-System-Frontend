// import React from 'react'
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Typography from '@mui/material/Typography';
// export default function Sidebar() {
//   return (
//     <div>
//         <Drawer
//             variant="permanent"
//             anchor="left" 
//         >
//             <List>
//                 <ListItem button>
//                 <ListItemText primary="Generate Report" />
//                 </ListItem>
//                 <ListItem button>
//                 <ListItemText primary="See Status" />
//                 </ListItem>
//             </List>
//         </Drawer>
//     </div>
//   )
// }
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar({list , ChildComponent}) {
    const navigate = useNavigate();
    const [selectedIndex , setSelectedIndex] = React.useState(0);
    const handleOptionClick =(index ,link) => {
        setSelectedIndex(index);
        navigate(link)
    }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Navbar/>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {list.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton selected={selectedIndex === index} onClick={e => handleOptionClick(index , item.link)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <ChildComponent/>
      </Box>
    </Box>
  );
}


