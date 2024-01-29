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
import { Box, Button, Chip, FormControl, Grid, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, Paper, Select, Stack, TextField } from '@mui/material';
import suggestionEmpty from "../../assets/suggestions/illustration-empty.svg"
import bulb2 from "../../assets/suggestions/bulb 2.png"
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import data1 from "../../data.json"
import { ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import avatar from "../../assets/user-images/image-anne.jpg"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
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




export default function FeedbackDetail() {
    const {id}=useParams();
    
const navigate=useNavigate();

  const [userData, setUserData] = React.useState<UserData|undefined>();
  const [open,setOpen]=React.useState(new Array(userData?.productRequests?.[0]?.comments?.length).fill(false));

  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const maxCharacters = 250;

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxCharacters) {
      setComment(inputValue);
    }
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
    <Stack spacing={4} >
    <Card
        >
      <CardHeader
        avatar={<>
          <Typography >
          
    </Typography></>
        }
        action={<>
          <Button sx={{
            color: "#F2F4FE",
            backgroundColor: "#4661E6",
            '&:hover': {
              backgroundColor: "#7C91F9",
            },
          }} onClick={()=>navigate(`/editFeedback/${id}`)}>Edit Feedback</Button></>
        }
        title={<> <Stack direction={"row"} spacing={2}><Typography variant="body1" color="#4661E6"  sx={{display:"flex",alignItems:"center"}}>
          <NavigateBeforeIcon/>
          </Typography><Typography gutterBottom variant="body1" ><Button sx={{color:"#647196"}} onClick={()=>navigate(-1)}>Go Back</Button>
        </Typography>
          </Stack>
        </>}

      
      />



    </Card>
      {userData?.productRequests?.filter(
                      (item) =>
                        item.id ===Number(id)
                    ).map((item,index)=><>
    <Card key={item.id}>
      <CardHeader
        avatar={<><Box sx={{  textAlign: "center", backgroundColor:"#F2F4FE"}}>

     <Typography  variant="h6"><ExpandMore
        expand={expanded
        }
        onClick={() => {
          setExpanded(!expanded);
        }}

        
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
      
     
     
    </Card>

   

<Collapse in={expanded} timeout="auto" unmountOnExit>

     <Card >
     {item?.comments?.map((comment,index)=><React.Fragment key={comment.id}>
      <CardHeader
        avatar={
          <Avatar alt={comment.user.name} 
          src={require(`../../assets/user-images/${comment.user.image}`)}
          />
        }
        action={
         
            <Button color="primary" onClick={() => {
              const newOpen = [...open];
              newOpen[index] = !newOpen[index];
              setOpen(newOpen);
            }}>Reply</Button>
          
        }
        title={comment.user.name}
        subheader={comment.user.username}
      />
      
      <CardContent>
        <Typography variant="body2" color="text.secondary" paddingLeft={"4.5%"}>
         {comment.content}
        </Typography>
        <Collapse
                                in={open[index]}
                                timeout="auto"
                                unmountOnExit
                              ><Typography variant="body2" color="text.secondary" paddingLeft={"4.5%"} sx={{mt:2}}  >
   
                             
                               
                              <TextField
                                  required
                              
                                  name="comment"
                                
                                  multiline
                                  rows={2}
                              
                                  sx={{ mb: "12px" ,width:"50%"}}
                              /> <Button type="submit" variant="contained"  sx={{ color: "#F2F4FE",
                              backgroundColor: "#AD1FEA",
                              '&:hover': {
                                backgroundColor: "#C75AF6",
                              },}}>
                                    Post Reply
                                        </Button>
                   
                     </Typography></Collapse>
        
      </CardContent>
     
      {comment?.replies?.map((reply,index?)=><React.Fragment key={index}>
        <Card sx={{ml:"30px"}}>
      <CardHeader
        avatar={
          <Avatar alt={reply?.user?.name} 
          src={require(`../../assets/user-images/${reply?.user?.image}`)}
          />
        }
        action={
          
           <Button color="primary">Reply</Button>
          
        }
        title={comment.user.name}
        subheader={reply?.user?.username}
      />
      
      <CardContent>
        <Typography variant="body2" color="text.secondary" paddingLeft={"4.5%"}>
         {comment.content}
        </Typography>
      </CardContent></Card></React.Fragment>
      )}
      </React.Fragment>)}
    </Card> <Paper
                elevation={20}
                sx={{ p: 3,mt:2 }}
                component="form"
            // onSubmit={handleSubmit}

            >
               
                <Grid container>
                   




                <Grid item xs={12}>
                        <FormControl fullWidth>
                          
                            <Typography variant='h6'>Add Comment</Typography>
                            <TextField
                                required
                                id="filled-multiline-static"
                                // label="Detail"
                                name="comment"

                                multiline
                                rows={3}
                                fullWidth
                                sx={{ mb: "12px" }}
onChange={handleComment}
                            /><Typography variant='body2'>{maxCharacters - comment.length} characters left</Typography>
                            </FormControl>
                    </Grid>

                    <Grid item xs={12}>



                    </Grid>
                    <Grid item xs={12} sx={{display:"flex",justifyContent:"flex-end"}}>
                    <Button type="submit" variant="contained" color="error" sx={{ color: "#F2F4FE",
              backgroundColor: "#AD1FEA",
              '&:hover': {
                backgroundColor: "#C75AF6",
              },}}>
                    Post Comment
                        </Button>
                       
                 
                    </Grid>
                </Grid>
            </Paper></Collapse></>)} 
    
    </Stack>
  </>
  );
}