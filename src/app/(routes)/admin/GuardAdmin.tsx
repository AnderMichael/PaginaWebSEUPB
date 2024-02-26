'use client';
import React, { useContext } from 'react'
import { redirect } from 'next/navigation';
import { StoreContext } from '../../../store/StoreProvider';

interface Props{
  children: React.ReactNode;
}

const GuardAdmin = ({children}:Props) => {
  const context:any = useContext(StoreContext);
  const {authAdmin} = context;
  if(!authAdmin){
    redirect('/');
  }

  return (
    <>
      {children}
    </>
  )
}

export default GuardAdmin