import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    await userService.createUser(req.body);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error: any) {
    if (error.message === 'EMAIL_EXISTS') {
      res.status(400).json({ message: 'Email já cadastrado.' });
    }
    res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, user } = await userService.authenticateUser(req.body.email, req.body.password);
    res.status(200).json({ message: 'Login bem-sucedido!', token, user });
  } catch (error: any) {
    if (error.message === 'INVALID_CREDENTIALS') {
      res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await userService.updateUserById(req.params.id, req.body);
    res.status(200).json({ message: 'Usuário atualizado com sucesso!', updatedUser });
  } catch (error: any) {
    if (error.message === 'NOT_FOUND') {
      res.status(404).json({ message: 'Usuário não encontrado.' });
    } else {
      res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await userService.deleteUserById(req.params.id);
    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error: any) {
    if (error.message === 'NOT_FOUND') {
      res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
};

export const home = (_req: Request, res: Response) => {
  res.json({ message: 'Bem-vindo à página inicial!' });
};
