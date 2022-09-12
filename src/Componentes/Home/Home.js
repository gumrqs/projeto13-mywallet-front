
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import { homeUser } from '../../service/api';

export default function Home(){

    const { user, setUser } = useContext(UserContext);
    const[rendervalues, setRenderValues] = useState(<></>)
    const navigate = useNavigate();
    const [updatevalues, setUpdateValues] = useState(true);
    const [isEmptyTransactions, setIsEmptyTransactions] = useState(true);
    const [valuesUser, setValueUser] = useState([]);



    
    console.log(valuesUser, 'DADOSSSS');

    useEffect(()=>{
        homeUser(user.token)
        
            .then((resposta) => {
               setValueUser(resposta.data);
                if(resposta.data.length===0){
                    setIsEmptyTransactions(true)
                } else{
                    setIsEmptyTransactions(false)
                }   
                
            })
            .catch((err) => {
                console.error(err);
                if(err.status !== 200){
                    alert("Cadastro errado ou já existente")
                } 
    
            });
        
        },[updatevalues])

    return (
    <Body>
        
           { 
            isEmptyTransactions === true 
            ?
                <>
                    <Topo>
                        <Text> Olá, {user.name}</Text>
                        <Text2> <ion-icon name="log-out-outline"></ion-icon></Text2>
                    </Topo>
                    <Movements>
                        Não há registros de
                        entrada ou saída
                    </Movements>
                </>
            :
                <>
                    <Topo>
                        <Text> Olá, {user.name}</Text>
                        <Text2> <ion-icon name="log-out-outline"></ion-icon></Text2>
                    </Topo>
                    <Movements>
                        {valuesUser.map((value, index)=>{
                            return (
                                <> 
                                    <Text3> 
                                        {value.date}
                                    </Text3>
                                    <TextDescription> 
                                        {value.description}
                                    </TextDescription>
                                    <TextValue entry={value.entry}>
                                        R$ {value.value}
                                    </TextValue>            
                                </>
                          );  
                        })}
                    </Movements>
                </>
           }
    </Body>

)
}
const Text3 = styled.div`

`
const TextDescription = styled.div`
`
const TextValue = styled.div`
    color: ${props => (props.entry === 'negative' ? '#C70000' : '#03AC00')};
`
const Body = styled.div`
background-color: rgb(128,34,183); 
padding: 25px;
box-sizing:border-box ;
`
const Topo = styled.div`
width: 100%;
display: flex;
justify-content: space-between;

margin-bottom: 22px ;
`
const Text = styled.div`
font-family: 'Raleway';
font-size: 26px;
font-weight: 700;
line-height: 31px;
letter-spacing: 0em;
text-align: left;
color: #FFFF;
`
const Text2 = styled.div`
font-size: 30px;
font-weight: 700;
color: #FFFF;
width: 23px;
height:24px ;
`
const Movements = styled.div`
background-color: white;
width: 100%;
padding: 25px;
box-sizing:border-box ;
font-family: 'Raleway';
font-size: 20px;
font-weight: 400;
line-height: 23px;
letter-spacing: 0em;
text-align: center;
color: #868686
`