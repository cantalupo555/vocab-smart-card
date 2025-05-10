/**
 * @fileOverview Express server setup and route configuration.
 * This file initializes the application middleware, routes, and error handling.
 * It also starts the server on the specified port.
 *
 * @dependencies
 * - express: For creating and managing the server, request/response types, and route handlers.
 * - ../config/serverConfig: Provides app, PORT, and environment-based config values.
 * - ../routes/*: Contains all route handlers for different application modules.
 */
import { NextFunction, Request, Response } from 'express';
import { app, PORT } from './config/serverConfig';

// Route handler imports
import authRoutes from './routes/authRoutes';
import optionsRoutes from './routes/optionsRoutes';
import userRoutes from './routes/userRoutes';
import generationRoutes from './routes/generationRoutes';
import ttsRoutes from './routes/ttsRoutes';
import tokenRoutes from './routes/tokenRoutes';

/**
 * @description Middleware for error handling.
 * Handles errors that occur during request processing and returns a consistent JSON response.
 *
 * @param {Error} err - The error object caught by Express.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function (not used here, but required by Express error handlers).
 */
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    console.error('Error:', err);
    res.status(500).json({ error: err.message || 'An error occurred while processing the request' });
}

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
