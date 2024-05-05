import * as React from "react";
import Chart from 'react-apexcharts'
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import { callApi ,selectApi} from "../../../reducers/apiSlice";
import { useDispatch, useSelector } from "react-redux";
const Charts = () => {
  const dispatch = useDispatch();
    var options = {
        series: [{
          name:"",
        data: [4, 55, 41]
      }, {
        data: [5, 32, 33]
      },{
        data: [4, 55, 41]
      }],
        chart: {
        type: 'bar',
        height: 430
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      xaxis: {
        categories: [],
      },
      };

      const {
        loading,
        dashboardStatus = {
          data: {},
        },
      } = useSelector(selectApi);

      React.useEffect(() => {
        dispatch(
          callApi({
            operationId: UrlBuilder.foreignApi("scholarship-circular/dashboard-status"),
            output: "dashboardStatus",
          })
        );
      }, []);
      
      if(dashboardStatus.data.length>0){
        var arr1 =[]
        var arr2 =[]
        var arr3 =[]
        dashboardStatus.data.map((item)=>{
            options.xaxis.categories.push(item.programName)
            let numOfApplicant = item.numOfApplicant;
            let numOfApplicantApproved = item.numOfApplicantApproved
            let review = item.numOfApplicantReviewed
            arr1.push(numOfApplicant)
            arr2.push(numOfApplicantApproved)
            arr3.push(review)
            
        })
        options.series[0].data = arr1
        options.series[0].name = "No. Of Applicant"
        options.series[1].data = arr2
        options.series[1].name = "No. Of Approved"
        options.series[2].data = arr3
        options.series[2].name = "No. Of Review"
      }
     



    return (
          <div className="mixed-chart">
            <h6 className='p-14 border mb-0  ' >Application Summay</h6>
            <Chart
              options={options}
              series={options.series}
              type="bar"
              width="100%"
              height="300"
            />
          </div>
    );
};

export default Charts;
