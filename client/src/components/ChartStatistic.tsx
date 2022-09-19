import React from "react";
import styled from "styled-components";

const Container = styled.div`
  .rising {
    color: #1cb537;
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
      <span className={total >= 0 ? "rising" : ""}>
        {total} ({total >= 0 ? "+" : "-"}
        {percentage}%)
      </span>

      <span> {text}</span>
    </Container>
  );
}

export default ChartStatistic;
