import React , {useEffect , useContext , useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';

const drawerWidth = 240;

export default function Sidebar({ChildComponent}) {
    const navigate = useNavigate();
    const {sideBarOptions , contextData} = useContext(AppContext)
    const [list , setList] = useState([])
    const [selectedIndex , setSelectedIndex] = React.useState(0);
    const handleOptionClick =(index ,link) => {
        setSelectedIndex(index);
        navigate(link)
    }
    useEffect(()=>{
      if(contextData.user)setList(sideBarOptions[contextData.user.role])
    } , [])
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


