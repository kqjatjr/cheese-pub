import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Callback = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams.get('code'));
  }, []);

  return <div>Callback</div>;
};

export default Callback;
