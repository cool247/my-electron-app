import { create } from 'zustand'

export const useNibpStore = create((set) => ({
  nibpData: {
    systolicValue: '',
    diastolicValue: '',
    meanValue: '',
    pulseRate: '',
    time: ''
  },
  setNibpData: (newNibpData) =>
    set({
      nibpData: {
        ...newNibpData,
        time: new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    })
}))
