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

export default function TempDialog() {
  const deselectMenu = useMenuSelectionStore((store) => store.deselectMenu)

  const [unit, setUnit] = useState([])
  const handleUnit = (event, newFormats) => {
    setUnit(newFormats)
  }
  const [label, setLabel] = useState([])
  const handleLabel = (event, newFormats) => {
    setLabel(newFormats)
  }

  return (
    <Dialog onClose={deselectMenu} aria-labelledby="customized-dialog-title" open={true}>
      <DialogContent dividers>
        <Divider textAlign="left">
          <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
            UNIT
          </Typography>
        </Divider>

        <ToggleButtonGroup size="small" value={unit} exclusive onChange={handleUnit}>
          <ToggleButton value="auto" sx={{ width: 160 }}>
            °C
          </ToggleButton>
          <ToggleButton value="pleth" sx={{ width: 160 }}>
            °F
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider textAlign="left" sx={{ mt: 2 }}>
          <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
            T1 LABEL
          </Typography>
        </Divider>

        <ToggleButtonGroup size="small" value={label} exclusive onChange={handleLabel}>
          <ToggleButton value="auto" selected sx={{ width: 320 }}>
            SKIN
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider textAlign="left" sx={{ mt: 2 }}>
          <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
            T2 LABEL
          </Typography>
        </Divider>

        <ToggleButtonGroup size="small" value={label} exclusive onChange={handleLabel}>
          <ToggleButton value="auto" selected sx={{ width: 320 }}>
            SKIN
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider textAlign="left" sx={{ mt: 2 }}>
          <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
            TEMP ALARM
          </Typography>
        </Divider>
        <Stack direction="row" gap={2} mb={1}>
          <Typography variant="subtitle1">T1</Typography>

          <TextField size="small" placeholder="min value" sx={{ width: 135 }} />
          <TextField size="small" placeholder="max value" sx={{ width: 135 }} />
        </Stack>

        <Stack direction="row" gap={2} mb={1}>
          <Typography variant="subtitle1">T2</Typography>

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
