import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const IndexComponent = () => {
  const [sum, setSum] = useState<number | null>(null);
  const [doubledValue, setDoubledValue] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([import('remote/add'), import('remote/multiplyByTwo')]).then(
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
      <h1>Home page (Consumer 3000 Index)</h1>
      <Link href="http://localhost:3002">
        <button>Go to Shop (from 3000 to 3002)</button>
      </Link>
      <p>Calculation in 3000 with functions from 3001: Sum of 5 + 3 = {sum !== null ? sum : 'Loading...'}</p>
      <p>Calculation in 3000 with functions from 3001: 4 multiplied by 2 = {doubledValue !== null ? doubledValue : 'Loading...'}</p>
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