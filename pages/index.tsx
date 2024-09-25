import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Nav = dynamic(() => import('mfe2/Nav'), { ssr: false });

const IndexComponent = () => {
  const [sum, setSum] = useState<number | null>(null);
  const [doubledValue, setDoubledValue] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([import('mfe2/add'), import('mfe2/multiplyByTwo')]).then(
      ([addModule, multiplyByTwoModule]) => {

        const add = addModule.default;
        const multiplyByTwo = multiplyByTwoModule.default;

        setSum(add(5, 3));
        setDoubledValue(multiplyByTwo(4));
      }
    )
  }, []);

  return (
    <div>
      <h1>MFE1</h1>
      <Nav /> 
      <p>Sum of 5 + 3 = {sum !== null ? sum : 'Loading...'}</p>
      <p>4 multiplied by 2 = {doubledValue !== null ? doubledValue : 'Loading...'}</p>
    </div>
  );
};

const Index = dynamic(() => Promise.resolve(IndexComponent), { ssr: false });

export default Index;

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};