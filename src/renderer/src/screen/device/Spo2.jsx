import { Stack, Typography } from '@mui/material'
import StatsCard from '../../components/StatsCard'
import { useSpo2Store } from '../../store/useSpo2Store'
import { useEffect, useState } from 'react'
import { getDataByIdFromDB } from '../../db'
import { sp02InitialInput } from '../../Dialogs/Spo2'
import { NormalRange } from '../../utils/constants'

function getColorForValue(minLimit, maxLimit, actualValue) {
  if (!actualValue) {
    return '#0c0c0c'
  }

  if (+actualValue > maxLimit) {
    return 'red'
  }

  if (+actualValue < minLimit) {
    return 'orange'
  }

  return '#0c0c0c'
}

export default function Spo2({ patientInfo: { patientType = 'Adult' } }) {
  const value = useSpo2Store((store) => store.value)
  const [minMax, setMinMax] = useState(sp02InitialInput)

  useEffect(() => {
    const handleSpo2Change = async () => {
      const { settings } = await getDataByIdFromDB('SPO2')
      console.log('spo2-changed', settings)
      setMinMax(settings?.inputValue || sp02InitialInput)
    }

    document.addEventListener('SPO2', handleSpo2Change)

    return () => {
      document.removeEventListener('SPO2', handleSpo2Change)
    }
  }, [])

  return (
    <StatsCard
      title={
        <p>
          SpO<sub>2</sub>(%)
        </p>
      }
    >
      <Typography variant="caption" align="right" component="p">
        {value.firstStatus}
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-around" sx={{ height: 140 }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            backgroundColor: getColorForValue(minMax.spo2Min, minMax.spo2Max, value?.spO2Value)
          }}
        >
          <Typography variant="h2" color="primary">
            {value?.spO2Value || '----'}
          </Typography>
          <Typography variant="caption">
            {NormalRange[patientType].spo[0]}
            <br />
            {NormalRange[patientType].spo[1]}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          sx={{
            backgroundColor: getColorForValue(minMax.piMin, minMax.piMax, value?.signalStrength)
          }}
        >
          <Typography variant="h6">PI</Typography>
          <Typography variant="h2" color="secondary">
            {value?.signalStrength || '----'}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          sx={{
            backgroundColor: getColorForValue(minMax.prMin, minMax.prMax, value?.pulseRate)
          }}
        >
          <Typography variant="h6">PR</Typography>
          <Typography variant="h2" color="secondary">
            {value?.pulseRate || '----'}
          </Typography>
          <Typography variant="caption">
            {NormalRange[patientType].pr[0]}
            <br />
            {NormalRange[patientType].pr[1]}
          </Typography>
        </Stack>
      </Stack>
    </StatsCard>
  )
}
