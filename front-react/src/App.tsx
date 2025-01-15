import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import About from "./pages/About.tsx";
import Navigation from "./pages/navigation/Navigation.tsx";
import 'bootstrap/dist/css/bootstrap.css'
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./Keycloak.ts";

function App() {

    return (
        <ReactKeycloakProvider authClient={keycloak}>
            <Navigation/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </ReactKeycloakProvider>

    )
}


export default App
