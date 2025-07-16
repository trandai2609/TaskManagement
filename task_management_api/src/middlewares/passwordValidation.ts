import { Request, Response, NextFunction } from 'express';

export function validatePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password } = req.body;
  // Minimum 8 chars, at least one uppercase, one lowercase, one number, one special char
  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  if (!password || !strongPassword.test(password)) {
    return res
      .status(422)
      .json({
        error:
          'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
      });
  }
  next();
}
