import React from "react";
import styled from "styled-components";

const Container = styled.div`
  .rising {
    color: #1cb537;
  }

  h3 {
    color: #b51a00;
    font-weight: normal;
    display: inline;
  }
`;

interface Props {
  total: number;
  percentage: string | number;
  text: string;
}
function ChartStatistic({ total, percentage, text }: Props) {
  return (
    <Container>
      <h3 className={total >= 0 ? "rising" : ""}>
        {total} ({total >= 0 ? "+" : "-"}
        {percentage}%)
      </h3>

      <span> {text}</span>
    </Container>
  );
}

export default ChartStatistic;
