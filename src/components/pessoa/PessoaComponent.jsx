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

  // // Exemplo de cadastro de pessoa
  // const handleSubmit = async (pessoaData) => {
  //   try {
  //     const novaPessoa = await pessoaService.cadastrarAtualizarPessoa(pessoaData);
  //     // Atualizar estado ou fazer algo com a resposta
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

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

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Cadastro de Pessoas</h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Dados Pessoais */}
                <div className="mb-4">
                  <h4 className="mb-3">Dados Pessoais</h4>
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="nome" className="form-label">Nome</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="cpf" className="form-label">CPF</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="dataNascimento" className="form-label">Data de Nascimento</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dataNascimento"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="mb-4">
                  <h4 className="mb-3">Endereço</h4>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label htmlFor="cep" className="form-label">CEP</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cep"
                        name="endereco.cep"
                        value={formData.endereco.cep}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-8">
                      <label htmlFor="rua" className="form-label">Rua</label>
                      <input
                        type="text"
                        className="form-control"
                        id="rua"
                        name="endereco.rua"
                        value={formData.endereco.rua}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="numero" className="form-label">Número</label>
                      <input
                        type="text"
                        className="form-control"
                        id="numero"
                        name="endereco.numero"
                        value={formData.endereco.numero}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-5">
                      <label htmlFor="cidade" className="form-label">Cidade</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cidade"
                        name="endereco.cidade"
                        value={formData.endereco.cidade}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="estado" className="form-label">Estado</label>
                      <input
                        type="text"
                        className="form-control"
                        id="estado"
                        name="endereco.estado"
                        value={formData.endereco.estado}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Salvando...
                      </>
                    ) : 'Cadastrar'}
                  </button>
                </div>
              </form>
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
