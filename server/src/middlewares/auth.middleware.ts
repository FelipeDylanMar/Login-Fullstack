import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token não fornecido." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    // @ts-ignore (se for necessário para adicionar o campo)
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token inválido." });
  }
};
