import {
  Divider,
  Stack,
  TextField,
  DialogActions,
  ToggleButton,
  Button,
  ToggleButtonGroup,
  Typography,
  Dialog,
  DialogContent,
  FormHelperText
} from '@mui/material'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
//
import { useMenuSelectionStore } from '../store/useMenuSelectionStore'
import { FactorySetting } from '../utils/constants'
import { useEffect, useState } from 'react'
import { getDataByIdFromDB, setDataToDB } from '../db'

const defaultValues = FactorySetting.Nibp

const schema = yup
  .object({
    stat: yup.string().required(),
    unit: yup.string().required(),
    alarmSysMax: yup.number().positive().integer().required(),
    alarmSysMin: yup.number().positive().integer().required(),
    alarmDiaMax: yup.number().positive().integer().required(),
    alarmDiaMin: yup.number().positive().integer().required(),
    alarmMeanMax: yup.number().positive().integer().required(),
    alarmMeanMin: yup.number().positive().integer().required()
  })
  .required()

export default function NiBPDialog({ sendMessage }) {
  const deselectMenu = useMenuSelectionStore((store) => store.deselectMenu)
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const [cmd, setCmd] = useState('')
  function handleChange(_, newValue) {
    sendMessage('/pms-app/startAndStopNiBPMeasure', newValue)
    setCmd(newValue)
  }

  async function onSave(settings) {
    console.log(settings)
    setDataToDB({
      id: 'Nibp',
      settings
    })
  }

  useEffect(() => {
    async function initialize() {
      const nibpSettings = await getDataByIdFromDB('Nibp')
      console.log(nibpSettings)
      if (nibpSettings) {
        reset(nibpSettings.settings)
      }
    }
    initialize()
  }, [reset])

  return (
    <Dialog
      onClose={deselectMenu}
      aria-labelledby="customized-dialog-title"
      open={true}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit(onSave)}>
        <DialogContent dividers sx={{ py: 1, px: 2, width: 580 }}>
          <Divider textAlign="left">
            <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
              MODE
            </Typography>
          </Divider>

          <Stack direction="row" gap={2} mb={1}>
            <Typography sx={{ width: '90px' }} variant="subtitle1">
              Manual
            </Typography>

            <ToggleButtonGroup onChange={handleChange} value={cmd} size="small" exclusive>
              <ToggleButton value="1" sx={{ width: 210 }}>
                START
              </ToggleButton>
              <ToggleButton value="0" sx={{ width: 210 }}>
                STOP
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack direction="row" gap={2} mb={1} sx={{ width: 526 }}>
            <Typography sx={{ width: '155px' }} variant="subtitle1">
              Stat
            </Typography>
            <Controller
              name="stat"
              control={control}
              render={({ fieldState: { error }, field }) => (
                <>
                  <ToggleButtonGroup
                    sx={{ display: 'flex', flexWrap: 'wrap' }}
                    {...field}
                    size="small"
                    exclusive
                  >
                    <ToggleButton value="1" sx={{ width: 68 }}>
                      1 min
                    </ToggleButton>
                    <ToggleButton value="2" sx={{ width: 68 }}>
                      2 min
                    </ToggleButton>
                    <ToggleButton value="3" sx={{ width: 68 }}>
                      3 min
                    </ToggleButton>
                    <ToggleButton value="4" sx={{ width: 68 }}>
                      4 min
                    </ToggleButton>
                    <ToggleButton value="5" sx={{ width: 68 }}>
                      5 min
                    </ToggleButton>
                    <ToggleButton value="10" sx={{ width: 68 }}>
                      10 min
                    </ToggleButton>

                    <ToggleButton value="15" sx={{ width: 68 }}>
                      15 min
                    </ToggleButton>
                    <ToggleButton value="20" sx={{ width: 68 }}>
                      20 min
                    </ToggleButton>
                    <ToggleButton value="30" sx={{ width: 68 }}>
                      30 min
                    </ToggleButton>
                    <ToggleButton value="60" sx={{ width: 68 }}>
                      60 min
                    </ToggleButton>
                    <ToggleButton value="90" sx={{ width: 68 }}>
                      90 min
                    </ToggleButton>
                  </ToggleButtonGroup>
                  {!!error && <FormHelperText error={!!error}>{error?.message}</FormHelperText>}
                </>
              )}
            />
          </Stack>

          <Stack direction="row" gap={2} mb={1}>
            <Typography sx={{ width: '90px' }} variant="subtitle1">
              Continuous
            </Typography>

            <ToggleButtonGroup
              // onChange={handleChange}
              // value={cmd}
              size="small"
              exclusive
            >
              <ToggleButton value="1" sx={{ width: 210 }}>
                START
              </ToggleButton>
              <ToggleButton value="0" sx={{ width: 210 }}>
                STOP
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {/* <Divider textAlign="left" sx={{ mt: 2 }}>
            <Typography
              variant="subtitle1"
              color="#323744"
              sx={{ fontWeight: 600 }}
            >
              UNIT
            </Typography>
          </Divider>

          <Controller
            name="unit"
            control={control}
            render={({ fieldState: { error }, field }) => (
              <>
                <ToggleButtonGroup {...field} size="small" exclusive>
                  <ToggleButton value="mmHg" sx={{ width: 262 }}>
                    mmHg
                  </ToggleButton>
                  <ToggleButton value="kPa" sx={{ width: 262 }}>
                    kPa
                  </ToggleButton>
                </ToggleButtonGroup>
                {!!error && (
                  <FormHelperText error={!!error}>
                    {error?.message}
                  </FormHelperText>
                )}
              </>
            )}
          /> */}

          <Divider textAlign="left" sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
              ALARM
            </Typography>
          </Divider>

          <Stack direction="row" gap={2} mb={1}>
            <Typography sx={{ width: '60px' }} variant="subtitle1">
              SYS
            </Typography>
            <Controller
              name="alarmSysMin"
              control={control}
              render={({ fieldState: { error }, field }) => (
                <TextField
                  {...field}
                  size="small"
                  placeholder="min value"
                  helperText={error?.message}
                  error={error}
                  sx={{ width: 135 }}
                />
              )}
            />
            <Controller
              name="alarmSysMax"
              control={control}
              render={({ fieldState: { error }, field }) => (
                <TextField
                  {...field}
                  size="small"
                  placeholder="max value"
                  helperText={error?.message}
                  error={error}
                  sx={{ width: 135 }}
                />
              )}
            />
          </Stack>

          <Stack direction="row" gap={2} mb={1}>
            <Typography sx={{ width: '60px' }} variant="subtitle1">
              DIA
            </Typography>
            <Controller
              name="alarmDiaMin"
              control={control}
              render={({ fieldState: { error }, field }) => (
                <TextField
                  {...field}
                  size="small"
                  placeholder="min value"
                  helperText={error?.message}
                  error={error}
                  sx={{ width: 135 }}
                />
              )}
            />
            <Controller
              name="alarmDiaMax"
              control={control}
              render={({ fieldState: { error }, field }) => (
                <TextField
                  {...field}
                  size="small"
                  placeholder="max value"
                  helperText={error?.message}
                  error={error}
                  sx={{ width: 135 }}
                />
              )}
            />
          </Stack>

          <Stack direction="row" gap={2} mb={1}>
            <Typography sx={{ width: '60px' }} variant="subtitle1">
              MEAN
            </Typography>
            <Controller
              name="alarmMeanMin"
              control={control}
              render={({ fieldState: { error }, field }) => (
                <TextField
                  {...field}
                  size="small"
                  placeholder="max value"
                  helperText={error?.message}
                  error={error}
                  sx={{ width: 135 }}
                />
              )}
            />
            <Controller
              name="alarmMeanMax"
              control={control}
              render={({ fieldState: { error }, field }) => (
                <TextField
                  {...field}
                  size="small"
                  placeholder="min value"
                  helperText={error?.message}
                  error={error}
                  sx={{ width: 135 }}
                />
              )}
            />
          </Stack>
        </DialogContent>
      </form>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          sx={{ backgroundColor: 'reset', color: 'white' }}
          variant="contained"
          onClick={alert}
        >
          Reset
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit(onSave)}
          sx={{ backgroundColor: 'save', color: 'white' }}
          variant="contained"
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
