/**
 * @fileOverview Express server setup and route configuration.
 * This file initializes the application middleware, routes, and error handling.
 * It also starts the server on the specified port.
 *
 * @dependencies
 * - ../config/serverConfig: Provides app and PORT.
 * - ../routes/*: Contains all route handlers for different application modules.
 */
import { app, PORT } from './config/serverConfig';

// Route handler imports
import authRoutes from './routes/authRoutes';
import optionsRoutes from './routes/optionsRoutes';
import userRoutes from './routes/userRoutes';
import generationRoutes from './routes/generationRoutes';
import ttsRoutes from './routes/ttsRoutes';
import tokenRoutes from './routes/tokenRoutes';

// Middleware imports
import errorHandler from './middlewares/errorMiddleware';

// --- Route Mounting ---
// Mount the imported route handlers to their respective base paths.
app.use('/auth', authRoutes);
app.use('/options', optionsRoutes);
app.use('/user', userRoutes);
app.use('/generate', generationRoutes);
app.use('/tts', ttsRoutes);
app.use('/token', tokenRoutes);

// --- Error Handling ---
// Register the global error handling middleware.
// This should typically be the last middleware added to the stack.
app.use(errorHandler);

// --- Server Initialization ---
// Start the Express server and listen on the configured port.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
