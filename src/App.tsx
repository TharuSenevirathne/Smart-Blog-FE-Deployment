// rfc = Auto generate component

import { AuthProvider } from "./context/authContext";
import Router from "./routes/index"; 

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;

