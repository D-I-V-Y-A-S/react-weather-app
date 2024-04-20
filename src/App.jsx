import React from 'react'
import WeatherComponent from './Component/WeatherComponent/WeatherComponent'
import { QueryClientProvider, QueryClient } from 'react-query'
import WeatherQueryComponent from './Component/WeatherQueryComponent/WeatherQueryComponent'
function App() {
  const queryClient = new QueryClient()
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <WeatherComponent />
        {/* <WeatherQueryComponent/> */}
      </QueryClientProvider>
    </React.Fragment>
  )
}

export default App