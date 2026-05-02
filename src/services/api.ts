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
  const response = await fetch('/api/telegram', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  return response.json();
};
