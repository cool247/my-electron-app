import Brightness6Icon from '@mui/icons-material/Brightness6'
import {
  Autocomplete,
  Divider,
  Grid,
  TextField,
  Typography,
  DialogActions,
  Button
} from '@mui/material'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import MuiInput from '@mui/material/Input'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import { useMenuSelectionStore } from '../store/useMenuSelectionStore'

const Input = styled(MuiInput)`
  width: 48px;
`

const screen = [{ label: 'Standard (Default)' }, { label: 'Oxy Crg' }]

export default function SetUpDialog() {
  const deselectMenu = useMenuSelectionStore((store) => store.deselectMenu)

  const [value, setValue] = React.useState(30)

  const handleSliderChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? 0 : Number(event.target.value))
  }

  const handleBlur = () => {
    if (value < 0) {
      setValue(0)
    } else if (value > 100) {
      setValue(100)
    }
  }

  return (
    <Dialog onClose={deselectMenu} aria-labelledby="customized-dialog-title" open={true}>
      <DialogContent dividers>
        <Divider textAlign="left">
          <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
            SCREEN
          </Typography>
        </Divider>

        <Grid item xs={8}>
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={screen}
            sx={{ width: 223 }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>

        <Divider textAlign="left" sx={{ mt: 2 }}>
          <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
            SYSTEM SETUP
          </Typography>
        </Divider>

        <Typography variant="subtitle1">Time</Typography>

        <Typography variant="subtitle1">
          <TextField size="small" type="time" sx={{ width: 225 }} />
        </Typography>

        <Typography variant="subtitle1">Date</Typography>

        <Typography variant="subtitle1">
          <TextField size="small" type="date" sx={{ width: 225 }} />
        </Typography>

        <Divider textAlign="left" sx={{ mt: 2 }}>
          <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
            DISPLAY
          </Typography>
        </Divider>

        <Grid item xs={3}>
          <Box sx={{ width: 280 }}>
            <Typography id="input-slider" gutterBottom>
              Brightness
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Brightness6Icon />
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof value === 'number' ? value : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid item>
                <Input
                  value={value}
                  size="small"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 10,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider'
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
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
