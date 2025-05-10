import * as Notifications from "expo-notifications"
import * as Device from "expo-device"
const date = new Date()

// Set notification options
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
    shouldShowList: false,
  }),
  handleSuccess: async (id: string) => {
    console.log(date.getHours(), date.getMinutes())
    console.log(id + ": success")
  },
  handleError: async (id: string) => {
    console.log(date.getHours(), date.getMinutes())
    console.log(id + ": error")
  }
})

async function requestPermissions() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Permissão para notificações não foi concedida!');
      return;
    }
  } else {
    console.log('Precisa de um dispositivo físico para testar notificações');
  }
}

// Function handler for notifications
async function notificationHandler({ title, body }: { title?: string, body?: string }) {
  await requestPermissions()
  console.log(date.getHours(), date.getMinutes())
  console.log(`${Device.designName} foi`)
  Notifications.scheduleNotificationAsync({
    content: {
      title: title ? title : "",
      body: body ? body : "",
      sound: "default",
      priority: Notifications.AndroidNotificationPriority.HIGH,
      data: { data: "goes here" }
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
      repeats: false,
    }
  })
  console.log(`${Device.designName} recebeu`)
}

export default notificationHandler