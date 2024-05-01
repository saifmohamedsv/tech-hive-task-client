import "react-native-gesture-handler";
import { AuthProvider } from "./hooks/useAuth";
import Navigation from "./navigation/Navigation";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
