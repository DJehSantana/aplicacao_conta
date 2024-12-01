import React, { useState, useEffect } from 'react';
import pessoaService from '../../services/PessoaService';

function PessoaComponent() {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    endereco: {
      cep: '',
      rua: '',
      numero: '',
      cidade: '',
      estado: ''
    }
  });
  const [pessoaSelecionada, setPessoaSelecionada] = useState(null);

  useEffect(() => {
    const carregarPessoas = async () => {
      setLoading(true);
      try {
        const data = await pessoaService.listarTodasPessoas();
        setPessoas(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    carregarPessoas();
  }, []);

  // Função para editar pessoa
  const handleEditar = (pessoa) => {
    setPessoaSelecionada(pessoa);
    setFormData({
      nome: pessoa.nome,
      cpf: pessoa.cpf,
      dataNascimento: pessoa.dataNascimento,
      endereco: {
        cep: pessoa.endereco.cep,
        rua: pessoa.endereco.rua,
        numero: pessoa.endereco.numero,
        cidade: pessoa.endereco.cidade,
        estado: pessoa.endereco.estado
      }
    });
    // Scroll para o formulário
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // // Função para excluir pessoa
  // const handleExcluir = async (id) => {
  //   if (window.confirm('Tem certeza que deseja excluir esta pessoa?')) {
  //     try {
  //       await pessoaService.excluirPessoa(id);
  //       setPessoas(pessoas.filter(pessoa => pessoa.id !== id));
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   }
  // };

   // Função para formatar CPF
  const formatarCpf = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Função para formatar endereço
  const formatarEndereco = (cidade, estado) => {
    return `${cidade}/${estado}`;
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('endereco.')) {
      const enderecoField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [enderecoField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const novaPessoa = await pessoaService.cadastrarAtualizarPessoa(formData);
      setPessoas(prev => [...prev, novaPessoa]);
      // Limpar formulário após sucesso
      setFormData({
        nome: '',
        cpf: '',
        dataNascimento: '',
        endereco: {
          cep: '',
          rua: '',
          numero: '',
          cidade: '',
          estado: ''
        }
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
      <div className="container-fluid bg-light min-vh-100 py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white py-4">
                <h2 className="text-center mb-0">Cadastro de Pessoas</h2>
              </div>
              
              <div className="card-body p-5">
                {error && (
                  <div className="alert alert-danger mb-4" role="alert">
                    {error}
                  </div>
                )}
  
                <form onSubmit={handleSubmit}>
                  {/* Dados Pessoais */}
                  <div className="mb-5">
                    <h4 className="mb-4 pb-2 border-bottom">Dados Pessoais</h4>
                    <div className="row g-4">
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="nome"
                            name="nome"
                            placeholder="Nome completo"
                            value={formData.nome}
                            onChange={handleInputChange}
                            required
                          />
                          <label htmlFor="nome">Nome completo</label>
                        </div>
                      </div>
  
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="cpf"
                            name="cpf"
                            placeholder="CPF"
                            value={formData.cpf}
                            onChange={handleInputChange}
                            required
                          />
                          <label htmlFor="cpf">CPF</label>
                        </div>
                      </div>
  
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="date"
                            className="form-control form-control-lg"
                            id="dataNascimento"
                            name="dataNascimento"
                            value={formData.dataNascimento}
                            onChange={handleInputChange}
                            required
                          />
                          <label htmlFor="dataNascimento">Data de Nascimento</label>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  {/* Endereço */}
                  <div className="mb-5">
                    <h4 className="mb-4 pb-2 border-bottom">Endereço</h4>
                    <div className="row g-4">
                      <div className="col-md-4">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="cep"
                            name="endereco.cep"
                            placeholder="CEP"
                            value={formData.endereco.cep}
                            onChange={handleInputChange}
                            required
                          />
                          <label htmlFor="cep">CEP</label>
                        </div>
                      </div>
  
                      <div className="col-md-8">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="rua"
                            name="endereco.rua"
                            placeholder="Rua"
                            value={formData.endereco.rua}
                            onChange={handleInputChange}
                            required
                          />
                          <label htmlFor="rua">Rua</label>
                        </div>
                      </div>
  
                      <div className="col-md-4">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="numero"
                            name="endereco.numero"
                            placeholder="Número"
                            value={formData.endereco.numero}
                            onChange={handleInputChange}
                            required
                          />
                          <label htmlFor="numero">Número</label>
                        </div>
                      </div>
  
                      <div className="col-md-5">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="cidade"
                            name="endereco.cidade"
                            placeholder="Cidade"
                            value={formData.endereco.cidade}
                            onChange={handleInputChange}
                            required
                          />
                          <label htmlFor="cidade">Cidade</label>
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="estado"
                            name="endereco.estado"
                            placeholder="Estado"
                            value={formData.endereco.estado}
                            onChange={handleInputChange}
                            required
                          />
                          <label htmlFor="estado">Estado</label>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div className="d-grid gap-2 mt-5">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg py-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Salvando...
                        </>
                      ) : 'Cadastrar Pessoa'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white py-4">
                <h2 className="text-center mb-0">Pessoas Cadastradas</h2>
              </div>
              
              <div className="card-body p-4">
                {pessoas.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>CPF</th>
                          <th>Localização</th>
                          <th className="text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pessoas.map((pessoa) => (
                          <tr key={pessoa.id}>
                            <td>{pessoa.nome}</td>
                            <td>{formatarCpf(pessoa.cpf)}</td>
                            <td>
                              {formatarEndereco(
                                pessoa.endereco.cidade,
                                pessoa.endereco.estado
                              )}
                            </td>
                            <td>
                              <div className="d-flex justify-content-center gap-3">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleEditar(pessoa)}
                                  title="Editar"
                                >
                                  <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleExcluir(pessoa.id)}
                                  title="Excluir"
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <p className="text-muted mb-0">
                      Nenhuma pessoa cadastrada ainda.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  // if (loading) return <div>Carregando...</div>;
  // if (error) return <div className="error">Erro: {error}</div>;

  // return (
  //   <div className="pessoa-container">
  //     <h1>Cadastro de Pessoas</h1>
      
  //     <form onSubmit={handleSubmit} className="pessoa-form">
  //       <div className="form-section">
  //         <h2>Dados Pessoais</h2>
  //         <div className="form-group">
  //           <label htmlFor="nome">Nome:</label>
  //           <input
  //             type="text"
  //             id="nome"
  //             name="nome"
  //             value={formData.nome}
  //             onChange={handleInputChange}
  //             required
  //           />
  //         </div>

  //         <div className="form-group">
  //           <label htmlFor="cpf">CPF:</label>
  //           <input
  //             type="text"
  //             id="cpf"
  //             name="cpf"
  //             value={formData.cpf}
  //             onChange={handleInputChange}
  //             required
  //           />
  //         </div>

  //         <div className="form-group">
  //           <label htmlFor="dataNascimento">Data de Nascimento:</label>
  //           <input
  //             type="date"
  //             id="dataNascimento"
  //             name="dataNascimento"
  //             value={formData.dataNascimento}
  //             onChange={handleInputChange}
  //             required
  //           />
  //         </div>
  //       </div>

  //       <div className="form-section">
  //         <h2>Endereço</h2>
  //         <div className="form-group">
  //           <label htmlFor="cep">CEP:</label>
  //           <input
  //             type="text"
  //             id="cep"
  //             name="endereco.cep"
  //             value={formData.endereco.cep}
  //             onChange={handleInputChange}
  //             required
  //           />
  //         </div>

  //         <div className="form-group">
  //           <label htmlFor="rua">Rua:</label>
  //           <input
  //             type="text"
  //             id="rua"
  //             name="endereco.rua"
  //             value={formData.endereco.rua}
  //             onChange={handleInputChange}
  //             required
  //           />
  //         </div>

  //         <div className="form-group">
  //           <label htmlFor="numero">Número:</label>
  //           <input
  //             type="text"
  //             id="numero"
  //             name="endereco.numero"
  //             value={formData.endereco.numero}
  //             onChange={handleInputChange}
  //             required
  //           />
  //         </div>

  //         <div className="form-group">
  //           <label htmlFor="cidade">Cidade:</label>
  //           <input
  //             type="text"
  //             id="cidade"
  //             name="endereco.cidade"
  //             value={formData.endereco.cidade}
  //             onChange={handleInputChange}
  //             required
  //           />
  //         </div>

  //         <div className="form-group">
  //           <label htmlFor="estado">Estado:</label>
  //           <input
  //             type="text"
  //             id="estado"
  //             name="endereco.estado"
  //             value={formData.endereco.estado}
  //             onChange={handleInputChange}
  //             required
  //           />
  //         </div>
  //       </div>

  //       <button type="submit" className="submit-button">Cadastrar</button>
  //     </form>
  //   </div>
  // );
}


export default PessoaComponent;
