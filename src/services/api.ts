export interface Visitante {
  nome: string;
  whatsapp?: string;
}

export interface RegistrationData {
  visitantes?: Visitante[];
  nomes?: string[];
  whatsapp?: string;
  origem: string;
  amigo: string;
  consentimentos: boolean;
}

export const submitRegistration = async (data: RegistrationData) => {
  const apiUrl = import.meta.env.VITE_API_URL || '';
  // No Netlify, /api/telegram será redirecionado para a function automaticamente
  const endpoint = `${apiUrl}/api/telegram`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Registration Error:', error);
    throw error;
  }
};
