const app = require('./app');
const PORT = process.env.PORT || 5005;
const connectDB = require('./config/database');
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
