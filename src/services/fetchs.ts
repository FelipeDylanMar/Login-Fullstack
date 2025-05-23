import { loginData, SignUpData, UserUpdateData } from "../types/types";

const BASE_URL = "http://localhost:5000/api";

export async function signUp(userData: SignUpData): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar o usuário");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export async function login(userData: loginData): Promise<{
  token: string;
  user: any;
}> {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer login");
    }

    const data = await response.json();
    return {
      token: data.token,
      user: data.user,
    };
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export async function editUser(
  userData: UserUpdateData,
  token: string
): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}/users/${userData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Erro ao editar o usuário");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Erro ao editar:", error);
    throw error;
  }
}

export async function deleteUser(id: string, token: string): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar o usuário");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Erro ao deletar:", error);
    throw error;
  }
}
