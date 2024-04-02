import {
  Divider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  DialogActions,
  Button,
  Dialog,
  DialogContent
} from '@mui/material'
import { useMenuSelectionStore } from '../store/useMenuSelectionStore'
import { useSpo2Store } from '../store/useSpo2Store'
import { getDataByIdFromDB, setDataToDB } from '../db'
import { useEffect, useState } from 'react'

export const sp02InitialInput = {
  spo2Min: '',
  spo2Max: '',
  prMin: '',
  prMax: '',
  piMin: '',
  piMax: ''
}

export default function Spo2Dialog() {
  const deselectMenu = useMenuSelectionStore((store) => store.deselectMenu)
  const setDefaultValueDots = useSpo2Store((store) => store.setDefaultValueDots)
  const defaultValueDots = useSpo2Store((store) => store.defaultValueDots)
  const [inputValue, setInputValue] = useState(sp02InitialInput)

  function handleInputChange(e) {
    const {
      target: { name, value }
    } = e
    setInputValue((ps) => ({ ...ps, [name]: value }))
  }

  const handleScan = (_, newFormats) => {
    setDefaultValueDots(newFormats)
  }

  async function handleSave() {
    setDataToDB({
      id: 'SPO2',
      settings: {
        defaultValueDots,
        inputValue
      }
    })
  }

  useEffect(() => {
    async function initialize() {
      const { settings } = await getDataByIdFromDB('SPO2')
      setInputValue(settings?.inputValue || sp02InitialInput)
    }
    initialize()
  }, [])

  return (
    <Dialog onClose={deselectMenu} aria-labelledby="customized-dialog-title" open={true}>
      <DialogContent dividers sx={{ py: 1, px: 2, width: 400 }}>
        <Divider textAlign="left">
          <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
            SCAN SPEED
          </Typography>
        </Divider>

        <ToggleButtonGroup size="small" value={defaultValueDots} exclusive onChange={handleScan}>
          <ToggleButton value="900" sx={{ width: 180 }}>
            25 mm/s
          </ToggleButton>
          <ToggleButton value="700" sx={{ width: 180 }}>
            50 mm/s
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider textAlign="left" sx={{ mt: 2 }}>
          <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
            SpO2 ALARM
          </Typography>
        </Divider>

        <Stack direction="row" gap={2} mb={1}>
          <Typography sx={{ width: '60px' }} variant="subtitle1">
            SpO2
          </Typography>

          <TextField
            name="spo2Min"
            onChange={handleInputChange}
            value={inputValue.spo2Min}
            size="small"
            placeholder="min value"
            sx={{ width: 135 }}
          />
          <TextField
            name="spo2Max"
            onChange={handleInputChange}
            value={inputValue.spo2Max}
            size="small"
            placeholder="max value"
            sx={{ width: 135 }}
          />
        </Stack>

        <Stack direction="row" gap={2} mb={1}>
          <Typography sx={{ width: '60px' }} variant="subtitle1">
            PR
          </Typography>

          <TextField
            name="prMin"
            size="small"
            onChange={handleInputChange}
            value={inputValue.prMin}
            placeholder="min value"
            sx={{ width: 135 }}
          />
          <TextField
            name="prMax"
            size="small"
            onChange={handleInputChange}
            value={inputValue.prMax}
            placeholder="max value"
            sx={{ width: 135 }}
          />
        </Stack>

        <Stack direction="row" gap={2} mb={1}>
          <Typography sx={{ width: '60px' }} variant="subtitle1">
            PI
          </Typography>

          <TextField
            name="piMin"
            size="small"
            onChange={handleInputChange}
            value={inputValue.piMin}
            placeholder="min value"
            sx={{ width: 135 }}
          />
          <TextField
            name="piMax"
            size="small"
            onChange={handleInputChange}
            value={inputValue.piMax}
            placeholder="max value"
            sx={{ width: 135 }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          sx={{ backgroundColor: 'reset', color: 'white' }}
          variant="contained"
          onClick={alert}
        >
          Reset
        </Button>
        <Button
          sx={{ backgroundColor: 'save', color: 'white' }}
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          sx={{ backgroundColor: 'close', color: 'white' }}
          variant="contained"
          onClick={deselectMenu}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
