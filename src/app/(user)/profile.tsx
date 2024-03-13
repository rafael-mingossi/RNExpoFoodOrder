import { supabase } from "@/src/lib/supabase";
import { View, Text, Button } from "react-native";
import { useAuth } from "@/src/providers/AuthProvider";

const ProfileScreen = () => {
  const { session } = useAuth();

  return (
    <View>
      <Text>Email: {session?.user?.email}</Text>

      <Button
        title="Sign out"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
};

export default ProfileScreen;
