import styled from "styled-components";

export const SystemContainer = styled.div`
    display: flex;
    flex-direction: row;

`

export const UserContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    
`
export const SystemMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start; 

`
export const UserMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end; 
    .header {
        /* display: flex; */
        flex-direction: row-reverse;

    }

`
export const MessageHeader = styled.div`
    display: flex;
    /* flex-direction: column; */

`
export const MessageHeaderEdit = styled.div`
    display: flex;

`

