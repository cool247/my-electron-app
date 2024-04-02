import { Stack, Typography } from '@mui/material'
import StatsCard from '../../components/StatsCard'
import { Favorite } from '@mui/icons-material'
import { NormalRange } from '../../utils/constants'

export default function Ecg({ patientInfo: { patientType = 'Adult' } }) {
  return (
    <StatsCard title={<p>ECG (bpm)</p>}>
      <Stack direction="row" justifyContent="space-around">
        <Favorite color="error" />
        <div
          style={{
            border: '1px solid white',
            width: 180,
            padding: '4px 16px',
            color: 'white',
            fontSize: 14
          }}
        >
          Normal Sinus Rhythm
        </div>
      </Stack>
      <Stack display="flex" direction="row" spacing={4} py={2} justifyContent="space-around">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h2" color="neonYellow">
            <Typography variant="subtitle1" component="span">
              RR
            </Typography>
            20
          </Typography>
          <Typography variant="caption">
            {NormalRange[patientType].rr[0]}
            <br />
            {NormalRange[patientType].rr[1]}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h2" color="neonYellow">
            <Typography variant="subtitle1" component="span">
              HR
            </Typography>
            37
          </Typography>
          <Typography variant="caption">
            {NormalRange[patientType].hr[0]}
            <br />
            {NormalRange[patientType].hr[1]}
          </Typography>
        </Stack>
      </Stack>
    </StatsCard>
  )
}
