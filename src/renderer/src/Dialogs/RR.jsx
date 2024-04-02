import {
  Divider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  DialogActions,
  Button
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { useState } from 'react'
import { useMenuSelectionStore } from '../store/useMenuSelectionStore'

export default function RRDialog() {
  const deselectMenu = useMenuSelectionStore((store) => store.deselectMenu)

  const [scan, setScan] = useState([])
  const handleScan = (event, newFormats) => {
    setScan(newFormats)
  }

  const [leads, setLeads] = useState([])
  const handleleads = (event, newFormats) => {
    setLeads(newFormats)
  }

  const [gain, setGain] = useState([])
  const handleGain = (event, newFormats) => {
    setGain(newFormats)
  }

  const [apnea, setApnea] = useState([])
  const handleApnea = (event, newFormats) => {
    setApnea(newFormats)
  }

  return (
    <Dialog onClose={deselectMenu} aria-labelledby="customized-dialog-title" open={true}>
      <DialogContent dividers>
        <Divider textAlign="left">
          <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
            SCAN SPEED
          </Typography>
        </Divider>

        <ToggleButtonGroup size="small" value={scan} exclusive onChange={handleScan}>
          <ToggleButton value="6m" sx={{ width: 100 }}>
            6.25 mm/s
          </ToggleButton>
          <ToggleButton value="12m" sx={{ width: 100 }}>
            12.5 mm/s
          </ToggleButton>
          <ToggleButton value="25m" sx={{ width: 100 }}>
            25 mm/s
          </ToggleButton>
          <ToggleButton value="30m" sx={{ width: 100 }}>
            30 mm/s
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider textAlign="left" sx={{ mt: 2 }}>
          <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
            APNEA ALARM
          </Typography>
        </Divider>

        <ToggleButtonGroup size="small" value={apnea} onChange={handleApnea} exclusive>
          <ToggleButton value="1" sx={{ width: 100 }}>
            OFF
          </ToggleButton>
          <ToggleButton value="2" sx={{ width: 100 }}>
            5s
          </ToggleButton>
          <ToggleButton value="3" sx={{ width: 100 }}>
            10s
          </ToggleButton>
          <ToggleButton value="avr" sx={{ width: 100 }}>
            20s
          </ToggleButton>
        </ToggleButtonGroup>
        <br />
        <ToggleButtonGroup value={apnea} size="small" onChange={handleApnea} exclusive>
          <ToggleButton value="v1" sx={{ width: 100 }}>
            40s
          </ToggleButton>
          <ToggleButton value="v2" sx={{ width: 100 }}>
            60s
          </ToggleButton>
          <ToggleButton value="v3" sx={{ width: 100 }}>
            80s
          </ToggleButton>
          <ToggleButton value="v4" sx={{ width: 100 }}>
            100s
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider textAlign="left" sx={{ mt: 2 }}>
          <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
            RESP ALARM
          </Typography>
        </Divider>
        <Stack direction="row" gap={2} mb={1}>
          <TextField size="small" placeholder="min value" sx={{ width: 135 }} />
          <TextField size="small" placeholder="max value" sx={{ width: 135 }} />
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
        <Button sx={{ backgroundColor: 'save', color: 'white' }} variant="contained">
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
