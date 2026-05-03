import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pt: {
    translation: {
      "title": "Ministério Vida",
      "subtitle": "Um lugar de acolhimento, fé e recomeços. Queremos conhecer você e ajudar nessa jornada espiritual!",
      "cultsTitle": "Cultos Especiais",
      "cultsDesc": "Traga sua família para celebrar conosco.",
      "safeTitle": "Ambiente Seguro",
      "safeDesc": "Respeito e amor ao próximo acima de tudo.",
      "formTitle": "Primeira Visita",
      "formDesc": "Preencha seus dados abaixo para nos ajudar a receber você da melhor forma.",
      "errorsRequired": "Por favor, preencha todos os campos obrigatórios.",
      "errorFriend": "Por favor, informe o nome do amigo que indicou você.",
      "errorConsent": "Você precisa aceitar os termos e consentimentos para continuar.",
      "errorPhone": "Por favor, insira um número de telefone válido.",
      "errorSubmit": "Tivemos um problema ao enviar o cadastro. Tente novamente mais tarde.",
      "errorNetwork": "Erro de conexão. Verifique sua internet e tente novamente.",
      "nameLabel": "Nome",
      "namePlaceholder": "Seu nome",
      "addVisitor": "Adicionar acompanhante",
      "removeVisitor": "Remover",
      "phoneLabel": "Telefone / WhatsApp",
      "phonePlaceholder": "Número do telefone",
      "originLabel": "Como você conheceu a igreja?",
      "originPlaceholder": "Selecione uma opção",
      "originSocial": "Redes sociais (Instagram, Facebook)",
      "originGoogle": "Google / Pesquisa na internet",
      "originFriend": "Através de um Amigo/Conhecido",
      "friendLabel": "Qual o nome do seu amigo?",
      "friendPlaceholder": "Nome do amigo",
      "cookieConsent": "Aceito o uso de cookies para melhorar minha experiência na plataforma.",
      "termsConsent": "Autorizo o uso da minha imagem para divulgação institucional e permito o contato por parte do Ministério Vida.",
      "readTerms": "Ler os termos de Uso e Privacidade",
      "submitBtn": "Finalizar Cadastro",
      "submittingText": "Enviando dados...",
      "successTitle": "Seja Bem-vindo!",
      "successDesc": "Seu cadastro foi recebido com sucesso. Estamos muito felizes por ter você no Ministério Vida.",
      "successRedirecting": "Você será redirecionado para o nosso Instagram em instantes...",
      "successBtn": "Ir para o Instagram agora",
      "promiseBoxTitle": "Caixinha de Promessas",
      "promiseBoxDesc": "Clique para receber uma palavra especial para o seu dia.",
      "promiseBoxBtn": "Retirar uma Promessa",
      "promiseBoxAgain": "Retirar outra",
      "termsModalTitle": "Termos de Uso e Privacidade",
      "termsModalClose": "✕",
      "termsP1": "Ao utilizar nosso formulário, você concorda com nossas políticas abaixo descritas:",
      "termsH1": "1. Uso de Dados Pessoais",
      "termsD1": "Os dados coletados neste formulário têm o propósito exclusivo de registro interno de visitantes e relacionamento. O Ministério Vida se compromete a não vender, alugar ou transferir seus dados a terceiros não autorizados.",
      "termsH2": "2. Contato",
      "termsD2": "Ao fornecer o seu contato, você autoriza nossos líderes e equipe de recepção a enviarem mensagens pontuais com o intuito de acolhimento, envio de cronograma da igreja e eventuais avisos importantes.",
      "termsH3": "3. Uso de Imagem Institucional",
      "termsD3": "Durante nossos cultos e eventos, nossa equipe de mídia realiza capturas de foto e vídeo. Ao aceitar as condições, você autoriza o uso de sua imagem para fins de divulgação exclusiva.",
      "termsH4": "4. Segurança das Informações",
      "termsD4": "Armazenamos seus dados em ambiente seguro e utilizamos tecnologias criptografadas para a transmissão da informação.",
      "termsAccept": "Eu compreendo"
    }
  },
  en: {
    translation: {
      "title": "Ministério Vida",
      "subtitle": "A place of welcoming, faith, and fresh starts. We want to meet you and help in this spiritual journey!",
      "cultsTitle": "Special Services",
      "cultsDesc": "Bring your family to celebrate with us.",
      "safeTitle": "Safe Environment",
      "safeDesc": "Respect and love for others above all.",
      "formTitle": "First Visit",
      "formDesc": "Fill out your details below to help us welcome you in the best way.",
      "errorsRequired": "Please fill in all required fields.",
      "errorFriend": "Please provide the name of the friend who referred you.",
      "errorConsent": "You must accept the terms and consents to continue.",
      "errorPhone": "Please enter a valid phone number.",
      "errorSubmit": "We had a problem submitting your registration. Please try again later.",
      "errorNetwork": "Connection error. Check your internet and try again.",
      "nameLabel": "Name",
      "namePlaceholder": "Your name",
      "addVisitor": "Add companion",
      "removeVisitor": "Remove",
      "phoneLabel": "Phone / WhatsApp",
      "phonePlaceholder": "Phone number",
      "originLabel": "How did you hear about the church?",
      "originPlaceholder": "Select an option",
      "originSocial": "Social media (Instagram, Facebook)",
      "originGoogle": "Google / Web search",
      "originFriend": "Through a Friend/Acquaintance",
      "friendLabel": "What is your friend's name?",
      "friendPlaceholder": "Friend's name",
      "cookieConsent": "I accept the use of cookies to improve my experience on the platform.",
      "termsConsent": "I authorize the use of my image for institutional promotion and allow contact from Life Ministry.",
      "readTerms": "Read the Terms of Use and Privacy",
      "submitBtn": "Complete Registration",
      "submittingText": "Sending data...",
      "successTitle": "Welcome!",
      "successDesc": "Your registration was received successfully. We are very happy to have you at Life Ministry.",
      "successRedirecting": "You will be redirected to our Instagram shortly...",
      "successBtn": "Go to Instagram now",
      "promiseBoxTitle": "Promise Box",
      "promiseBoxDesc": "Click to receive a special word for your day.",
      "promiseBoxBtn": "Get a Promise",
      "promiseBoxAgain": "Get another",
      "termsModalTitle": "Terms of Use and Privacy",
      "termsModalClose": "✕",
      "termsP1": "By using our form, you agree to our policies described below:",
      "termsH1": "1. Use of Personal Data",
      "termsD1": "The data collected in this form has the exclusive purpose of internal registration of visitors and relationship. Life Ministry is committed not to sell, rent or transfer your data to unauthorized third parties.",
      "termsH2": "2. Contact",
      "termsD2": "By providing your contact, you authorize our leaders and reception team to send sporadic messages for the purpose of welcoming, sending the church schedule and any important notices.",
      "termsH3": "3. Institutional Image Use",
      "termsD3": "During our services and events, our media team captures photos and videos. By accepting the conditions, you authorize the use of your image for the exclusive purpose of promotion.",
      "termsH4": "4. Information Security",
      "termsD4": "We store your data in a secure environment and use encrypted technologies for information transmission.",
      "termsAccept": "I understand"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
