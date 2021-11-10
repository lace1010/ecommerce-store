import styled from 'styled-components'

const Container = styled.div`
    height: 30px;
    background-color: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 100;
`

const announcements = () => {
    return (
        <Container>
            Super Deal! Free Shipping on Orders Over $50
        </Container>
            
    )
}

export default announcements
