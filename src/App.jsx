import React from 'react'
import WeatherComponent from './Component/WeatherComponent/WeatherComponent'
import { QueryClientProvider, QueryClient } from 'react-query'
function App() {
  const queryClient = new QueryClient()
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <WeatherComponent />
      </QueryClientProvider>
    </React.Fragment>
  )
}

export default App