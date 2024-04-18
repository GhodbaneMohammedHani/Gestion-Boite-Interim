import SignUpEmployer from "./SignUpEmploye";
import { BrowserRouter,Routes,Route, RouterProvider } from "react-router-dom";
import SignUpEnterprise from "./SignUpEnterprise";
import Profile from './employes/Profile'
import './styles/App.css'
import Employe from './employes/Employe'
import SideBar from "./employes/SideBar";
import { useAuthContext } from "./hooks/useAuthContext";
import MonProfile from "./employes/MonProfile";
import Competences from "./employes/Competences";
import Chemin from "./employes/Chemin";
import Login from "./login";
import AjouterCompetence from "./employes/AjouterCompetence";
import axios from "axios";
import AjouterProfile from "./employes/AjouterProfile";
import NotFound from "./notFound";
import { Navigate } from "react-router-dom";
import { getUser } from "./getUser";
import Competence from "./employes/Competence";
import Admin from "./admin/Admin"
import Recruitements from "./admin/Recruitements";
import ManageEmployes from "./admin/ManageEmployes";
import ManageEnterprises from "./admin/ManageEnterprises";
import Enterprise from "./enterprises/Enterprise";
import DetailsProfile from "./enterprises/DetailsProfile";
import EnterpriseProfiles from "./enterprises/EnterpriseProfiles";
import Demandes from "./enterprises/Demandes";
import CompteEmploye from "./employes/CompteEmploye";
import Wiki from "./employes/Wiki";
import AjouterProblem from "./employes/AjouterProblem";
export const client=axios.create({
  baseURL: "http://localhost:5000"
})
function App() {
  const {user}=useAuthContext();
  let userInfo;
  if(user){
    console.log('user exists');
  userInfo=getUser();
  }
  return (
    <BrowserRouter>
    <Routes>
    <Route path="Employe/:numEmploye/" element={<Employe/>}/>
    <Route path="Employe/:numEmploye/Compte" element={<CompteEmploye />}/>
    <Route path="Employe/:numEmploye/Ajouter-Profile"  element={<AjouterProfile/>}/>
    <Route path="Employe/:numEmploye/Profile/:numProfile" element={<Profile/>}>
          <Route path="MonProfile" element={<MonProfile/>}/>
          <Route path="Competences" element={<Competences/>}/>
          <Route path="Wiki" element={<Wiki />} />
          <Route path="Wiki/Ajouter-Problem" element={<AjouterProblem/>} />
          <Route path="Competences/:numCompetence"  element={<Competence/>} />
          <Route path="Competences/Ajouter-Competence" element={<AjouterCompetence/>}/>
    </Route>
    <Route path="Admin/:numAdmin" element={<Admin/>}>
      <Route path="Recrutements" element={<Recruitements/>}/> 
      <Route path="Employes" element={<ManageEmployes/>} />
      <Route path="Enterprises" element={<ManageEnterprises/>} />
    </Route>
    <Route path="/" exact element={
         !user ? <Login/>:userInfo && userInfo.role=='employe'?<Navigate to={`Employe/${userInfo.id}`}  /> :
         userInfo && userInfo.role=='enterprise'? <Navigate to={`Enterprise/${userInfo.id}/profiles`} /> :
         userInfo && userInfo.role=='admin' ? <Navigate to={`Admin/${userInfo.id}/Recrutements`} /> : <NotFound/>
      } />
      <Route path="/SignUpEmploye" element={<SignUpEmployer/>}/>
      <Route path="/SignUpEnterprise" element={<SignUpEnterprise/>} />
      <Route path="/Enterprise/:numEnterprise" element={<Enterprise/>} >
        <Route path="profiles" element={<EnterpriseProfiles/>} />
        <Route path="profiles/:numProfile" element={<DetailsProfile/>} />
        <Route path="demandes" element={<Demandes/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}
export default App;