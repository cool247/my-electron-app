// @mui
import { SvgIcon } from '@mui/material'
// ----------------------------------------------------------------------

export default function BatteryIcon({ height, ...other }) {
  return (
    <SvgIcon {...other}>
      <rect x="4" y="1" width="16" height="24" fill="#aacab0" />
      <rect x="4" y={24 - height} width="16" height={height} />
    </SvgIcon>
  )
}
