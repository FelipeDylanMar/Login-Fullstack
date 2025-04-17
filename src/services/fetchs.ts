import { loginData, SignUpData, UserUpdateData } from "../types/types";

export async function signUp(userData: SignUpData): Promise<string> {
  try {
    const response = await fetch("http://localhost:5000/signup", {
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

export async function login(userData: loginData): Promise<string> {
  try {
    const response = await fetch("http://localhost:5000/signup", {
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

export async function editUser(
  userData: UserUpdateData,
  token: string
): Promise<string> {
  try {
    const response = await fetch(`http://localhost:5000/users/${userData.id}`, {
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
    const response = await fetch(`http://localhost:5000/users/${id}`, {
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
