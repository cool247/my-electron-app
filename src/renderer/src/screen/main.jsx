import { useEffect, useRef, useState } from 'react'
import { Grid, Typography, Box, IconButton } from '@mui/material'
import { Notifications, FlashOn, Menu as MenuIcon, Refresh } from '@mui/icons-material'
import BatteryIcon from '../assets/battery.jsx'

import AnchorTemporaryDrawer from '../components/drawer.jsx'
import EcgChart from './chart/EcgChart.jsx'
import Spo2Chart from './chart/Spo2Chart.jsx'
import Ecg from './device/Ecg.jsx'
import Temp from './device/Temp.jsx'
import NiBP from './device/Nibp.jsx'
import Spo2 from './device/Spo2.jsx'
import { getDataByIdFromDB } from '../db/index.js'

const initialPatientInfo = {
  name: '',
  age: '',
  gender: '',
  patientType: 'Adult'
}

export default function Screen() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [patientInfo, setPatientInfo] = useState(initialPatientInfo)

  async function initialize() {
    const patientSettings = await getDataByIdFromDB('Patient')
    if (patientSettings && patientSettings.settings) {
      setPatientInfo(patientSettings.settings || initialPatientInfo)
    }
  }

  useEffect(() => {
    document.addEventListener('Patient', async () => {
      initialize()
    })

    initialize()
  }, [])

  return (
    <>
      <AnchorTemporaryDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />

      <Box
        p={0.5}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3
            // borderBottom: "1px solid #525252",
          }}
        >
          <Typography variant="subtitle2" sx={{ width: 130 }}>
            Name:
            <br />
            <b style={{ color: '#f9ff00' }}>{patientInfo.name}</b>
          </Typography>
          <Typography variant="subtitle2">
            Age:
            <br />
            <b style={{ color: '#f9ff00' }}>{patientInfo.age}</b>
          </Typography>
          <Typography variant="subtitle2">
            Gender:
            <br />
            <b style={{ color: '#f9ff00' }}>{patientInfo.gender}</b>
          </Typography>
          <Typography variant="subtitle2">
            Type:
            <br />
            <b style={{ color: '#f9ff00' }}>{patientInfo.patientType}</b>
          </Typography>
          <ScrollableMessage message=" Critical Value Notification (Value Exceeds Limit Display)" />
          <ScrollableMessage message="Machine ERROR Code" />
          <Time />
          <Battery />
          <IconButton size="small" color="info" onClick={() => setOpenDrawer(true)}>
            <MenuIcon fontSize="large" />
          </IconButton>
        </Box>

        <Grid container>
          <Grid container item xs={12} sm={12} md={8}>
            <EcgChart title="I" />
            <EcgChart title="II" />
            <EcgChart title="III" />
            <EcgChart title="aVR" />
            <EcgChart title="aVL" />
            <EcgChart title="aVF" />
            <EcgChart title="RR" />
            <Spo2Chart title="Pleth" />
          </Grid>

          <Grid container item xs={12} sm={12} md={4}>
            <Grid item xs={12}>
              <Ecg patientInfo={patientInfo} />
            </Grid>

            <Grid item xs={12}>
              <Temp patientInfo={patientInfo} />
            </Grid>

            <Grid item xs={12}>
              <NiBP patientInfo={patientInfo} />
            </Grid>

            <Grid item xs={12}>
              <Spo2 patientInfo={patientInfo} />
            </Grid>
          </Grid>
        </Grid>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTop: '1px solid #525252'
          }}
        >
          <IconButton variant="contained" color="warning" size="small">
            <Refresh />
          </IconButton>
          <div>
            <IconButton size="small" color="warning">
              <FlashOn />
            </IconButton>
            <IconButton size="small" color="primary">
              <Notifications />
            </IconButton>
          </div>
        </div>
      </Box>
    </>
  )
}

function ScrollableMessage({ message }) {
  const containerRef = useRef(null)
  const [animationDuration, setAnimationDuration] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const containerHeight = container.scrollHeight
    const scrollHeight = containerHeight - container.clientHeight
    const duration = (scrollHeight / 5) * 1000 // Adjust the speed here (50 pixels per second)
    setAnimationDuration(duration)
  }, [message])

  return (
    <Box
      ref={containerRef}
      sx={{
        width: 350,
        height: 40,
        border: '1px solid darkgreen',
        borderRadius: 1,
        fontSize: '0.875rem',
        paddingInline: 1,
        color: 'neonGreen',
        overflowY: 'hidden' // Hide overflow to enable scrolling effect
      }}
    >
      <div
        style={{
          animation: `scroll ${animationDuration}ms linear infinite`
          // whiteSpace: "nowrap", // Prevent line breaks
        }}
      >
        {message}
      </div>
    </Box>
  )
}

function Time() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  useEffect(() => {
    // Update date and time every minute
    const interval = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 60000) // 60000 milliseconds = 1 minute

    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [])

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
    return date.toLocaleDateString('en-IN', options)
  }

  const formatTime = (time) => {
    const options = { hour: '2-digit', minute: '2-digit' }
    return time.toLocaleTimeString([], options)
  }

  return (
    <div>
      <p>{formatDate(currentDateTime)}</p>
      <p>{formatTime(currentDateTime)}</p>
    </div>
  )
}

function Battery() {
  return (
    <div style={{ rotate: '90deg', paddingRight: 8 }}>
      <BatteryIcon color="success" sx={{ fontSize: 30 }} height={12} />
    </div>
  )
}

// +++++++++++++++++++++++++++++++++++++++

// function IBP() {
//   return (
//     <Card elevation={2}>
//       <CardHeader
//         title={
//           <Typography variant="h6" color="secondary">
//             IBP(mmHg)
//           </Typography>
//         }
//       />
//       <Divider />
//       <CardContent>
//         <Stack direction="row" alignItems="center" spacing={4}>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <Typography variant="caption">
//               <Chip size="small" label="Art" color="warning" variant="filled" />
//             </Typography>
//             <Typography variant="caption">
//               125
//               <br />
//               89
//             </Typography>

//             <Typography variant="h3" color="primary">
//               <div
//                 style={{
//                   fontSize: "0.85rem",
//                   letterSpacing: 0,
//                   marginBottom: -12,
//                 }}
//               >
//                 SYS
//               </div>
//               120
//             </Typography>
//             <Typography variant="h3" color="primary">
//               /
//             </Typography>
//             <Typography variant="h3" color="primary">
//               <div
//                 style={{
//                   fontSize: "0.85rem",
//                   letterSpacing: 0,

//                   marginBottom: -12,
//                 }}
//               >
//                 DIA
//               </div>
//               99
//             </Typography>
//             <Typography variant="caption">
//               59
//               <br />
//               85
//             </Typography>
//           </Stack>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <Typography variant="h6">MEAN</Typography>

//             <Typography variant="h3" color="secondary">
//               93
//             </Typography>
//             <Typography variant="caption">
//               110
//               <br />
//               60
//             </Typography>
//           </Stack>
//         </Stack>
//         <Divider />
//         <Stack direction="row" alignItems="center" spacing={4}>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <Chip size="small" label="PA" variant="filled" color="warning" />
//             <Typography variant="caption">
//               125
//               <br />
//               89
//             </Typography>

//             <Typography variant="h3" color="primary">
//               <div
//                 style={{
//                   fontSize: "0.85rem",
//                   letterSpacing: 0,
//                   marginBottom: -12,
//                 }}
//               >
//                 SYS
//               </div>
//               120
//             </Typography>
//             <Typography variant="h3" color="primary">
//               /
//             </Typography>
//             <Typography variant="h3" color="primary">
//               <div
//                 style={{
//                   fontSize: "0.85rem",
//                   letterSpacing: 0,

//                   marginBottom: -12,
//                 }}
//               >
//                 DIA
//               </div>
//               99
//             </Typography>
//             <Typography variant="caption">
//               59
//               <br />
//               85
//             </Typography>
//           </Stack>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <Typography variant="h6">MEAN</Typography>

//             <Typography variant="h3" color="secondary">
//               93
//             </Typography>
//             <Typography variant="caption">
//               110
//               <br />
//               60
//             </Typography>
//           </Stack>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <Chip size="small" label="ICP" variant="filled" color="warning" />
//             <Typography variant="h3" color="primary">
//               12
//             </Typography>
//           </Stack>
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// }

// function Co2() {
//   return (
//     <Card elevation={2}>
//       <CardHeader
//         title={
//           <Typography variant="h6" color="secondary">
//             CO<sub>2</sub>
//           </Typography>
//         }
//       />
//       <Divider />
//       <CardContent>
//         <Stack direction="row" alignItems="center" spacing={4}>
//           <Stack direction="row" spacing={4} alignItems="flex-end">
//             <Stack>
//               <Typography>mmHg</Typography>
//               <Typography variant="h6">ET</Typography>
//               <Typography variant="caption">55</Typography>
//               <Typography variant="caption">25</Typography>
//             </Stack>
//             <Stack>
//               <Typography variant="h3" color="error">
//                 38
//               </Typography>
//             </Stack>
//           </Stack>

//           <Stack>
//             <Stack direction="row" alignItems="center" spacing={6}>
//               <Typography>awRR</Typography>
//               <Typography variant="h3" color="primary">
//                 20
//               </Typography>
//               <Typography variant="caption">/bpm</Typography>
//             </Stack>
//             <Stack
//               direction="row"
//               alignItems="center"
//               spacing={6}
//               justifyContent="center"
//             >
//               <Typography>Fi</Typography>
//               <Typography variant="h3" color="primary">
//                 {"6".padStart(2, 0)}
//               </Typography>
//               <Typography variant="caption">
//                 100
//                 <br /> 18
//               </Typography>
//             </Stack>
//           </Stack>
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// }
