"use client";

import { createContext, useContext} from 'react';

const userContext = createContext();

export function UserProvider({user, children}) {
  return (
    <userContext.Provider value={user}>
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  return useContext(userContext);
}