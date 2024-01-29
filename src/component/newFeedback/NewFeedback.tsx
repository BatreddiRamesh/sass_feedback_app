import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { useState } from "react";
import {
    Select,
    Grid,
    TextField,
    Container,
    Button,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    LinearProgress,
    SelectChangeEvent,
} from "@mui/material/";
import { useNavigate } from "react-router-dom";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"

interface Feedback{
    id?:Number
    title: string;
    category: string;
    description:string;  
}
 const NewFeedback: React.FC = ()=> {
const navigate=useNavigate();
const [feedback, setFeedback] = useState<Feedback>({
    id:undefined,
    title: "",
    category: "",
    description:""
  });

  const onChangeHandler = async (e: (ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)|SelectChangeEvent<string>) => {
     
      setFeedback({ ...feedback, [e.target.name]: e.target.value });
    
  };

  
  const [userData, setUserData] = useState<any>();
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
   
    e.preventDefault();
    console.log(feedback);
    const { productRequests, ...restUserData } = userData;
    const maxId = await productRequests?.reduce((max:Number, obj:any) => (obj?.id > max ? obj.id : max), 0);

  const updatedProductRequests = [...productRequests, {...feedback,id:maxId + 1}];

  const updatedUserData = { ...restUserData, productRequests: updatedProductRequests };

  // Save the updated data back to local storage
  localStorage.setItem('userdata', JSON.stringify(updatedUserData));

  // Update the state to reflect the change
  setUserData(updatedUserData);
  stateClear();
  
};


const stateClear=()=>{
    setFeedback({
        title: "",
        category: "",
        description:""
      });
      fetchDetails();
}



const fetchDetails=()=>{
  // Retrieve existing data from local storage
  const storedData = localStorage.getItem('userdata');
    
  // If there's existing data, parse it and update the state
  if (storedData) {
    setUserData(JSON.parse(storedData));
  }
}

  useEffect(() => {
    fetchDetails();
  }, []);




    return (
        <Container component="main" maxWidth="xl">

            <Paper
                elevation={20}
                sx={{ p: 4,m:2}}
                component="form"
            onSubmit={onSubmitHandler}

            ><Typography gutterBottom variant="h6" ><NavigateBeforeIcon /><Button sx={{color:"#647196"}} onClick={()=>navigate(-1)}>Go Back</Button></Typography>
                <Typography
                    component="h1"
                    variant="h6"
                    align="center"
                    sx={{ mb: 3 ,fontWeight:"bold"}}
                    color="secondary"
                >
                    Create New Feedback
                </Typography>
                <Grid container>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <Typography sx={{fontWeight:"bold"}}>Feedback Title</Typography> <Typography>Add a short, descriptive headline</Typography>
                            <TextField
                                id="outlined-basic"
                                label="Title"
                                type="text"
                                name="title"
                                fullWidth
                                  value={feedback.title}
                                
                                onChange={onChangeHandler}
                                required
                                sx={{ mb: "12px" }}
                            /></FormControl>
                    </Grid>




                    <Grid item xs={12}>
                        <FormControl fullWidth>

                            <Typography sx={{fontWeight:"bold"}}>Category</Typography> <Typography>Choose a category for your feedback</Typography>
                            <Select
                                required
                              
                                name="category"
                                className="form-control"
                                value={feedback.category}
                                onChange={onChangeHandler}
                                
                                fullWidth
                            >
                                

                                <MenuItem
value={"Feature"}
                                >
                                    Feature
                                </MenuItem>
                                <MenuItem
value={"UI"}
                                >
                                    UI
                                </MenuItem>
                                <MenuItem
value={"UX"}
                                >
                                    UX
                                </MenuItem>
                                <MenuItem

                               value={"Enhancement"} >
                                    Enhancement
                                </MenuItem>
                                <MenuItem
value={"Bug"}
                                >
                                    Bug
                                </MenuItem>



                            </Select>
                        </FormControl>
                    </Grid>





                    <Grid item xs={12}>
                        <FormControl fullWidth sx={{mt:2}}>
                          
                            <Typography sx={{fontWeight:"bold"}}>Feedback Detail</Typography> <Typography>Include any specific comments on what should be improved, added, etc.</Typography>
                            <TextField
                                required
                                id="filled-multiline-static"
                                label="Description"
                                name="description"
                               value={feedback.description}
                                multiline
                                rows={4}
                                fullWidth
                                sx={{ mb: "12px" }}
                                onChange={onChangeHandler}

                            /></FormControl>
                    </Grid>

                    <Grid item xs={12}>



                    </Grid>
                    <Grid item xs={12} sx={{display:"flex",justifyContent:"flex-end"}}>
                    <Button sx={{m:2,
              color: "#F2F4FE",
              backgroundColor: "#3A4374",
              '&:hover': {
                backgroundColor: "#3A4374",
              },

            }} onClick={()=>navigate(-1)}>Cancel</Button>
                        <Button type="submit" sx={{m:2,
              color: "#F2F4FE",
              backgroundColor: "#AD1FEA",
              '&:hover': {
                backgroundColor: "#C75AF6",
              },

            }} >Add Feedback</Button>
                        
                    </Grid>
                </Grid>
                
            </Paper>
        </Container>
    );
}
export default NewFeedback;