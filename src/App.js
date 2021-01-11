import { createContext, useEffect, useState } from 'react';
import HomePage from './components/HomePage';
import { auth, generateUserDocument } from './firebase';

export const UserContext = createContext({ user: null })

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let reference

    async function getAuthState() {
      reference = auth.onAuthStateChanged(async userAuth => {
        const user = await generateUserDocument(userAuth)
        setUser(user)
      })
    }

    getAuthState()

    return () => {
      reference()
    }

  }, [])

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

function App() {
  return (
    <UserProvider>
      <HomePage />
    </UserProvider>
  )
}

export default App;
