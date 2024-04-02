import { create } from 'zustand'

export const useSpo2Store = create((set) => ({
  value: {
    spO2Value: '',
    pulseRate: '',
    signalStrength: '',
    firstStatus: '',
    secondStatus: ''
  },
  waveValueIndex: 0,
  newBarChartValue: 0,
  defaultValueDots: 900,
  waveValue: Array(900).fill(0),
  setDefaultValueDots: (defaultValueDots) =>
    set({ defaultValueDots, waveValue: Array(+defaultValueDots).fill(0), waveValueIndex: 0 }),
  setWaveValue: (newWaveValue) =>
    set((state) => {
      const newValue = newWaveValue.waveformValue > 250 ? 0 : newWaveValue.waveformValue * 2
      const newBarChartValue = newWaveValue.barChartVal
      const newIndex =
        state.waveValueIndex === +state.defaultValueDots ? 0 : state.waveValueIndex + 1
      const newArray = [...state.waveValue]

      newArray[newIndex] = newValue
      newArray[newIndex + 1] = null
      newArray[newIndex + 2] = null
      newArray[newIndex + 3] = null
      newArray[newIndex + 4] = null
      newArray[newIndex + 5] = null
      newArray[newIndex + 6] = null
      newArray[newIndex + 7] = null
      newArray[newIndex + 8] = null
      newArray[newIndex + 9] = null
      newArray[newIndex + 10] = null

      return {
        waveValueIndex: newIndex,
        waveValue: newArray,
        newBarChartValue
      }
    }),
  setValue: (value) => set({ value })
}))

//
