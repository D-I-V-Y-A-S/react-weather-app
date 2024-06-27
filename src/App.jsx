import React from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import WeatherQueryComponent from './Component/WeatherQueryComponent/WeatherQueryComponent'
function App() {
  const queryClient = new QueryClient()
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <WeatherQueryComponent />
      </QueryClientProvider>
    </React.Fragment>
  )
}

export default App