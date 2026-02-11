import React, { useState, useEffect } from 'react'
import Home from './components/home'
import LoadingScreen from './components/LoadingScreen'
import About from './components/about'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <LoadingScreen 
        isLoading={isLoading} 
        onLoadingComplete={() => setIsLoading(false)}
        minDuration={3000}
      />
      <Home />
      <About />
    </>
  )
}

export default App
