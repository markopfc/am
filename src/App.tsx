import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Scenario from './components/modals/Scenario';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);

  return (
    <div>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>

      <button
        onClick={() => setIsOpen(true)}
        className='px-4 py-2 bg-blue-500 text-white rounded'
      >
        Open Modal
      </button>

      <Scenario
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title='Example Modal'
        dataTestId='mockId'
      >
        <p>This is a sample modal.</p>
        <input type='text' placeholder='Type something...' className='flex-1' />
        <button
          className='bg-blue-950 text-white'
          onClick={() => setIsOpenTwo(true)}
        >
          Go to Modal Two
        </button>
      </Scenario>

      <Scenario
        isOpen={isOpenTwo}
        onClose={() => setIsOpenTwo(false)}
        title='Example Modal Two'
        dataTestId='mockIdTwo'
      >
        <p>This is a sample modal two.</p>
        <input type='text' placeholder='Type something...' className='flex-1' />
        <button className='bg-blue-950 text-white'>Submit</button>
      </Scenario>
    </div>
  );
}

export default App;
