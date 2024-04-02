/* eslint-disable no-unused-vars */
import { LinearProgress, Stack, Typography } from '@mui/material'
import StatsCard from '../../components/StatsCard'
import { useEffect, useRef, useState } from 'react'
import { NormalRange } from '../../utils/constants'
import { useNibpStore } from '../../store/useNibpStore'
import { getDataByIdFromDB } from '../../db'

export default function NiBP({ patientInfo: { patientType = 'Adult' } }) {
  const nibpData = useNibpStore((store) => store.nibpData)

  return (
    <StatsCard title={<p>NiBP (mmHg)</p>}>
      <LinearDeterminate nibpData={nibpData} />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        sx={{ minHeight: 100, py: 1 }}
      >
        <Stack direction="row" alignItems="center">
          <Typography variant="caption">
            {NormalRange[patientType].nibp.sys[0]}
            <br />
            {NormalRange[patientType].nibp.sys[1]}
          </Typography>

          <Typography variant="h2" color="primary">
            <div
              style={{
                fontSize: '0.85rem',
                letterSpacing: 0,
                marginBottom: -6
              }}
            >
              SYS
            </div>
            {nibpData?.systolicValue || '---'}
          </Typography>
          <Typography variant="h2" color="primary">
            /
          </Typography>
          <Typography variant="h2" color="primary">
            <div
              style={{
                fontSize: '0.85rem',
                letterSpacing: 0,
                marginBottom: -6
              }}
            >
              DIA
            </div>
            {nibpData?.diastolicValue || '---'}
          </Typography>
          <Typography variant="caption">
            {NormalRange[patientType].nibp.dia[0]}
            <br />
            {NormalRange[patientType].nibp.dia[1]}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography variant="caption">MEAN</Typography>

          <Typography variant="h2" color="secondary">
            {nibpData?.meanValue || '---'}
          </Typography>
          <Typography variant="caption">
            {NormalRange[patientType].nibpMean[0]}
            <br />
            {NormalRange[patientType].nibpMean[1]}
          </Typography>
        </Stack>
      </Stack>
    </StatsCard>
  )
}

function LinearDeterminate({ nibpData }) {
  const [progress, setProgress] = useState(0)
  const [intervalMinutes, setIntervalMinutes] = useState(5)
  const intervalRef = useRef(null)
  const startTimeRef = useRef(null)
  const endTimeRef = useRef(null)

  useEffect(() => {
    const handleNibpChange = async () => {
      const nibpSettings = await getDataByIdFromDB('Nibp')
      console.log('nibp-changed', nibpSettings)
      if (nibpSettings) {
        setIntervalMinutes(nibpSettings.settings.stat)
      }
    }
    document.addEventListener('Nibp', handleNibpChange)
    return () => {
      document.removeEventListener('Nibp', handleNibpChange)
    }
  }, [])

  useEffect(() => {
    if (nibpData.time) {
      const currentTime = new Date()
      const endTime = new Date(currentTime.getTime() + intervalMinutes * 60 * 1000)

      startTimeRef.current = currentTime
      endTimeRef.current = endTime

      intervalRef.current = setInterval(() => {
        const timeElapsed = Date.now() - startTimeRef.current.getTime()
        const totalDuration = endTimeRef.current.getTime() - startTimeRef.current.getTime()
        const progressPercentage = (timeElapsed / totalDuration) * 100

        setProgress(progressPercentage)
      }, 30 * 1000)
      return () => clearInterval(intervalRef.current)
    }
  }, [intervalMinutes, nibpData.time])

  return (
    <div style={{ paddingInline: 16 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          mt: 1,
          py: 1,
          '&.MuiLinearProgress-root': {
            backgroundColor: 'none',
            backgroundImage:
              'repeating-linear-gradient(45deg, #838383, #787878 10px, #5a5a5a 10px, #606060 20px)'
          }
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption">@{nibpData.time || '-'}</Typography>
        <Typography variant="caption">{intervalMinutes} Min</Typography>
      </div>
    </div>
  )
}
