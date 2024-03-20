import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { registerForPushNotificationsAsync } from "@/src/lib/notifications.ts";
import * as Notifications from "expo-notifications";
import { useAuth } from "@/src/providers/AuthProvider.tsx";
import { supabase } from "@/src/lib/supabase.ts";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const { profile } = useAuth();

  const [expoPushToken, setExpoPushToken] = useState<string>("");
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const savePushToken = async (newToken: string) => {
    if (!newToken || !profile) return;

    setExpoPushToken(newToken);

    await supabase
      .from("profiles")
      .update({ expo_push_token: newToken })
      .eq("id", profile.id);
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => savePushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("RESP =>", response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return <>{children}</>;
};
export default NotificationProvider;
