import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ChartData, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartContainer } from "./components/ChartContainer";
import { AppContainer } from "./components/AppContainer";
import axios from "axios";
import MonthSelector from "./components/MonthSelector";
import DataBox from "./components/DataBox";
import { getChangeInPercentage, months } from "./helpers";
import ChartStatistic from "./components/ChartStatistic";
import { DataContainer } from "./components/DataContainer";
ChartJS.register(...registerables);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

interface Ingredients {
  [key: string]: any[];
}
interface Beer {
  id: number;
  first_brewed: string;
  abv: number;
  ingredients: Ingredients;
}

function App() {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [monthsParsed, setMonthsParsed] = useState<Array<number>>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [totalBrewed, setTotalBrewed] = useState<number>(0);
  const [avgIngredientsPerBeer, setAvgIngredientsPerBeer] =
    useState<string>("");
  const [avgAlcoholPercentage, setAvgAlcoholPercentage] = useState<string>("");
  const [highestMonth, setHighestMonth] = useState<string>("");
  const [graphData, setGraphData] = useState<ChartData<"line">>({
    labels: months,
    datasets: [],
  });

  useEffect(() => {
    getGraphData();
  }, []);

  useEffect(() => {
    if (graphData.datasets.length) {
      calculate();
    }
  }, [selectedMonth, graphData.datasets.length]);

  const calculate = () => {
    let sumAbv = 0;
    let sumIngredients = 0;
    beers.forEach((beer) => {
      sumAbv += beer.abv;

      sumIngredients += Object.keys(beer.ingredients).length;
    });

    setAvgIngredientsPerBeer((sumIngredients / beers.length).toFixed(0));
    setAvgAlcoholPercentage((sumAbv / beers.length).toFixed(1));

    let highestPerMonth = 0;
    monthsParsed.forEach((month) => {
      if (month > highestPerMonth) {
        highestPerMonth = month;
      }
    });

    setHighestMonth(months[highestPerMonth - 1]);
  };
  const getGraphData = async () => {
    const { data } = await axios.get<Beer[]>(
      `https://api.punkapi.com/v2/beers`
    );

    const monthsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    setBeers(data);
    setTotalBrewed(data.length);

    data.forEach((beer) => {
      const split = beer.first_brewed.split("/"); // eg. 01/2012
      const monthBrewed = parseInt(split[0]);
      monthsCount[monthBrewed - 1]++;
    });

    setMonthsParsed(monthsCount);
    setGraphData({
      ...graphData,
      datasets: [
        {
          label: "Amount of brewed beers",
          data: monthsCount,
          borderColor: "rgb(195, 150, 210)",
          backgroundColor: "rgba(195, 150, 210)",
        },
      ],
    });
  };

  const getPercentageLastMonth = () => {
    const value = monthsParsed[selectedMonth];
    const oldValue =
      selectedMonth - 1 >= 0 ? monthsParsed[selectedMonth - 1] : 0;
    return getChangeInPercentage(value, oldValue);
  };

  const getTotalSinceLastMonth = () => {
    const value = monthsParsed[selectedMonth];
    const oldValue =
      selectedMonth - 1 >= 0 ? monthsParsed[selectedMonth - 1] : 0;

    return value - oldValue;
  };

  return (
    <AppContainer>
      <article>
        <MonthSelector onMonthSelected={(month) => setSelectedMonth(month)} />
      </article>

      <article style={{ marginBottom: "3rem" }}>
        <DataBox
          title="Brygget i alt"
          statistic={totalBrewed + " øl"}
          icon={"fa-solid fa-download"}
        />
      </article>

      <article style={{ marginBottom: "3rem" }}>
        <ChartContainer>
          <Line options={options} data={graphData} />
          <div className="statistic">
            <i className="fa-solid fa-chart-simple"></i>
            <ChartStatistic
              total={getTotalSinceLastMonth()}
              percentage={getPercentageLastMonth()}
              text={"fra sidste måned"}
            />
          </div>
        </ChartContainer>
      </article>

      <article>
        <DataContainer>
          <DataBox
            title={"Gennemsnitligt nye øl per måned"}
            statistic={avgIngredientsPerBeer + " øl"}
          />
          <DataBox
            title={"Gennemsnitlig alkoholprocent"}
            statistic={avgAlcoholPercentage + "%"}
          />
          <DataBox title={"Højeste måned"} statistic={highestMonth} />
        </DataContainer>
      </article>
    </AppContainer>
  );
}

export default App;
