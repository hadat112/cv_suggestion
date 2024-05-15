import { ReactElement } from 'react';

interface ILoginButton3rd {
  icon: ReactElement;
  text: string;
  onClick?: () => void;
}

const LoginButton3rd = ({ icon, text, onClick }: ILoginButton3rd) => (
  <button
    onClick={onClick}
    className="flex justify-center items-center relative rounded-full cursor-pointer h-[3em] w-full px-4 py-3 border border-solid border-th-border bg-transparent hover:text-th-primary hover:border-primary"
  >
    <span className="flex items-center justify-center justify-self-start text-th-text-primary md:absolute left-4">
      {icon}
    </span>{' '}
    <span className="hidden md:flex items-center justify-center justify-self-center">{text}</span>
  </button>
);

export default LoginButton3rd;
