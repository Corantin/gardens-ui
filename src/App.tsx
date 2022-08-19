import React from 'react'
import GlobalErrorHandler from './GlobalErrorHandler'
import { GardensProvider } from './providers/Gardens'
import { ProfileProvider } from './providers/Profile'
import { UserProvider } from './providers/User'
import { WalletProvider } from './providers/Wallet'
import Routes from './routes/Routes'
import { Main } from '@1hive/1hive-ui'
import MainView from '@components/MainView'
import { useAppTheme } from './providers/AppTheme'
import theme from './utils/theme'
import WelcomeLoader from '@components/Welcome/WelcomeLoader'
import { HashRouter } from 'react-router-dom'
import { ANY_ENTITY } from '@1hive/connect-react'

type AppearanceType = 'light' | 'dark'

function App() {
  const { appearance } = useAppTheme()

  return (
    <HashRouter>
      <Main
        assetsUrl="/aragon-ui/"
        layout={false}
        scrollView={false}
        theme={theme[appearance as AppearanceType]}
      >
        <WalletProvider>
          <GlobalErrorHandler>
            <ProfileProvider>
              <UserProvider>
                <GardensProvider>
                  <WelcomeLoader />
                  <MainView>
                    <Routes />
                  </MainView>
                </GardensProvider>
              </UserProvider>
            </ProfileProvider>
          </GlobalErrorHandler>
        </WalletProvider>
      </Main>
    </HashRouter>
  )
}

export default App
