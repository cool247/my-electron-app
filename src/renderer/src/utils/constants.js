export const NormalRange = {
  Adult: {
    rr: [20, 12],
    hr: [100, 60],
    temp: [38, 35, 95, 100.4],
    spo: [100, 94],
    pr: [100, 60],
    nibp: {
      sys: [125, 89],
      dia: [85, 59]
    },
    nibpMean: [110, 60]
  },
  Pediatric: {
    rr: [30, 14],
    hr: [140, 60],
    temp: [38, 36.4, 97.5, 100.4],
    spo: [100, 94],
    pr: [140, 60],
    nibp: {
      sys: [120, 85],
      dia: [80, 50]
    },
    nibpMean: [100, 50]
  },
  Neonatal: {
    rr: [40, 20],
    hr: [190, 70],
    temp: [37.5, 36, 96.8, 99.5],
    spo: [100, 94],
    pr: [190, 70],
    nibp: {
      sys: [100, 70],
      dia: [75, 50]
    },
    nibpMean: [110, 55]
  }
}

export const FactorySetting = {
  ECG: {
    value: ['1', '2', '3'],
    leads: '3leads',
    speed: '10m',
    mode: 'diagnosis',
    alarmMin: 60,
    alarmMax: 100
  },
  Nibp: {
    stat: '5',
    unit: 'mmHg',
    alarmSysMax: 200,
    alarmSysMin: 100,
    alarmDiaMax: 150,
    alarmDiaMin: 40,
    alarmMeanMax: 200,
    alarmMeanMin: 100
  },
  SPO2: {
    defaultValueDots: '900',
    inputValue: {
      spo2Min: '94',
      spo2Max: '100',
      prMin: '60',
      prMax: '100',
      piMin: '2',
      piMax: '12'
    }
  }
}
