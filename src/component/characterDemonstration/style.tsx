import styled from "styled-components";

export const NoDataWrapper = styled.div`
    height: calc(100% - 54px);
    background: white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const DataWrapper = styled.div`
    height: calc(100% - 54px);
    background: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;

    /* justify-content: center; */
    align-items: center;
`

export const ButtonWrapper = styled.div`
    display: flex;
    position: relative;
    /* align-items: center; */
    justify-content: space-around;
    width: 60%;
    bottom: 0;
    /* height: 60px; */
    margin: 20px 0 20px 0;
    button {
        width: 100px;
        background-color: green;
    }

`