// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchGroupDetails } from './GroupsSlice';
// import { Box, Typography } from '@mui/material';
// import SessionsTable from '../sessions/SessionsTable';
// import DocumentsTable from '../documents/DocumentsTable';
// import UploadDocumentForm from '../documents/UploadDocumentForm';


// export default function MyGroupView() {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const { currentGroup } = useSelector(s => s.groups);
//     const { user } = useSelector(s => s.auth);


//     useEffect(() => {
//         dispatch(fetchGroupDetails(id));
//     }, [dispatch, id]);

//     if (!currentGroup) return <Typography>Loading...</Typography>;


//     return (
//         <Box p={3}>
//             <Typography variant="h5" gutterBottom>{currentGroup?.name}</Typography>
//             <Typography variant="body1" sx={{ mb: 3 }}>{currentGroup?.description}</Typography>

//             <UploadDocumentForm groupId={id} />
//             <SessionsTable groupId={id} status="active" userView={true} />
//             <SessionsTable groupId={id} status="completed" userView={true} />
//             <DocumentsTable admin={false} currentUserId={user?.id} />
//         </Box>
//     );
// }


import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroupDetails } from './GroupsSlice';
import { Box, Typography } from '@mui/material';
import SessionsTable from '../sessions/SessionsTable';
import DocumentsTable from '../documents/DocumentsTable';
import UploadDocumentForm from '../documents/UploadDocumentForm';


export default function MyGroupView() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentGroup } = useSelector(s => s.groups);
    const { user } = useSelector(s => s.auth);

    useEffect(() => {
        dispatch(fetchGroupDetails(id));
    }, [dispatch, id]);
    
    if (!currentGroup) return <Typography>Loading...</Typography>;

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>{currentGroup?.name}</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{currentGroup?.description}</Typography>

            <UploadDocumentForm groupId={id} />

            {/* Active Sessions - Show Add Task button */}
            <SessionsTable
                groupId={id}
                status="active"
                userView={false}  // ← CHANGE to false
            />

            {/* Completed Sessions - No actions needed */}
            <SessionsTable
                groupId={id}
                status="completed"
                userView={true}
            />

            {/* Documents Table - Now with groupId */}
            <DocumentsTable
                admin={false}
                currentUserId={user?.user_id}  // ← FIX: user_id not id
                groupId={id}  // ← ADD groupId
            />
        </Box>
    );
}
