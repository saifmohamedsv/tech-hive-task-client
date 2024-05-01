import "react-native-gesture-handler";
import Navigation from "./navigation/Navigation";
import { AuthProvider } from "./providers/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
