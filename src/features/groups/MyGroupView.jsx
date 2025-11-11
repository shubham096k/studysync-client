import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupDetails } from "./GroupsSlice";
import { Box, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import SessionsTable from "../sessions/SessionsTable";
import DocumentsTable from "../documents/DocumentsTable";
import UploadDocumentForm from "../documents/UploadDocumentForm";

export default function MyGroupView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentGroup } = useSelector((s) => s.groups);
  const { user } = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(fetchGroupDetails(id));
  }, [dispatch, id]);

  if (!currentGroup) return <Typography>Loading...</Typography>;

  return (
    <Box p={3}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <GroupIcon sx={{ fontSize: 40, color: "secondary.main" }} />
          <Typography variant="h4" fontWeight="bold">
            {currentGroup.name}
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          {currentGroup.description}
        </Typography>
      </Box>

      <UploadDocumentForm groupId={id} />

      {/* Active Sessions - Show Add Task button */}
      <SessionsTable
        groupId={id}
        status="active"
        userView={false} //CHANGE to false
      />

      {/* Completed Sessions - No actions needed */}
      <SessionsTable groupId={id} status="completed" userView={true} />

      {/* Documents Table - Now with groupId */}
      <DocumentsTable
        admin={false}
        currentUserId={user?.user_id} // user_id not id
        groupId={id} // groupId
      />
    </Box>
  );
}
