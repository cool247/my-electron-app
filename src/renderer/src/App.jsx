import { Box } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup'
import ECGDialog from './Dialogs/Ecg'
import Spo2Dialog from './Dialogs/Spo2'
import NiBPDialog from './Dialogs/NiBP'
import TempDialog from './Dialogs/Temp'
import RRDialog from './Dialogs/RR'
import PatientDialog from './Dialogs/Patient'
import SetUpDialog from './Dialogs/SetUp'
import AlarmDialog from './Dialogs/Alarm'
//FONT
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
//
import Screen from './screen/main'
import { useMenuSelectionStore } from './store/useMenuSelectionStore'
import useStompWebSocket from './socket'
import { useEffect } from 'react'
import { getDataByIdFromDB, setDataToDB } from './db'
import { useSpo2Store } from './store/useSpo2Store'
import { FactorySetting } from './utils/constants'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 530,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },

  palette: {
    mode: 'light',
    primary: {
      main: '#68d4ff'
    },
    secondary: {
      main: '#e697f3'
    },
    neonGreen: '#39FF14',
    neonBlue: '#1F51FF',
    neonRed: '#FF3131',
    neonYellow: '#cfff04',
    neonPink: '#2bff9f',
    save: '#28a745',
    reset: '#007bff',
    close: '#dc3545'
  },
  // spacing: 2,
  // typography: {
  //   fontSize: 10, // Decrease the font size for all elements
  //   htmlFontSize: 12, // Decrease the base font size for the entire document
  // },
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small' // Set a smaller default size for buttons
      },
      styleOverrides: {
        root: {
          textTransform: 'capitalize'
        }
      }
    },

    MuiButtonBase: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize'
        }
      }
    },

    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          [`& .${toggleButtonGroupClasses.middleButton}, .${toggleButtonGroupClasses.lastButton}`]:
            {
              borderLeftColor: '#b9b9b9'
            },
          boxShadow: '2px 2px 1px 1px #98b0b9'
        }
      }
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: '#000',
          textTransform: 'none',
          minWidth: 60,
          fontSize: '14px',
          // backgroundColor: "#c9f0ff",
          backgroundImage: 'linear-gradient(to right,rgb(41, 182, 246), rgb(68, 197, 255))',
          '&:hover': {
            backgroundImage: 'linear-gradient(to right,rgb(41, 182, 246), rgb(68, 197, 255))'
          },
          '&.Mui-selected': {
            background: '#0EF110',
            color: '#000',
            '&:hover': {
              background: '#0EF110',
              color: '#000'
            }
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#68d4ff'
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#68d4ff'
          }
        }
      }
    }
  }
})

const url = 'http://localhost:8080/spo2-websocket'

function App() {
  const selectedMenu = useMenuSelectionStore((store) => store.selectedMenu)
  const setDefaultValueDots = useSpo2Store((store) => store.setDefaultValueDots)
  const { sendMessage } = useStompWebSocket(url)

  //SET the SPO2 settings when application loads or Set default Setting First time
  useEffect(() => {
    async function initialize() {
      //spo2
      const spo2Value = await getDataByIdFromDB('SPO2')
      if (spo2Value) {
        setDefaultValueDots(spo2Value.settings.defaultValueDots)
      } else {
        setDataToDB({
          id: 'SPO2',
          settings: {
            defaultValueDots: FactorySetting.SPO2.defaultValueDots,
            inputValue: FactorySetting.SPO2.inputValue
          }
        })
      }

      //ECG
      const ecgValue = await getDataByIdFromDB('ECG')
      if (ecgValue) {
        //  setDefaultValueDots(ecgValue.settings.defaultValueDots);
        //SET the default value to global variable,
        console.log(ecgValue)
      } else {
        setDataToDB({
          id: 'ECG',
          settings: FactorySetting.ECG
        })
      }

      //NIBP
      const nibpValue = await getDataByIdFromDB('Nibp')
      if (nibpValue) {
        //  setDefaultValueDots(nibpValue.settings.defaultValueDots);
        //SET the default value to global variable,
        console.log(nibpValue)
      } else {
        setDataToDB({
          id: 'Nibp',
          settings: FactorySetting.Nibp
        })
      }
    }
    initialize()
  }, [setDefaultValueDots])

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          margin: 'auto',
          color: 'white',
          overflow: 'auto',
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: '#0c0c0c'
        }}
      >
        <Screen sendMessage={sendMessage} />
      </Box>
      {selectedMenu === 'ECG' && <ECGDialog sendMessage={sendMessage} />}
      {selectedMenu === 'SpO2' && <Spo2Dialog sendMessage={sendMessage} />}
      {selectedMenu === 'NiBP' && <NiBPDialog sendMessage={sendMessage} />}
      {selectedMenu === 'Temp' && <TempDialog sendMessage={sendMessage} />}
      {selectedMenu === 'RR' && <RRDialog sendMessage={sendMessage} />}
      {selectedMenu === 'Patient' && <PatientDialog sendMessage={sendMessage} />}
      {selectedMenu === 'Setup' && <SetUpDialog sendMessage={sendMessage} />}
      {selectedMenu === 'Alarm' && <AlarmDialog sendMessage={sendMessage} />}
    </ThemeProvider>
  )
}

export default App
