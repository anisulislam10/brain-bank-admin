import express from 'express';
import multer from 'multer';
import { addTeamMember, getTeamMembers, deleteTeamMember, updateTeamMember, getTeamByID } from '../controllers/team.controller.js';

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Store uploaded images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Route to get all team members
router.get('/get', getTeamMembers);

// Route to add a new team member
router.post('/post', upload.single('image'), addTeamMember);

// Route to delete a team member by ID
router.delete('/:id', deleteTeamMember);

// Route to update a team member by ID
router.put('/:id', upload.single('image'), updateTeamMember);

// Route to get a team member by ID
router.get('/:id', getTeamByID);

export default router;
