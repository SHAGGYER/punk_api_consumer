import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  border-radius: 25px;
  padding: 2rem 3rem;
  box-shadow: 0 3px 10px 10px rgba(0, 0, 0, 0.1);

  display: flex;
  gap: 2rem;
  align-items: center;

  h3 {
    font-size: 14px;
    font-weight: normal;
    margin-bottom: 0.5rem;
  }

  i {
    font-size: 30px;
  }

  p {
    font-size: 25px;
  }
`;

interface Props {
  title: string;
  statistic: string;
  icon?: string;
}
function DataBox({ title, statistic, icon }: Props) {
  return (
    <Container>
      {icon && <i className={icon} />}
      <article>
        <h3>{title}</h3>
        <p>{statistic}</p>
      </article>
    </Container>
  );
}

export default DataBox;
