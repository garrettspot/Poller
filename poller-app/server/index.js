import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js'; 
import userRoutes from './routes/userRoutes.js';
import pollRoutes from './routes/pollRoutes.js';
import voteRoutes from './routes/voteRoutes.js';

// Load environment variables
// Initialize 
// Connect to MongoDB
dotenv.config();
const app = express();
await connectDB();

const PORT = process.env.PORT || 8000;

app.use(express.json());

// API routes
app.use('/api/users', userRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/votes', voteRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});