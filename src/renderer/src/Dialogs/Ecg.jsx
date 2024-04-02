import { useEffect } from 'react'
import {
  Button,
  DialogActions,
  Dialog,
  DialogContent,
  Divider,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  FormHelperText
} from '@mui/material'
import { styled } from '@mui/system'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
//
//
import { useMenuSelectionStore } from '../store/useMenuSelectionStore'
import { getDataByIdFromDB, setDataToDB } from '../db'
import { FactorySetting } from '../utils/constants'

const Android12Switch = styled(Switch)(() => ({
  padding: 8,
  fontSize: 10,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&+.Mui-checked': {
      backgroundColor: 'red'
    },
    '&::before, &::after': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16
    },
    '&::before': {
      color: 'White',
      content: "'YES'",
      left: 12
    },
    '&::after': {
      color: 'White',
      content: "'NO'",
      right: 12
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 20,
    height: 20,
    margin: 0
  }
}))

const defaultValues = FactorySetting.ECG

const schema = yup
  .object({
    value: yup.array().of(yup.string().required()),
    leads: yup.string().required(),
    mode: yup.string().required(),
    alarmMin: yup.string().required(),
    alarmMax: yup.string().required()
  })
  .required()

export default function ECGDialog() {
  const deselectMenu = useMenuSelectionStore((store) => store.deselectMenu)
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue
    // formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const watchLeads = watch('leads')

  useEffect(() => {
    if (watchLeads === '3leads') {
      setValue('value', ['1', '2', '3'])
    } else if (watchLeads === '7leads') {
      setValue('value', ['1', '2', '3', 'avf', 'avl', 'avr', 'v1'])
    } else if (watchLeads === '12leads') {
      setValue('value', ['1', '2', '3', 'avf', 'avl', 'avr', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6'])
    }
  }, [setValue, watchLeads])

  async function handleSave(settings) {
    console.log(settings)
    setDataToDB({
      id: 'ECG',
      settings
    })
  }

  useEffect(() => {
    async function initialize() {
      const ecgSettings = await getDataByIdFromDB('ECG')
      console.log(ecgSettings)
      if (ecgSettings) {
        reset(ecgSettings.settings)
      }
    }
    initialize()
  }, [reset])

  return (
    <Dialog onClose={deselectMenu} aria-labelledby="customized-dialog-title" open={true}>
      <form onSubmit={handleSubmit(handleSave)} id="ecg">
        <DialogContent dividers sx={{ py: 1, px: 2, width: 520 }}>
          <Divider textAlign="left">
            <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
              LEAD TYPE
            </Typography>
          </Divider>
          <Controller
            name="leads"
            control={control}
            render={({ fieldState: { error }, field }) => (
              <>
                <ToggleButtonGroup size="small" exclusive {...field}>
                  <ToggleButton value="3leads" sx={{ width: 159 }}>
                    3 Leads
                  </ToggleButton>
                  <ToggleButton value="7leads" sx={{ width: 159 }}>
                    5 Leads
                  </ToggleButton>
                  <ToggleButton value="12leads" sx={{ width: 159 }}>
                    12 Leads
                  </ToggleButton>
                </ToggleButtonGroup>
                {!!error && <FormHelperText error={!!error}>{error?.message}</FormHelperText>}
              </>
            )}
          />

          <Divider textAlign="left" sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
              ECG LEADS
            </Typography>
          </Divider>
          <Controller
            name="value"
            control={control}
            render={({ fieldState: { error }, field }) => (
              <>
                <ToggleButtonGroup
                  disabled
                  size="small"
                  {...field}
                  exclusive
                  sx={{ display: 'flex', flexWrap: 'wrap' }}
                >
                  <ToggleButton value="1" sx={{ width: 81 }}>
                    I
                  </ToggleButton>
                  <ToggleButton value="2" sx={{ width: 81 }}>
                    II
                  </ToggleButton>
                  <ToggleButton value="3" sx={{ width: 81 }}>
                    III
                  </ToggleButton>
                  <ToggleButton value="avr" sx={{ width: 81 }}>
                    aVR
                  </ToggleButton>
                  <ToggleButton value="avl" sx={{ width: 81 }}>
                    aVL
                  </ToggleButton>
                  <ToggleButton value="avf" sx={{ width: 81 }}>
                    aVF
                  </ToggleButton>

                  <ToggleButton value="v1" sx={{ width: 81 }}>
                    V1
                  </ToggleButton>
                  <ToggleButton value="v2" sx={{ width: 81 }}>
                    V2
                  </ToggleButton>
                  <ToggleButton value="v3" sx={{ width: 81 }}>
                    V3
                  </ToggleButton>
                  <ToggleButton value="v4" sx={{ width: 81 }}>
                    V4
                  </ToggleButton>
                  <ToggleButton value="v5" sx={{ width: 81 }}>
                    V5
                  </ToggleButton>
                  <ToggleButton value="v6" sx={{ width: 81 }}>
                    V6
                  </ToggleButton>
                </ToggleButtonGroup>
                {!!error && <FormHelperText error={!!error}>{error?.message}</FormHelperText>}
              </>
            )}
          />

          <Divider textAlign="left" sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
              ALARM SETUP (HR)
            </Typography>
          </Divider>
          <Stack direction="row" gap={2}>
            <Controller
              name="alarmMin"
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
              name="alarmMax"
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

          <Divider textAlign="left" sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
              ECG SETUP
            </Typography>
          </Divider>

          <Stack direction="row" gap={2} mb={1}>
            <Typography sx={{ width: '120px' }} variant="subtitle1">
              Scan Speed
            </Typography>
            <Controller
              name="speed"
              control={control}
              render={({ fieldState: { error }, field }) => (
                <>
                  <ToggleButtonGroup size="small" exclusive {...field}>
                    <ToggleButton value="10m" sx={{ width: 87 }}>
                      10 mm/s
                    </ToggleButton>
                    <ToggleButton value="20m" sx={{ width: 87 }}>
                      20 mm/s
                    </ToggleButton>
                    <ToggleButton value="25m" sx={{ width: 87 }}>
                      25 mm/s
                    </ToggleButton>
                    <ToggleButton value="30m" sx={{ width: 87 }}>
                      30 mm/s
                    </ToggleButton>
                  </ToggleButtonGroup>
                  {!!error && <FormHelperText error={!!error}>{error?.message}</FormHelperText>}
                </>
              )}
            />
          </Stack>

          <Stack direction="row" gap={2} mb={1}>
            <Typography sx={{ width: '120px' }} variant="subtitle1">
              Pace Detection
            </Typography>
            <Stack direction="row" alignItems="center" gap={1}>
              <Android12Switch
                color="success"
                // checked={pace}
                // onChange={handlePace}
              />
            </Stack>
          </Stack>

          <Stack direction="row" gap={2} mb={1}>
            <Typography sx={{ width: '120px' }} variant="subtitle1">
              Modes
            </Typography>
            <Controller
              name="mode"
              control={control}
              render={({ fieldState: { error }, field }) => (
                <>
                  <ToggleButtonGroup size="small" exclusive {...field}>
                    <ToggleButton value="diagnosis" sx={{ width: 88 }}>
                      Diagnosis
                    </ToggleButton>
                    <ToggleButton value="monitoring" sx={{ width: 88 }}>
                      Monitoring
                    </ToggleButton>
                    <ToggleButton value="hardest" sx={{ width: 88 }}>
                      Hardest
                    </ToggleButton>
                    <ToggleButton value="operation" sx={{ width: 88 }}>
                      Operation
                    </ToggleButton>
                  </ToggleButtonGroup>
                  {!!error && <FormHelperText error={!!error}>{error?.message}</FormHelperText>}
                </>
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
          form="ecg"
          type="submit"
          sx={{ backgroundColor: 'save', color: 'white' }}
          variant="contained"
          onClick={handleSubmit(handleSave)}
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
