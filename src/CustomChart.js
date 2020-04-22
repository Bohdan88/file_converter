import React, { Component } from "react";
import { ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line, ReferenceArea } from "recharts";
import { data } from "./data";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

//  PDF FLOW:
//  ||
//  \/
//  DOM into SVG
//  ||
//  \/
//  SVG into PNG
//  ||
//  \/
//  PNG into PDF

class CustomChart extends Component {
    printPDFDocument() {
        const input = document.querySelector(".container-chart");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            //  15 ==> x
            //  40 ==> y
            //  180 ==> width
            //  160 ==> height
            pdf.addImage(imgData, "JPEG", 15, 40, 180, 120);
            pdf.save("chart.pdf");
        });
    }

    printImage(format) {
        const input = document.querySelector(".container-chart");
        html2canvas(input).then((canvas) => {
            const a = document.createElement("a");
            a.href = canvas.toDataURL("chart");
            a.download = `chart.${format}`;
            a.click();
        });
    }

    render() {
        return (
            <div style={{ padding: "20px" }}>
                <div className="container-chart">
                    <ComposedChart
                        width={600}
                        height={400}
                        data={data}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="sale_date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <ReferenceArea />
                        <Bar dataKey="median_sale" barSize={20} fill="#413ea0" />
                        <Line type="monotone" dataKey="average_sale" stroke="#ff7300" />
                    </ComposedChart>
                </div>
                <div style={{ paddingLeft: "250px", paddingTop: "20px" }}>
                    <button onClick={() => this.printPDFDocument()}> PDF </button>
                    <button onClick={() => this.printImage("png")}> PNG </button>
                    <button onClick={() => this.printImage("jpeg")}> JPEG </button>
                </div>
            </div>
        );
    }
}

export default CustomChart;
