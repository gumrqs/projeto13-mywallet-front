import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState} from "react";
import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import {ThreeDots} from 'react-loader-spinner';
import { inputUser } from '../../service/api';

export default function InputValue(){


    const [value,setValue]= useState('');
    const [description,setDescription]= useState('');
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [Isloading, setIsLoading] =useState (false);


    function confirmLogin(e){
        e.preventDefault();
        setIsLoading(true)
    
    
        const body = {
            value: value,
            description: description
        }
    
        inputUser(body,user.token)
            .then((resposta) => {
                setIsLoading(false)
                setUser(resposta.data);
                console.log('to esperando a promessa')
                /* toast.success("Tudo certo, vamos la!"); */
                setTimeout(()=>{
                    navigate('/home');
                },2000) 
                /* navigate('/home') */
                console.log(resposta, '-----------------');
            })
            .catch((err) => {
                setIsLoading(false)
                console.error(err);
                if(err.status !== 200){
                    /* toast.error("Login está errado, tente novamente"); */
                } 
    
            });
        setValue('');
        setDescription('');   
    }





    return ((
            
            <LoginP>
            {/* <ToastContainer /> */}
                <Text>
                    Nova Entrada
                </Text>
                <Formulario>
                <form onSubmit={confirmLogin}>
                    <Dados>    
                        <Forms>
                                <Input type="number"  onChange={(e) => setValue(e.target.value)} 
                                   value={value} 
                                    required
                                    placeholder='valor'
                        
                                />
                        </Forms>
                        <Forms>
                                <Input type="text" onChange={(e) => setDescription(e.target.value)} 
                                     value={description}
                                    required
                                    placeholder='descrição max(25)'
                                />
                         </Forms>
                         {
                             Isloading?
                             <Button type='submit'> <ThreeDots color={'white'} height={30} width={30}/></Button>
                            :
                            
                            <Button type='submit'> <p>Salvar Entrada</p></Button>
                            
                         }
                        
                        
                        {/* <Link to="/sign-up">
                        <Cadastrar>Não tem uma conta? Cadastre-se!</Cadastrar>
                        </Link> */}
                    </Dados>
                </form>
            </Formulario>

            </LoginP>
       
    ))
}

const LoginP = styled.div`
    padding: 25px ;
    box-sizing: border-box ;
    width: 100%;
    height:100vh ;
    background-color: rgb(128,34,183);
    display:flex ;
    flex-direction: column ;
    /* justify-content: center ;
    align-items: center ; */
`;

const Formulario = styled.div`
margin-top: 32.62px;
`
const Input =  styled.input`
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 5px;
width: 315px;
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
width: 315px ;
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


const Text = styled.div` 
font-family: 'Raleway';
font-size: 26px;
font-weight: 700;
line-height: 31px;
letter-spacing: 0em;
text-align: left;

color: #FFFFFF;
height: 50px;
width: 100%;
border-radius: nullpx;


`