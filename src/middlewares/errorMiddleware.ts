/**
 * @fileOverview Global error handling middleware.
 * Provides centralized error handling for the Express application.
 * Logs unhandled errors and returns a consistent JSON response to the client.
 *
 * @dependencies
 * - express: Used to import Request, Response, NextFunction types for the error handler.
 */
import { NextFunction, Request, Response } from 'express';

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

export default errorHandler;
