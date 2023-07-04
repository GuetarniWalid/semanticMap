import { Logo } from '@assets/img/logo';
import { useLoadCocoon } from './data/useLoadCocoon';

const Popup = () => {
  const pages = useLoadCocoon();
  console.log('🚀 ~ pages:', pages);

  return (
    <div class='w-full bg-[#673ab8] p-8 text-center text-lg'>
      <Logo />
      <p class='text-white'>Hello Vite + Preact!</p>
      <p class='text-white'>
        <a
          class='border-b-2'
          href='https://preactjs.com/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn Preact
        </a>
      </p>
      <p data-testid='popup_text' class='p-6 text-3xl text-purple-400'>
        Pop up page
      </p>
      {/* <h1>{pages}</h1> */}
    </div>
  );
};

export default Popup;
