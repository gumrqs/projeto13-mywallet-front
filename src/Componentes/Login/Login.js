import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState} from "react";

import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import {ThreeDots} from 'react-loader-spinner';
import { loginUser } from '../../service/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 
export default function Login(){
   
    const [emailUser,setEmailUser]= useState('');
    const [passwordUser,setPasswordUser]= useState('');
    const navigate = useNavigate();
    const { users, setUsers } = useContext(UserContext);
    const [Isloading, setIsLoading] =useState (false);

   

function confirmLogin(e){
    e.preventDefault();
    setIsLoading(true)


    const body = {
        email: emailUser,
        password: passwordUser
    }

    loginUser(body)
        .then((resposta) => {
            setIsLoading(false)
            setUsers(resposta.data);
            toast.success("Tudo certo, vamos la!");
            setTimeout(()=>{
                navigate('/home');
            },2000) 
        })
        .catch((err) => {
            setIsLoading(false)
            console.error(err);
            if(err.status !== 200){
                toast.error("Login está errado, tente novamente");
            } 

        });
    setEmailUser('');
    setPasswordUser('');   
}



    return (
            
            <LoginP>
            <ToastContainer />
                <Text>
                    My Wallet
                </Text>

                <Formulario>
                <form onSubmit={confirmLogin}>
                    <Dados>    
                        <Forms>
                                <Input type="text"  onChange={(e) => setEmailUser(e.target.value)} 
                                   value={emailUser} 
                                    required
                                    placeholder='email'
                        
                                />
                        </Forms>
                        <Forms>
                                <Input type="password" onChange={(e) => setPasswordUser(e.target.value)} 
                                     value={passwordUser}
                                    required
                                    placeholder='senha'
                                />
                         </Forms>
                         {
                             Isloading?
                             <Button type='submit'> <ThreeDots color={'white'} height={30} width={30}/></Button>
                            :
                            <Button type='submit'> <p>Entrar</p></Button>
                         }
                        
                        
                        <Link to="/sign-up">
                        <Cadastrar>Não tem uma conta? Cadastre-se!</Cadastrar>
                        </Link>
                    </Dados>
                </form>
            </Formulario>

            </LoginP>
       
    )
}

const LoginP = styled.div`
    width: 100%;
    height:100vh ;
    background-color: rgb(128,34,183);
    display:flex ;
    flex-direction: column ;
    justify-content: center ;
    align-items: center ;
`;

const Formulario = styled.div`
margin-top: 32.62px;
`
const Input =  styled.input`
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 5px;
width: 303px;
height:45px ;
color: #000000 ;
padding-left: 11px;
box-sizing: border-box ;
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
::placeholder{
   color: #DBDBDB;
}
`
const Forms = styled.div `
    margin-bottom: 6px ;

`
const Dados = styled.div`


`
const Button = styled.button`
background: #A328D6;
border-radius: 4.63636px;
width: 303px ;
height:45px ;
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 20.976px;
line-height: 26px;
text-align: center;
border: none ;
color: #FFFF;
`
const Cadastrar = styled.div` 
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 13.976px;
line-height: 17px;
text-align: center;
text-decoration-line: none;
margin-top:25px ;
color: #FFFFFF ;
`
const Text = styled.div` 
font-family: 'Saira Stencil One';
font-size: 32px;
font-weight: 400;
line-height: 50px;
letter-spacing: 0em;
text-align: left;
color: #FFFFFF;
height: 50px;
width: 160px;
border-radius: nullpx;


`