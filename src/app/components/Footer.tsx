import styled from "styled-components";

const FooterContainer = styled.footer`
  background: #111;
  padding: 20px;
  text-align: center;
  color: white;
  margin-top: 40px;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} Moviezfy. All rights reserved.</p>
      <p>Contact Developer: <a href="mailto:stephenoyelabi@gmail.com">Stephen Oyelabi</a></p>
    </FooterContainer>
  );
}
// Footer component to be used in the main layout style