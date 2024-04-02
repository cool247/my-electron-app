import { useEffect } from 'react'
import {
  Divider,
  TextField,
  ToggleButton,
  DialogActions,
  ToggleButtonGroup,
  Typography,
  Button,
  Dialog,
  DialogContent,
  FormHelperText,
  Select,
  MenuItem
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
//
import { useMenuSelectionStore } from '../store/useMenuSelectionStore'
import { getDataByIdFromDB, setDataToDB } from '../db'

const genders = ['Male', 'Female', 'Transgender']
const defaultValues = {
  name: '',
  age: '',
  gender: '',
  patientType: 'Adult'
}

const schema = yup
  .object({
    name: yup.string().required(),
    age: yup.number().positive().integer().required(),
    gender: yup.string().required(),
    patientType: yup.string().required()
  })
  .required()

export default function PatientDialog() {
  const deselectMenu = useMenuSelectionStore((store) => store.deselectMenu)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  async function handleSave(data) {
    setDataToDB({
      id: 'Patient',
      settings: data
    })
  }

  useEffect(() => {
    async function initialize() {
      const patientSettings = await getDataByIdFromDB('Patient')
      console.log(patientSettings)
      if (patientSettings && patientSettings.settings) {
        reset(patientSettings.settings)
      }
    }
    initialize()
  }, [reset])

  console.log(errors)

  return (
    <Dialog onClose={deselectMenu} aria-labelledby="customized-dialog-title" open={true}>
      <form onSubmit={handleSubmit(handleSave)} id="form">
        <DialogContent dividers>
          <Divider textAlign="left">
            <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
              PATIENT TYPE
            </Typography>
          </Divider>

          <Controller
            name="patientType"
            control={control}
            render={({ fieldState: { error }, field: { onChange, value, ...other } }) => (
              <>
                <ToggleButtonGroup
                  size="small"
                  value={value}
                  onChange={(_, v) => onChange(v)}
                  exclusive
                  {...other}
                >
                  <ToggleButton value="Adult">Adult</ToggleButton>
                  <ToggleButton value="Pediatric">Pediatric</ToggleButton>
                  <ToggleButton value="Neonatal">Neonatal</ToggleButton>
                </ToggleButtonGroup>
                {!!error && <FormHelperText error={!!error}>{error?.message}</FormHelperText>}
              </>
            )}
          />

          <Divider textAlign="left" sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="#323744" sx={{ fontWeight: 600 }}>
              PATIENT DETAILS
            </Typography>
          </Divider>

          <Typography variant="subtitle1">Name</Typography>

          <Controller
            name="name"
            control={control}
            render={({ fieldState: { error }, field }) => (
              <TextField
                {...field}
                size="small"
                placeholder="Enter Patient name"
                helperText={error?.message}
                error={!!error}
              />
            )}
          />

          <Typography variant="subtitle1">Age</Typography>

          <Controller
            name="age"
            control={control}
            render={({ fieldState: { error }, field }) => (
              <TextField
                {...field}
                size="small"
                placeholder="Enter Patient age"
                helperText={error?.message?.slice(0, 20)}
                error={!!error}
              />
            )}
          />

          <Typography variant="subtitle1">Gender</Typography>
          <Controller
            name="gender"
            control={control}
            render={({ fieldState: { error }, field }) => (
              <>
                <Select size="small" fullWidth {...field}>
                  {genders.map((g) => (
                    <MenuItem key={g} value={g}>
                      {g}
                    </MenuItem>
                  ))}
                </Select>
                {!!error && <FormHelperText error={!!error}>{error?.message}</FormHelperText>}
              </>
            )}
          />
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
          id="form"
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
