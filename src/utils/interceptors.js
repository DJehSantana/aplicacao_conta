import axios from 'axios';

// Função para configurar os interceptors
export const setupInterceptors = (api) => {
  // Interceptor de Request
  api.interceptors.request.use(
    (config) => {
      config.headers['Content-Type'] = 'application/json';
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor de Response
  api.interceptors.response.use(
    (response) => {
      // Processar resposta bem-sucedida
      return response;
    },
    (error) => {
      // Tratamento de erros comum
      if (error.response) {
        switch (error.response.status) {
          case 404:
            console.error('Erro recurso não encontrado:', error.message);
            break;

          case 500:
            console.error('Erro interno do servidor:', error.message);
            break;

          default:
            // Outros erros
            break;
        }
      } else if (error.request) {
        // Erro de rede ou servidor não respondeu
        console.error('Erro de rede:', error.request);
      } else {
        // Erro na configuração da requisição
        console.error('Erro:', error.message);
      }

      return Promise.reject(error);
    }
  );
};
