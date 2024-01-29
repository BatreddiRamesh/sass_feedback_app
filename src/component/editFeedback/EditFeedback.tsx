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

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import { useNavigate, useParams } from "react-router-dom";
interface Feedback{
    title: string|undefined;
    category: string|undefined;
    description:string|undefined;  
}
export default function EditFeedback() {
    const {id}=useParams();
    
    const navigate=useNavigate();
    const [userData, setUserData] = useState<any>();
    const [feedback, setFeedback] = useState<Feedback>();
    const [status, setStatus] = useState<string>("");
if(feedback){
    console.log("edittttt", feedback);
}
     
    
     
    
      
      
      const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
       
        e.preventDefault();
        console.log(feedback);
        const { productRequests, ...restUserData } = userData;
      const updatedProductRequests = [...productRequests, {...feedback,status:status,id}];
    
      const updatedUserData = { ...restUserData, productRequests: updatedProductRequests };
    
      // Save the updated data back to local storage
      localStorage.setItem('userdata', JSON.stringify(updatedUserData));
    
      // Update the state to reflect the change
      setUserData(updatedUserData);
      stateClear();
      
    };

    const onChangeHandler = async (e: (ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)|SelectChangeEvent<string>) => {
       if(feedback){
        e?.target?.name==="status"?setStatus(e.target.value):
        setFeedback({ ...feedback, [e.target.name]: e.target.value })
      
       }
       
    };
    
    const stateClear=()=>{
        setFeedback({
            title: "",
            category: "",
            description:""
          });
          fetchDetails();
    }
    
    
    
    const fetchDetails = () => {
        // Retrieve existing data from local storage
        const storedData = localStorage.getItem('userdata');
      
        // If there's existing data, parse it and update the state
        if (storedData) {
          setUserData(JSON.parse(storedData));

      
          // Find the product request based on the id
          const matchedProductRequest = userData?.productRequests.find(
            (item:any) => item.id === Number(id)
          );
       
          // Update feedback state with matched details
          if (matchedProductRequest) {
            console.log("qwweerr",matchedProductRequest)
            setFeedback({
              title: matchedProductRequest?.title,
              category: matchedProductRequest?.category,
              description: matchedProductRequest?.description,
            });
          }
        }
      };
      
    
      useEffect(() => {
        fetchDetails();
      }, [feedback]);

      
    
    return (
        <Container component="main" maxWidth="xl">

            <Paper
                elevation={20}
                sx={{ p: 5,m:2 }}
                component="form"
            onSubmit={onSubmitHandler}

            ><Typography gutterBottom variant="body1" ><NavigateBeforeIcon /><Button sx={{color:"#647196"}} onClick={()=>navigate(-1)}>Go Back</Button></Typography>
                <Typography
                    component="h1"
                    variant="h6"
                    align="center"
                    sx={{ mb: 3 }}
                    color="secondary"
                >
                    Edit Feedback
                </Typography>
                <Grid container>
                <Grid item xs={12}>
                        <FormControl fullWidth>
                            <Typography sx={{fontWeight:"bold"}}>Feedback Title</Typography> <Typography>Add a short, descriptive headline</Typography>
                            <TextField
                                id="outlined-basic"
                      
                                type="text"
                                name="title"
                                fullWidth
                                  value={feedback?.title||""}
                                
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
                                value={feedback?.category||""}
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
                        <FormControl fullWidth>
                              
                            <Typography>Update Status</Typography> <Typography>Change feature state</Typography>
                            <Select
                                required
                              
                                name="status"
                                className="form-control"
                                value={status}
                                onChange={onChangeHandler}
                                
                                fullWidth
                            >
                               
                               <MenuItem
value={"Suggestion"}
                                >
                                    Suggestion
                                </MenuItem>
                                <MenuItem
value={"Planned"}
                                >
                                    Planned
                                </MenuItem>
                                <MenuItem
value={"In-Progress"}
                                >
                                   In-Progress
                                </MenuItem>
                                <MenuItem
value={"Live"}
                                >
                                    Live
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
                                
                                name="description"
                               value={feedback?.description
                                }
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
                    <Button type="submit" variant="contained" color="error" sx={{ m:2}}>
                    Delete
                        </Button>
                        <Button sx={{m:2,
              color: "#F2F4FE",
              backgroundColor: "#3A4374",
              '&:hover': {
                backgroundColor: "#3A4374",
              },

            }} >Cancel</Button>
                        <Button sx={{m:2,
              color: "#F2F4FE",
              backgroundColor: "#AD1FEA",
              '&:hover': {
                backgroundColor: "#C75AF6",
              },

            }} >Save Changes </Button>
                    </Grid>
                </Grid>
                {/* </Box> */}

                {/* <CommonSnackBar message={snackMessage} open={openSnackBar} /> */}
            </Paper>
        </Container>
    );
}
