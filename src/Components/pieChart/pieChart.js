import React from "react";
import { Chart } from "react-google-charts";

const options = {
    title: "RESULTADOS",
    is3D: true,
    colors: ['#57bd9e', '#FF5733'], // Aquí puedes definir los colores que desees
};

function App(accuracy) {
    let aux = accuracy.score;
    let aux1 = 100 - aux;
    console.log(aux, 'aux');
    const data = [
        ["Task", "Hours per Day"],
        ["", aux],
        ["", aux1],
    ];
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            style={{width: '100%', height: '100%', padding:'-10%'}}
        />

    );
}

export default App;
