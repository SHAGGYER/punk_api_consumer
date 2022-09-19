import React, { useState } from "react";
import styled from "styled-components";
import { months } from "../helpers";

const Container = styled.div`
  position: relative;
  padding: 2rem;
  font-weight: bold;
  font-size: 16px;

  .selector {
    display: flex;
    gap: 3rem;
    align-items: center;
    cursor: pointer;
  }

  .menu {
    position: absolute;
    left: 0;
    top: 60px;
    background-color: white;
    border: 1px solid #bebebe;
    padding: 2rem;
    border-radius: 25px;
    width: 250px;

    ul {
      list-style-type: none;
    }

    li {
      cursor: pointer;
      margin-bottom: 1rem;
      padding: 0.5rem;
    }
  }
`;

interface Props {
  onMonthSelected: (month: number) => void;
}
function MonthSelector({ onMonthSelected }: Props) {
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const handleMonthSelected = (index: number) => {
    setOpen(false);
    setSelectedMonth(index);
    onMonthSelected(index);
  };

  return (
    <Container>
      <article className="selector" onClick={() => setOpen(!open)}>
        <span>{months[selectedMonth]}</span>
        <i className={`fa-solid fa-sort-${!open ? "down" : "up"}`}></i>
      </article>
      {open && (
        <article className="menu">
          <ul>
            {months.map((month, index) => (
              <li key={index} onClick={() => handleMonthSelected(index)}>
                {month}
              </li>
            ))}
          </ul>
        </article>
      )}
    </Container>
  );
}

export default MonthSelector;
