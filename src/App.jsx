
import './App.css';
import PessoaComponent from './components/pessoa/PessoaComponent';


function App() {

  return (
    <>
      <div className="App"> 
        <header className="App-header"> 
          <h1>Desafio Senai</h1> 
        </header> 
          <main> 
            <PessoaComponent /> 
            <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </main> 
        </div>  

    </>
  )
}

export default App
