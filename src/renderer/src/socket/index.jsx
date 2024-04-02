import { useEffect, useState } from 'react'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { useSpo2Store } from '../store/useSpo2Store'
import { useNibpStore } from '../store/useNibpStore'

const useStompWebSocket = (url) => {
  const setSpo2Value = useSpo2Store((store) => store.setValue)
  const setSpo2wave = useSpo2Store((store) => store.setWaveValue)
  const setNibpData = useNibpStore((store) => store.setNibpData)
  const [stompClient, setStompClient] = useState(null)

  const sendMessage = (destination, message) => {
    if (stompClient) {
      stompClient.publish({ destination, body: message })
    }
  }

  useEffect(() => {
    // Create a new STOMP client
    const client = new Client()

    // Connect to the WebSocket server
    client.webSocketFactory = () => new SockJS(url)

    let subscription

    // Connect to the WebSocket server
    client.activate()
    client.onStompError((e) => console.log('error', e))

    // Subscribe to a STOMP destination once connected
    client.onConnect = () => {
      console.log('Connected to WebSocket server')

      //+++++++++++++++++++++++++++SPO2++++++++++++++++++++++++++++++++++++++
      subscription = client.subscribe('/topic/spo2Data', (message) => {
        // console.log(message.body);
        setSpo2Value(JSON.parse(message.body))
      })
      subscription = client.subscribe('/topic/spo2Wave', (message) => {
        // console.log(message.body);
        setSpo2wave(JSON.parse(message.body))
      })

      //+++++++++++++++++++++++++++NIBP++++++++++++++++++++++++++++++++++++++
      subscription = client.subscribe('/topic/niBPData', (message) => {
        // console.log(message.body);
        setNibpData(JSON.parse(message.body))
      })
      setStompClient(client) // Store the STOMP client in state
    }

    // Return cleanup function
    return () => {
      if (subscription) {
        subscription.unsubscribe() // Unsubscribe from the STOMP destination
      }
      client.deactivate() // Disconnect the STOMP client
    }
  }, [url, setSpo2Value, setSpo2wave, setNibpData])

  return { stompClient, sendMessage }
}

export default useStompWebSocket
