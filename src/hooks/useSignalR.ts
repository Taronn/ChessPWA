import { createSignalRContext } from 'react-signalr/signalr';

const SignalRContext = createSignalRContext();

export function useSignalR() {
  return {
    SignalRContext,
  };
}