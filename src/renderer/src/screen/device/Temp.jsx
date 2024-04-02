import { Stack, Typography } from '@mui/material'
import StatsCard from '../../components/StatsCard'
import { NormalRange } from '../../utils/constants'

export default function Temp({ patientInfo: { patientType = 'Adult' } }) {
  const tl = NormalRange[patientType].temp[0]
  const th = NormalRange[patientType].temp[1]

  return (
    <StatsCard title={<p>Temp (&deg;C)</p>}>
      <Stack direction="row" justifyContent="space-around">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h2" color="neonGreen">
            <Typography variant="subtitle1" component="span">
              T1
            </Typography>
            37.0
          </Typography>
          <Typography variant="caption">
            {tl}
            <br />
            {th}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h2" color="neonGreen">
            <Typography variant="subtitle1" component="span">
              T2
            </Typography>
            35.0
          </Typography>
          <Typography variant="caption">
            {tl}
            <br />
            {th}
          </Typography>
        </Stack>
      </Stack>
      <Stack alignItems="center" spacing={1}>
        <Typography variant="h2" color="neonGreen">
          <Typography variant="subtitle1" component="span">
            Td
          </Typography>
          0.2
        </Typography>
      </Stack>
    </StatsCard>
  )
}
