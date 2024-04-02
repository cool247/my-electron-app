import {
  Divider,
  DialogActions,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { useState } from 'react'
import { useMenuSelectionStore } from '../store/useMenuSelectionStore'

export default function AlarmDialog() {
  const deselectMenu = useMenuSelectionStore((store) => store.deselectMenu)

  const [volume, setVolume] = useState([])
  const handleVolume = (event, newFormats) => {
    setVolume(newFormats)
  }

  const [silence, setSilence] = useState([])
  const handleSilence = (event, newFormats) => {
    setSilence(newFormats)
  }

  const [suspend, setSuspend] = useState([])
  const handleSuspend = (event, newFormats) => {
    setSuspend(newFormats)
  }

  const [sleep, setSleep] = useState([])
  const handleSleep = (event, newFormats) => {
    setSleep(newFormats)
  }

  const [tune, setTune] = useState([])
  const handleTune = (event, newFormats) => {
    setTune(newFormats)
  }

  return (
    <Dialog onClose={deselectMenu} aria-labelledby="customized-dialog-title" open={true}>
      <DialogContent dividers>
        <Divider textAlign="left">
          <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
            ALARM VOLUME
          </Typography>
        </Divider>

        <ToggleButtonGroup size="small" value={volume} exclusive onChange={handleVolume}>
          <ToggleButton value="off">OFF</ToggleButton>
          <ToggleButton value="1">1</ToggleButton>
          <ToggleButton value="2">2</ToggleButton>
          <ToggleButton value="3">3</ToggleButton>
        </ToggleButtonGroup>

        <Divider textAlign="left" sx={{ mt: 2 }}>
          <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
            SILENCE
          </Typography>
        </Divider>

        <ToggleButtonGroup size="small" value={silence} exclusive onChange={handleSilence}>
          <ToggleButton value="1m">1 min</ToggleButton>
          <ToggleButton value="2m">2 min</ToggleButton>
          <ToggleButton value="3m">3 min</ToggleButton>
          <ToggleButton value="4m">4 min</ToggleButton>
        </ToggleButtonGroup>

        <Divider textAlign="left" sx={{ mt: 2 }}>
          <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
            SUSPEND ALARM
          </Typography>
        </Divider>

        <ToggleButtonGroup size="small" value={suspend} exclusive onChange={handleSuspend}>
          <ToggleButton value="yes" sx={{ width: 120 }}>
            Yes
          </ToggleButton>
          <ToggleButton value="no" sx={{ width: 120 }}>
            No
          </ToggleButton>
        </ToggleButtonGroup>

        {/* <Divider textAlign="left" sx={{ mt: 2 }}>
          <Typography
            variant="subtitle1"
            color="#323744"
            sx={{ fontWeight: 600 }}
          >
            SLEEP MODE
          </Typography>
        </Divider>

        <ToggleButtonGroup
          size="small"
          value={sleep}
          exclusive
          onChange={handleSleep}
        >
          <ToggleButton value="yess" sx={{ width: 120 }}>
            Yes
          </ToggleButton>
          <ToggleButton value="noo" sx={{ width: 120 }}>
            No
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider textAlign="left" sx={{ mt: 2 }}>
          <Typography
            variant="subtitle1"
            color="#323744"
            sx={{ fontWeight: 600 }}
          >
            ALARM TUNE
          </Typography>
        </Divider>

        <ToggleButtonGroup
          size="small"
          value={tune}
          exclusive
          onChange={handleTune}
        >
          <ToggleButton value="off" sx={{ width: 90 }}>
            DO-DO-DO
          </ToggleButton>
          <ToggleButton value="1" sx={{ width: 75 }}>
            DO-DO
          </ToggleButton>
          <ToggleButton value="2" sx={{ width: 75 }}>
            DO
          </ToggleButton>
        </ToggleButtonGroup> */}
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
