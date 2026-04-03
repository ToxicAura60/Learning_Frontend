import { Request, Response, NextFunction } from "express"
import { DomainError } from "../modules/user/domain.error"
import { EmailAlreadyInUseError, UserError } from "../modules/user/user.error"

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if(err instanceof DomainError) {
    if(err instanceof UserError) {
      if(err instanceof EmailAlreadyInUseError) {
        return res.status(409).json({
          error: {
            code: err.code,
            message: err.message
          }
        })
      }
    }
    return res.status(500).json({
      error: {
        code: err.code,
        message: err.message
      }
  })
  }
  return res.status(500).json({
    error: {
      code: "UNKNOWN"
    }
  })
}