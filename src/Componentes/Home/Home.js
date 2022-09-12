
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import { homeUser } from '../../service/api';
import { Link } from 'react-router-dom';
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
                    <Footer>
                        
                        <Input onClick={()=> navigate('/input')}>
                            <Text2><ion-icon name="add-circle-outline"></ion-icon></Text2>
                            <TextIn> Nova entrada</TextIn>
                        </Input>
                      
                        <Output onClick={()=> navigate('/output')}>
                            <Text2><ion-icon name="remove-circle-outline"></ion-icon></Text2>
                            <TextIn> Nova Saída</TextIn>
                        </Output>
                   
                    </Footer>
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
                                <Text7> 
                                    <Text3> 
                                        {value.date}
                                    </Text3>
                                    <TextDescription> 
                                        {value.description}
                                    </TextDescription>
                                    <TextValue entry={value.entry}>
                                        R$ {value.value}
                                    </TextValue>            
                                </Text7>
                          );  
                        })}
                    </Movements>
                    <Footer>
                        
                        <Input onClick={()=> navigate('/input')}>
                            <Text2><ion-icon name="add-circle-outline"></ion-icon></Text2>
                            <TextIn> Nova entrada</TextIn>
                        </Input>
                      
                        <Output onClick={()=> navigate('/output')}>
                            <Text2><ion-icon name="remove-circle-outline"></ion-icon></Text2>
                            <TextIn> Nova Saída</TextIn>
                        </Output>
                   
                    </Footer>
                </>
           }
    </Body>

)
}
const Footer = styled.div`
`
const Output = styled.div`
    background-color:#A328D6;
    position:fixed;
    bottom:18px;
    right:25px;
    width: 155px;
    height:114px ;
    display: flex;
    flex-direction: column ;
    justify-content:space-between ;
    padding:15px ;
    box-sizing: border-box ;
    border-radius: 5px;
`
const TextIn = styled.div`
font-family: 'Raleway';
font-size: 17px;
font-weight: 700;
line-height: 20px;
letter-spacing: 0em;
text-align: left;
color:#FFFFFF;

`
const Input = styled.div`
    background-color:#A328D6;
    position:fixed;
    bottom:18px;
    left:25px;
    width: 155px;
    height:114px ;
    display: flex;
    flex-direction: column ;
    justify-content:space-between ;
    padding:15px ;
    box-sizing: border-box ;
    border-radius: 5px;
`

const Text7 = styled.div`
width: 100%;
display:flex ;
margin-bottom:8px ;

`
const Text3 = styled.div`
    color: #C6C6C6;
    font-family: 'Raleway';
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
`
const TextDescription = styled.div`
width:145px ;
    color:#000000 ;
    font-family: 'Raleway;';
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
`

const TextValue = styled.div`
    color: ${props => (props.entry === 'negative' ? '#C70000' : '#03AC00')};
    font-family:'Raleway';
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: right;

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
color: #868686;
display: flex;
flex-wrap: wrap;
justify-content: space-between ;
align-items: center ;
border-radius: 5px;
`