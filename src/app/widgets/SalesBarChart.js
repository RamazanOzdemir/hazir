import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { Chart } from "chart.js";
import { metronic } from "../../_metronic";
import { formatDistanceToNow } from "date-fns";

export default function SalesBarChart({ title, desc ,dailySales}) {
  const ref = useRef();
  const { successColor } = useSelector(state => ({
    successColor: metronic.builder.selectors.getConfig(
      state,
      "colors.state.success"
    )
  }));
  const day_length = dailySales.length;
  if(day_length<10){
    for(let i=0; i<10-day_length; i++)
      dailySales.push(null);
  }
  console.log(dailySales);
  let dates = [];
  dailySales.forEach(element => {
    if(element)
      dates.push(element.date);
    else
      dates.push(element);
  });
  


  Date.prototype.getMonthName = function(lang) {
      lang = lang && (lang in Date.locale) ? lang : 'en';
      return Date.locale[lang].month_names[this.getMonth()];
  };

  Date.prototype.getMonthNameShort = function(lang) {
      lang = lang && (lang in Date.locale) ? lang : 'en';
      return Date.locale[lang].month_names_short[this.getMonth()];
  };

  Date.locale = {
      en: {
         month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
         month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
  };
  
  const data = {
      labels:dates.map(date=>{
        if(date){
          let d = new Date(d);
          return `${d.getMonthName()} ${d.getDate()}`; 
        }
        else
          return '';

      }),
      labels: dailySales.map(d=>{
        if(d!==null){
        let dd = new Date(d.date);
        return `${dd.getMonthName()} ${dd.getDate()}`
        }
        else
         return "";
      }),
      datasets: [
        {
          // label: 'dataset 1',
          backgroundColor: successColor,
          data: dailySales.map(d=>{
            if(d!==null){
            return d.total
            }
            else
             return 0;
          })
        },
        {
          // label: 'dataset 2',
          backgroundColor: "#f3f3fb",
          data: dailySales.map(d=>{
            if(d!==null){
            return d.total
            }
            else
             return 0;
          })
        }
      ]
    };

  useEffect(() => {
    const chart = new Chart(ref.current, {
      data,
      type: "bar",
      options: {
        title: { display: false },
        tooltips: {
          intersect: false,
          mode: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10
        },
        legend: { display: false },
        responsive: true,
        maintainAspectRatio: false,
        barRadius: 4,
        scales: {
          xAxes: [{ display: false, gridLines: false, stacked: true }],
          yAxes: [{ display: false, stacked: true, gridLines: false }]
        },
        layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div className="kt-widget14">
      <div className="kt-widget14__header kt-margin-b-30">
        <h3 className="kt-widget14__title">{title}</h3>
        <span className="kt-widget14__desc">{desc}</span>
      </div>
      <div className="kt-widget14__chart" style={{ height: "120px" }}>
        <canvas ref={ref} />
      </div>
    </div>
  );
}
