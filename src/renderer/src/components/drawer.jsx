/* eslint-disable no-unused-vars */
import { Fragment } from 'react'
import Drawer from '@mui/material/Drawer'

import { useMenuSelectionStore } from '../store/useMenuSelectionStore'
import { Button, Typography } from '@mui/material'

const listOptions = [
  {
    text: 'ECG'
  },
  {
    text: 'SpO2'
  },
  {
    text: 'NiBP'
  },
  {
    text: 'Temp'
  },
  {
    text: 'RR'
  },
  {
    text: 'Patient'
  },
  {
    text: 'Setup'
  },
  {
    text: 'Alarm'
  }
]

export default function AnchorTemporaryDrawer({ openDrawer, setOpenDrawer }) {
  const { selectedMenu, selectMenu } = useMenuSelectionStore()

  const handleClick = (item) => {
    selectMenu(item.text)
    setOpenDrawer(false)
  }

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setOpenDrawer(!openDrawer)
  }

  const renderListItem = (item, index) => {
    return (
      <Fragment key={index}>
        <Button
          style={{
            backgroundImage: 'linear-gradient(to right, rgb(67, 87, 224), rgb(89, 4, 219))',
            color: 'whitesmoke',
            // width: 20,
            paddingBlock: 24,
            borderBottomLeftRadius: 24,
            borderTopLeftRadius: 24
          }}
          selected={selectedMenu === item.text}
          onClick={() => handleClick(item)}
        >
          <Typography
            component="div"
            sx={{
              display: 'inline-block',
              writingMode: 'vertical-lr', // vertical right-to-left
              // textOrientation: "upright", // upright orientation
              whiteSpace: 'nowrap' // prevent text from wrapping
            }}
          >
            {item.text}
          </Typography>
        </Button>
      </Fragment>
    )
  }

  return (
    <Drawer
      anchor={'right'}
      open={openDrawer}
      onClose={toggleDrawer}
      PaperProps={{
        sx: {
          backgroundColor: '#0000'
        }
      }}
    >
      <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
        {listOptions.map((item, index) => renderListItem(item, index))}
      </div>
    </Drawer>
  )
}
