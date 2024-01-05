import React, { useEffect } from 'react';

const PaymentSuccess = () => {

  // useEffect(() => {

  //   const timeout = setTimeout(() => {

  //     window.location.href = '/';
  //   }, 3000); 

  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <div className='h-90vh  bg-whiteSmoke flex justify-center items-center flex-col'>
      <article className=' h-[50%] w-[50%] rounded-2xl shadow-2xl flex justify-center flex-col items-center'>
        <h2 className='p-2 text-lg font-bold'>Su pago fue aprobado!</h2>
        <h3 className='p-2'>Gracias por confiar en nosotros</h3>
      </article>
      <p>redirigiendo en 3, 2, 1...</p>
    </div>
  );
};

export default PaymentSuccess;