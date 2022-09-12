import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {ThreeDots} from 'react-loader-spinner';
import { registerUser } from "../../service/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register (){

const [email,setEmail]= useState('');
const [password,setPassword]= useState('');
const [name,setName]= useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const navigate=useNavigate();
const [isloading, setIsLoading] =useState (false)
console.log("comecei ")

function confirmLogin(e){
    if(confirmPassword !== password){
         alert('Senhas são diferentes, tente novamente')

    }else{
    e.preventDefault();
    setIsLoading(true)

    const body = {
        email: email,
        name: name,
        password: password
    }

    registerUser(body)
        .then(() => {
            toast.success("Tudo certo, vamos la, Faça seu login :)!!");
            setTimeout(()=>{
                navigate('/');
            },2000) 
        })
        .catch((err) => {
            setIsLoading(false)
            console.error(err);
            if(err.status !== 200){
                toast.error("Email já está sendo utilizado :( - Tente outro :D")
            } 

        });

    setEmail('');
    setName('');
    setPassword('');
    setConfirmPassword('');
}
}

    return (
        <LoginP>
            <ToastContainer />
            <Text>
                    My Wallet
            </Text>

            <Formulario>
                <form onSubmit={confirmLogin} >
                    <Dados>  

                        <Forms>
                            <Input type="text" onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    required
                                    placeholder='nome'
                            />
                        </Forms>  
                        <Forms>
                            <Input type="email" onChange={(e) => setEmail(e.target.value)} 
                                   value={email} 
                                    required
                                    placeholder='email'
                            />
                        </Forms>
                        <Forms>
                            <Input type="password" onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                    placeholder='senha'
                            />
                        </Forms>

                        <Forms>
                            <Input type="password" onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    required
                                    placeholder='confirme sua senha'
                            />
                        </Forms>
                        
                        {
                            isloading?
                            <Button> <ThreeDots color={'white'} height={30} width={30}/></Button>
                            :
                            <Button> <p>Cadastrar</p></Button>
                        }
                    
                        <Link to="/">
                        <Cadastrar>Já tem uma conta? Faça login!</Cadastrar>
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
text-decoration: rgb(128,34,183);
`