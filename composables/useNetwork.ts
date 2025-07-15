import { ref, onMounted, onUnmounted } from 'vue'

type EffectiveType = 'slow-2g' | '2g' | '3g' | '4g'

interface NetworkInformation extends EventTarget {
  readonly downlink: number;
  readonly downlinkMax: number;
  readonly effectiveType: EffectiveType;
  readonly rtt: number;
  readonly saveData: boolean;
  readonly type: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown';
  onChange: ((this: NetworkInformation, ev: Event) => any) | null;
}

export const useNetwork = () => {
  const connection = ref<NetworkInformation | null>(null)
  const effectiveType = ref<EffectiveType>('4g')

  const updateNetworkInfo = () => {
    const nav = navigator as any;
    if (nav.connection) {
      connection.value = nav.connection
      effectiveType.value = nav.connection.effectiveType
    }
  }

  onMounted(() => {
    if (process.client) {
      const nav = navigator as any;
      if ('connection' in nav) {
          updateNetworkInfo()
          nav.connection.addEventListener('change', updateNetworkInfo)
      }
    }
  })

  onUnmounted(() => {
    if (process.client) {
      const nav = navigator as any;
      if ('connection' in nav) {
          nav.connection.removeEventListener('change', updateNetworkInfo)
      }
    }
  })

  const getImageQuality = (): 'low' | 'medium' | 'high' => {
    switch (effectiveType.value) {
      case 'slow-2g':
      case '2g':
        return 'low'
      case '3g':
        return 'medium'
      case '4g':
        return 'high'
      default:
        return 'high'
    }
  }

  return {
    connection,
    effectiveType,
    getImageQuality,
  }
} 