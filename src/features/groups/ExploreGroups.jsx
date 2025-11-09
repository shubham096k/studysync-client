import React,{useEffect}from'react';
import{useDispatch,useSelector}from'react-redux';
import{fetchGroups,joinGroup}from'./GroupsSlice';
import{Grid,Card,CardContent,Typography,Button,Snackbar,Alert}from'@mui/material';

export default function ExploreGroups(){
 const dispatch=useDispatch();
 const{groups}=useSelector(s=>s.groups);
 const[open,setOpen]=React.useState(false);
 useEffect(()=>{dispatch(fetchGroups())},[dispatch]);
 const handleJoin=async(id)=>{
   try{await dispatch(joinGroup(id)).unwrap();setOpen(true);}catch{}
 };
 return(<>
  <Grid container spacing={2} p={3}>
   {groups.map(g=>(
     <Grid item xs={12} sm={6} md={4} key={g.id}>
      <Card>
       <CardContent>
        <Typography variant="h6">{g.name}</Typography>
        <Typography variant="body2" sx={{mb:2}}>{g.description}</Typography>
        <Button variant="contained" onClick={()=>handleJoin(g.id)}>Join</Button>
       </CardContent>
      </Card>
     </Grid>
   ))}
  </Grid>
  <Snackbar open={open} autoHideDuration={3000} onClose={()=>setOpen(false)}>
   <Alert severity="success" sx={{width:'100%'}}>Joined group!</Alert>
  </Snackbar>
 </>);
}