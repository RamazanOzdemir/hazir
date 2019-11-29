import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import { metronic } from "../../../_metronic";
import QuickStatsChart from "../../widgets/QuickStatsChart";
import OrderStatisticsChart from "../../widgets/OrderStatisticsChart";
import OrdersWidget from "../../widgets/OrdersWidget";
import SalesBarChart from "../../widgets/SalesBarChart";
import DownloadFiles from "../../widgets/DownloadFiles";
import NewUsers from "../../widgets/NewUsers";
import LatestUpdates from "../../widgets/LatestUpdates";
import BestSellers from "../../widgets/BestSellers";
import AuthorsProfit from "../../widgets/AuthorsProfit";
import RecentActivities from "../../widgets/RecentActivities";
import PortletHeaderDropdown from "../../partials/content/CustomDropdowns/PortletHeaderDropdown";
import Simple_chart from "../../my_widgets/Simple_chart";

export default function Dashboard() {
  const { brandColor, dangerColor, successColor, primaryColor } = useSelector(
    state => ({
      brandColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.brand"
      ),
      dangerColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.danger"
      ),
      successColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.success"
      ),
      primaryColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.primary"
      )
    })
  );

  const chartOptions = useMemo(
    () => ({
      chart1: {
        data: [1,2,1,1,1,1,,1,,1,1,1,,1,1,1,1,1,1,,1,1,1,1,1,,1],
        color: brandColor,
        border: 3
      },

      chart2: {
        data: [11, 12, 18, 13, 11, 12, 15, 13, 19, 15],
        color: dangerColor,
        border: 3
      },

      chart3: {
        data: [12, 12, 18, 11, 15, 12, 13, 16, 11, 18],
        color: successColor,
        border: 3
      },

      chart4: {
        data: [11, 9, 13, 18, 13, 15, 14, 13, 18, 15],
        color: primaryColor,
        border: 3
      }
    }),
    [brandColor, dangerColor, primaryColor, successColor]
  );

  return (
    <>
      <div className="row">
        <div className="col-sm-6">
          <Simple_chart title='Branch Count' number={50} color='warning' />
        </div>
        <div className="col-sm-6">
          <Simple_chart title='Active Branches' number={33} color='danger'/>
        </div>

        <div className="col-sm-12">
          <Portlet fluidHeight={true}>
            <PortletHeader
              title="Total Revenue Chart"
            />

            <PortletBody>
              <OrderStatisticsChart />
            </PortletBody>
          </Portlet>
        </div>
      </div>
    </>
  );
}
