import { Typography,  } from "@mui/material";
import { useAppSeletor } from "../../services/helper/redux";
import { PartyPopper } from "lucide-react";


const Navbar = () => {
  const {user} = useAppSeletor((state)=> state.auth)
 
  return (
    <>
      <div style={{ padding: "5px" }}   >
        <Typography variant="h5" sx={{fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'monospace'}}>Welcome <span >{user.name}</span> <PartyPopper color="pink"/></Typography>
        
      </div>
    </>
  );
};

export default Navbar;
