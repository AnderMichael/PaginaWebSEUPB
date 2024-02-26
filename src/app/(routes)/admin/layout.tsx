"use client";
import React from 'react';
import GuardAdmin from './GuardAdmin';

interface Props{
  children: React.ReactNode;
}

const layout = ({children}:Props) => {
  return (
    <GuardAdmin>
      <>
      {children}
      </>
    </GuardAdmin>
  )
}

export default layout