import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Chip, FormControl, Grid, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, Select, Stack } from '@mui/material';
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import { useNavigate } from 'react-router-dom';
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface User {
  image: string;
  name: string;
  username: string;
}
interface Reply{

  content: string;
  user: User;
  replyingTo?: string; // Optional field for replying to a specific comment
}


interface Comment {

  id: number;
  content: string;
  user: User;
  replies?:Reply[];
  replyingTo?: string; // Optional field for replying to a specific comment
}

interface ProductRequest {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: Comment[]; // Optional field for comments
}

interface UserData {
  currentUser: User;
  productRequests: ProductRequest[];
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const data = [
    {
        id: 1,
        title: 'Add tags for solutions',
        description: 'Easier to search for solutions based on a specific stack.',
        votes: 112,
        category: 'Enhancement',
        css: 190,
        number: 2
    },
    {
        id: 2,
        title: 'Add a dark theme option',
        description: 'It would help people with light sensitivities and who prefer dark mode.',
        votes: 99,
        category: 'Feature',
        css: 703,
        number: 4
    },
    {
        id: 3,
        title: 'Q&A within the challenge hubs',
        description: 'Challenge-specific Q&A would make for easy reference.',
        votes: 65,
        category: 'Feature',
        css: 361,
        number: 1
    },
    {
        id: 4,
        title: 'Allow image/video upload to feedback',
        description: 'Images and screencasts can enhance comments on solutions.',
        votes: 51,
        category: 'Enhancement',
        css: 532,
        number: 2
    },
    {
        id: 5,
        title: 'Ability to follow others',
        description: 'Stay updated on comments and solutions other people post.',
        votes: 42,
        category: 'Feature',
        css: 874,
        number: 3
    },
    {
        id: 6,
        title: 'Preview images not loading',
        description: 'Challenge preview images are missing when you apply a filter.',
        votes: 3,
        category: 'Bug',
        css: 1045,
        number: 0
    },
    // Add more data objects for each item
];

export default function Roadmap() {
  const [expanded, setExpanded] = React.useState(false);
  const [userData, setUserData] = React.useState<UserData|undefined>();
  const navigate=useNavigate();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  React.useEffect(() => {
    const userData = localStorage.getItem("userdata");
    if (userData) {
      const myObject = JSON.parse(userData);
      // Now you can use the object
      setUserData(myObject);
    }

  }, []);
  return (<>

<Card sx={{ backgroundColor: "#373F68",mb:1 }}   >
        <CardHeader
          avatar={<>
            <Typography >
            <NavigateBeforeIcon sx={{color:"#ffffff"}}/><Button sx={{color:"#ffffff"}} onClick={()=>navigate(-1)}>Go Back</Button>
      </Typography></>
          }
          action={<>
            <Button sx={{
              color: "#F2F4FE",
              backgroundColor: "#AD1FEA",
              '&:hover': {
                backgroundColor: "#C75AF6",
              },

            }} onClick={()=>navigate("/newFeedback")}>+ Add Feedback</Button></>
          }
          title={<> <Stack direction={"row"} spacing={2}><Typography gutterBottom variant="h6" color="#FFFFFF">
           Roadmap
          </Typography>
            </Stack>
          </>}

        // subheader={item.description}
        />



      </Card>
  <Grid container spacing={2}>
    <Grid item md={4}><Stack spacing={4}>
    <Typography gutterBottom variant="h6">Planned</Typography>
    <Typography gutterBottom variant="body1">Ideas prioritized for research</Typography>
    {userData?.productRequests?.filter(
                      (item) =>
                        item.status ==="Planned"
                    ).map((item,index)=><>
    <Card >
      <CardHeader
        avatar={<><Typography gutterBottom variant="h6"><ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore></Typography>
      <Typography gutterBottom variant="h6"> <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            
            {item.upvotes}
          </Avatar></Typography></>
        }
        action={<>
          <IconButton aria-label="settings">
            <MoreVertIcon />
           {item?.comments?.length}
          </IconButton></>
        }
        title={<> <Typography gutterBottom variant="h6">
        {item.title}
      </Typography>
      <Typography gutterBottom variant="body2">
        
     {item.description}
      </Typography>
      <Typography gutterBottom variant="body2">
        
      <Chip color="primary" label={item.category} size="small" />
      </Typography></>}
        // subheader={item.description}
      />
      
     
     
    </Card></>)}</Stack>
    </Grid>
    <Grid item md={4}><Stack spacing={4}>
    <Typography gutterBottom variant="h6">In-Progress</Typography>
    <Typography gutterBottom variant="body1"> Currently being developed </Typography>
    {userData?.productRequests?.filter(
                      (item) =>
                        item.status ==="In-Progress"
                    ).map((item,index)=><>
    <Card >
      <CardHeader
        avatar={<><Typography gutterBottom variant="h6"><ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore></Typography>
      <Typography gutterBottom variant="h6"> <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            
            {item.upvotes}
          </Avatar></Typography></>
        }
        action={<>
          <IconButton aria-label="settings">
            <MoreVertIcon />
           {item?.comments?.length}
          </IconButton></>
        }
        title={<> <Typography gutterBottom variant="h6">
        {item.title}
      </Typography>
      <Typography gutterBottom variant="body2">
        
     {item.description}
      </Typography>
      <Typography gutterBottom variant="body2">
        
      <Chip color="primary" label={item.category} size="small" />
      </Typography></>}
        // subheader={item.description}
      />
      
     
     
    </Card></>)}</Stack>
    </Grid>
    <Grid item md={4}><Stack spacing={4}>
    <Typography gutterBottom variant="h6">Live</Typography>
    <Typography gutterBottom variant="body1"> Released features</Typography>
    {userData?.productRequests?.filter(
                      (item) =>
                        item.status ==="Live"
                    ).map((item,index)=><>
    <Card >
      <CardHeader
        avatar={<><Typography gutterBottom variant="h6"><ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore></Typography>
      <Typography gutterBottom variant="h6"> <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            
            {item.upvotes}
          </Avatar></Typography></>
        }
        action={<>
          <IconButton aria-label="settings">
            <MoreVertIcon />
           {item?.comments?.length}
          </IconButton></>
        }
        title={<> <Typography gutterBottom variant="h6">
        {item.title}
      </Typography>
      <Typography gutterBottom variant="body2">
        
     {item.description}
      </Typography>
      <Typography gutterBottom variant="body2">
        
      <Chip color="primary" label={item.category} size="small" />
      </Typography></>}
        // subheader={item.description}
      />
      
     
     
    </Card></>)}</Stack>
    </Grid>
    </Grid>
  
  
 
    </>
  );
}