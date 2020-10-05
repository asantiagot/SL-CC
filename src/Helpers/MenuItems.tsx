import InboxIcon from '@material-ui/icons/Inbox';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import LabelIcon from '@material-ui/icons/Label';
import React from "react";

export const mailboxItems = [
  { title: 'Inbox', link: 'inbox', icon: <InboxIcon fontSize='small' /> },
  { title: 'Starred', link: 'starred', icon: <StarIcon fontSize='small' /> },
  { title: 'Sent', link: 'sent', icon: <SendIcon fontSize='small'/>},
  { title: 'Trash', link: 'trash', icon: <DeleteIcon fontSize='small'/>},
]

export const emailTags = [
  { title: 'Work', link: 'work', icon: <LabelIcon fontSize='small'/>},
  { title: 'Travel', link: 'travel', icon: <LabelIcon fontSize='small'/>},
]