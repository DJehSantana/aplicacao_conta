const pessoaService = {
  // Listar todas as pessoas
  listarTodasPessoas: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      throw new Error('Erro ao listar pessoas: ' + error.message);
    }
  },

  // Buscar pessoa por CPF
  buscarPorCpf: async (cpf) => {
    try {
      const response = await api.get(`/${cpf}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar pessoa por CPF: ' + error.message);
    }
  },

  // Buscar pessoa por ID
  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar pessoa por ID: ' + error.message);
    }
  },

  // Cadastrar ou atualizar pessoa
  cadastrarAtualizarPessoa: async (pessoaData) => {
    try {
      const response = await api.post('/', pessoaData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao cadastrar/atualizar pessoa: ' + error.message);
    }
  },

  // Excluir pessoa
  excluirPessoa: async (id) => {
    try {
      await api.delete(`/${id}`);
      return true;
    } catch (error) {
      throw new Error('Erro ao excluir pessoa: ' + error.message);
    }
  },
};

export default pessoaService;