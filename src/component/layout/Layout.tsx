import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Chip, Container, Grid, ListItemIcon, ListSubheader, Stack } from '@mui/material';
import Suggestions from '../suggestions/Suggestions';
import { Outlet, useNavigate } from 'react-router-dom';
import background_header from "../../assets/suggestions/desktop/background-header.png"
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

export default function Layout(props: Props) {
  const navigate=useNavigate()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI 
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (<>
   <Container maxWidth={"xl"} sx={{backgroundColor:"grey",margin:0}}>
    
    <Grid container spacing={2} >
    <Grid item  sm={12} md={2} >
      <Stack direction={{sm:"row",md:"column"}} spacing={4} sx={{justifyContent:"center",display:"flex"}}> 
      <Box sx={{  py:2,display: { xs: 'none', sm: 'block' } ,textAlign:"center",backgroundColor:"blue",width:"100%",borderRadius: "20px"}}>
          
        <Typography gutterBottom variant="h6">
          Eqaim
        </Typography>
        <Typography gutterBottom variant="body2">
          
       Feedback Board
        </Typography>
    
         
          </Box>
          <Box sx={{ py:2, display: { xs: 'none', sm: 'block' },justifyContent:"center",backgroundColor:"white",width:"100%",borderRadius: "20px"}}>
          
        
        <Stack direction="row" spacing={2} justifyContent="center">
          <Chip color="primary" label="All" size="small" />
          <Chip label="UI" size="small" />
          <Chip label="UX" size="small" /></Stack>
          <Stack direction="row" spacing={2} sx={{py:2,justifyContent:"center"}}>
          <Chip  label="Enhancement" size="small" />
          <Chip label="Bug" size="small" /></Stack>
          <Stack direction="row" spacing={2} sx={{justifyContent:"center"}}><Chip label="Feature" size="small" /></Stack>
          
        
    
         
          </Box>
          <Box sx={{py:2, display: { xs: 'none', sm: 'block' } ,justifyContent:"center",backgroundColor:"blue",width:"100%",borderRadius: "20px"}}>
           
           
          <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={<><Stack direction={"row"} spacing={4}>
        <ListSubheader  id="nested-list-subheader">
          Roadmap
        </ListSubheader>
        <ListSubheader  id="nested-list-subheader">
        <Button variant="text"  onClick={() =>
                                navigate("/roadmap", 
                                )
                              }>
                            View
                          </Button>
      </ListSubheader>
      </Stack></>
      }
    >
     
      <ListItemButton >
        <ListItemIcon>
          1.
        </ListItemIcon>
        <ListItemText primary="Planned" />
       2
      </ListItemButton>
      <ListItemButton >
        <ListItemIcon>
          2.
        </ListItemIcon>
        <ListItemText primary="In-Prograss" />
       3
      </ListItemButton>
      <ListItemButton >
        <ListItemIcon>
          3.
        </ListItemIcon>
        <ListItemText primary="Live" />
       1
      </ListItemButton>
    
    </List>
          </Box>
         </Stack>
     
    </Grid>
    <Grid item  sm={12} md={10} >
    
      
        
   
     
      {/* <Box component="main" sx={{ p: 3}}> */}
        
        <Outlet/>
      {/* </Box> */}
      
    {/* </Box> */}
    </Grid>
     
    
  </Grid></Container>
  <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
         
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            mt:"20px"
          }}
        >
          <Stack direction={"column"} spacing={4} > 
      <Box sx={{ p: 2 , display: 'block'  ,backgroundColor:"blue",width:"100%"}}>
          
        <Typography gutterBottom variant="h6">
          Eeeeeeee
        </Typography>
        <Typography gutterBottom variant="body2">
          
       Feedback Board
        </Typography>
    
         
          </Box>
          <Box sx={{ p: 2 , display: 'block',backgroundColor:"white",width:"100%"}}>
          
        
        <Stack direction="row" spacing={2} >
          <Chip color="primary" label="All" size="small" />
          <Chip label="UI" size="small" />
          <Chip label="UX" size="small" /></Stack>
          <Stack direction="row" spacing={2} sx={{py:2}}>
          <Chip  label="Enhancement" size="small" />
          <Chip label="Bug" size="small" /></Stack>
          <Chip label="Feature" size="small" />
          
        
    
         
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } ,backgroundColor:"blue",width:"100%"}}>
          <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={<><Stack direction={"row"} spacing={12}>
        <ListSubheader component="div" id="nested-list-subheader">
          Roadmap
        </ListSubheader>
        <ListSubheader component="div" id="nested-list-subheader">
       View
      </ListSubheader></Stack></>
      }
    >
     
      <ListItemButton >
        <ListItemIcon>
          a
        </ListItemIcon>
        <ListItemText primary="Planned" />
       2
      </ListItemButton>
      <ListItemButton >
        <ListItemIcon>
          b
        </ListItemIcon>
        <ListItemText primary="In-Prograss" />
       3
      </ListItemButton>
      <ListItemButton >
        <ListItemIcon>
          c
        </ListItemIcon>
        <ListItemText primary="Live" />
       1
      </ListItemButton>
    
    </List>
          </Box>
         </Stack>
     
        </Drawer>
      </nav>
  </> );
}