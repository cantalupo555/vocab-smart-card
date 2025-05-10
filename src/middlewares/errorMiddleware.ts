/**
 * @fileOverview Global error handling middleware.
 * Provides centralized error handling for the Express application.
 * Logs unhandled errors and returns a consistent JSON response to the client.
 *
 * @dependencies
 * - express: Used to import Request, Response, and NextFunction types for the error handler.
 */
import { NextFunction, Request, Response } from 'express';

/**
 * @description Middleware for error handling.
 * Handles errors that occur during request processing and returns a consistent JSON response to the client.
 *
 * @param {Error} err - The error object caught by Express.
 * @param {Request} _req - Express request object (unused in this handler).
 * @param {Response} res - Express response object.
 * @param {NextFunction} _next - Express next function (required by Express for signature compatibility but not used here).
 */
function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
    console.error('Error:', err);
    res.status(500).json({ error: err.message || 'An error occurred while processing the request' });
}

export default errorHandler;
