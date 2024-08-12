const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure this path is correct
const { auth } = require('../middlewares/authMiddleware'); // Ensure this path is correct

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, name } = req.body;
    const user = await userController.registerUser(email, password, role, name);
    console.log("register user")
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/user",async(req,res)=>{
  try{
    const users = await userController.getUsers();
    console.log(user)
    res.status(201).jso(user);
  }catch(error){
    res.status(400).json({error:error.message})
  }
})

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userController.loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get User Profile (Authenticated)
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await userController.getUserProfile(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update User Profile (Authenticated)
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    const user = await userController.updateUserProfile(req.user._id, updates);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
