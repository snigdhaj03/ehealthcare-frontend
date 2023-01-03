import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  fetch('/api/logout', {
    method: 'POST'
  }).then( (res) => {if(res.ok){navigate("/")}})
  
}

export default Logout;