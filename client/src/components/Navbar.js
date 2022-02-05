import React from "react";
import styled from "styled-components";

const Container = styled.div`
    height: 60px;
    background-color: black;`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: center`

const Left = styled.div``

const Center = styled.div``

const Right = styled.div``

const Navbar = () => {
    return (
        <>
            <Container>
                <Wrapper>
                    <Left>Left</Left>
                    <Center>Center</Center>
                    <Right>Right</Right>
                </Wrapper>
            </Container>
        </>
    );
}

export default Navbar;