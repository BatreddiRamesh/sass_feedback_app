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
import suggestionEmpty from "../../assets/suggestions/illustration-empty.svg"
import bulb2 from "../../assets/suggestions/bulb 2.png"
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import datauser from "../../data.json"
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
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

interface User {
  image: string;
  name: string;
  username: string;
}

interface Comment {

  id: number;
  content: string;
  user: User;
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




export default function Suggestions() {
const navigate=useNavigate();
  const [userData, setUserData] = React.useState<UserData|undefined>();
  const [open, setOpen] = React.useState(new Array(userData?.productRequests?.length).fill(false));
  const handleExpandClick = (index:number,id: number) => {
    const newOpen = [...open];
    newOpen[index] = !newOpen[index];
    setOpen(newOpen);
    navigate(`feedbackDetail/${id}`)
  };

  React.useEffect(()=>{
    // localStorage.setItem("userdata", JSON.stringify(datauser));
    const handleBeforeUnload = () => {
      // This code will run when the page is about to be unloaded (refreshed)
      localStorage.setItem("userdata", JSON.stringify(datauser));
    };
  
    // Attach the event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    // Detach the event listener when the component is unmounted
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  },[])

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
            <img src={bulb2} className="App-logo" alt="logo" />
      </Typography></>
          }
          action={<>
            <Button sx={{
              color: "#F2F4FE",
              backgroundColor: "#AD1FEA",
              '&:hover': {
                backgroundColor: "#C75AF6",
              },

            }} onClick={()=>navigate("newFeedback")}>+ Add Feedback</Button></>
          }
          title={<> <Stack direction={"row"} spacing={2}><Typography gutterBottom variant="h6" color="#FFFFFF">
            {userData&&userData?.productRequests?.length>0?userData?.productRequests?.length:"0"} Suggestions
          </Typography><Typography gutterBottom variant="body1" color="#F2F4FE">
              Sort by
            </Typography>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 ,color:"#FFFFFF"}}>
        {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          // value={age}
          // onChange={handleChange}
          label="Age"
          sx={{color:"#FFFFFF"}}
        >
          
          <MenuItem value={"Most Upvotes"}>Most Upvotes</MenuItem>
          <MenuItem value={"Least Upvotes"}>Least Upvotes</MenuItem>
          <MenuItem value={"Most Comments"}>Most Comments</MenuItem>
          <MenuItem value={"Least Comments"}>Least Comments</MenuItem>
        </Select>
      </FormControl></Stack>
          </>}

        // subheader={item.description}
        />



      </Card>
  {userData&&userData?.productRequests?.length>0?
    <Stack spacing={4} >
      
      {userData?.productRequests?.map((item,index)=>
    <Card key={item.id}>
      <CardHeader
        avatar={<><Box sx={{  textAlign: "center", backgroundColor:"#F2F4FE"}}>

     <Typography  variant="h6"><ExpandMore
        expand={open[index]}
        onClick={()=>handleExpandClick(index,item.id)}

        
      >
        <ExpandMoreIcon color="primary"/>
      </ExpandMore></Typography>
      <Typography gutterBottom variant="h6">
            
            {item.upvotes}
          </Typography></Box></>
        }
        action={<><Typography >
          <IconButton aria-label="settings">
            <ChatBubbleTwoToneIcon/>
  
          
           
          </IconButton>{item?.comments?.length}</Typography></>
        }
        title={<> <Typography gutterBottom variant="h6" color="#3A4374">
        {item.title}
      </Typography>
      <Typography gutterBottom variant="body2">
        
     {item.description}
      </Typography>
      <Typography gutterBottom variant="body2">
        
      <Chip color="primary" label={item.category} size="small" variant="filled" />
      </Typography></>}
        // subheader={item.description}
      />
      
     
     
    </Card>)}

    </Stack>
:    
    <Box sx={{ m: "40px", textAlign: "center", }}>

      <Typography >
        <Avatar
          alt="Remy Sharp"
          sx={{
            width: "30%",
            height: "10%",
            display: "block",
            ml: "35%",
            mr: "35%",
          }}
          src={suggestionEmpty}
        />
      </Typography>

      <Typography variant="h5" gutterBottom>
        There is no feedback yet.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <Button sx={{
          color: "#F2F4FE",
          backgroundColor: "#AD1FEA",
          '&:hover': {
            backgroundColor: "#C75AF6",
          },
        }} onClick={()=>navigate("/newFeedback")}>+ Add Feedback</Button>
      </Typography>

    </Box>}
  </>
  );
}