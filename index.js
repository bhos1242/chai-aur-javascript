const app = require('./src/app');

require('dotenv').config(); // Load environment variables

app.get("/",(req,res)=>{
  console.log("hello ")
  res.send("Hello hande")
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
