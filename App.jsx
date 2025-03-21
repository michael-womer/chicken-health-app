import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Container} from '@mui/material';
import {AIResultsComponent} from 'components/AIResultsComponent.jsx';
import {CameraComponent} from 'components/CameraComponent.jsx';
import {HealthRecordComponent} from 'components/HealthRecordComponent.jsx';
import {LoadingComponent} from 'components/LoadingComponent.jsx';
import {NotificationComponent} from 'components/NotificationComponent.jsx';



function App(){

    return(
        <Container>
            <BrowserRouter>
            <Routes>
            
            </Routes>
            </BrowserRouter>
        </Container>
    )
}

export default App;