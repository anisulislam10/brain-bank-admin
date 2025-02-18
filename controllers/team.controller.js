import TeamMember from '../models/Team.model.js'

// Add a new team member
const addTeamMember = async (req, res) => {
  try {
    console.log('req file ----', req.file); 
    const { name, title, linkedin, twitter, github } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image) {
      return res.status(400).json({ message: 'Image is required.' });
    }

    const newMember = new TeamMember({
      name,
      title,
      linkedin,
      twitter,
      github,
      image,
    });

    await newMember.save();
    res.status(201).json({ message: 'Team Member Added Successfully', newMember });
  } catch (err) {
    res.status(500).json({ message: 'Error adding team member', error: err.message });
  }
};

// Get all team members
const getTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving team members', error: err.message });
  }
};

// Get team member by ID
const getTeamByID = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await TeamMember.findById(id);

    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving team member', error: err.message });
  }
};

// Delete a team member
const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await TeamMember.findByIdAndDelete(id);

    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.status(200).json({ message: 'Team member deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting team member', error: err.message });
  }
};

// Update a team member
const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, linkedin, twitter, github } = req.body;

    // Check if an image is uploaded, otherwise keep the current image
    let image = req.file ? `/uploads/${req.file.filename}` : null;

    // Find the team member and update
    const updatedMember = await TeamMember.findByIdAndUpdate(
      id,
      {
        name,
        title,
        linkedin,
        twitter,
        github,
        image: image, // Store the file path or retain the current one
      },
      { new: true } // Return the updated document
    );

    if (!updatedMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.status(200).json({ message: 'Team member updated successfully', updatedMember });
  } catch (err) {
    res.status(500).json({ message: 'Error updating team member', error: err.message });
  }
};

export {
  addTeamMember,
  getTeamMembers,
  getTeamByID,
  deleteTeamMember,
  updateTeamMember,
};
