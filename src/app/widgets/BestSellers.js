/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { toAbsoluteUrl } from "../../_metronic/utils/utils";
import PortletHeaderDropdown from "../partials/content/CustomDropdowns/PortletHeaderDropdown";

export default function BestSellers({bestSallers}) {
  console.log(bestSallers);
  return (
    <>
      <div className="kt-portlet kt-portlet--height-fluid">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">Best Sellers</h3>
          </div>
          <PortletHeaderDropdown />
        </div>
        <div className="kt-portlet__body">
          <div className="kt-widget5">
          {bestSallers.map(s=>(
            <div className="kt-widget5__item ">
          
              <div className="kt-widget5__content">
                <div className="kt-widget5__pic">
                  <img
                    alt=""
                    className="kt-widget7__img"
                    src={toAbsoluteUrl("/media/products/product6.jpg")}
                  />
                </div>
               
                <div className="kt-widget5__section">
                  
                  <p className="kt-widget5__desc">{s.menuItemName}</p>
                  <div className="kt-widget5__info">
                  </div>
                </div>
              </div>
              
              <div className="kt-widget5__content">
                <div className="kt-widget5__stats">
            <span className="kt-widget5__number">{s.total}</span>
                  <span className="kt-widget5__sales">sales</span>
                </div>
                <div className="kt-widget5__stats">
                  <span className="kt-widget5__number">{s.total}</span>
                  <span className="kt-widget5__votes">votes</span>
                </div>
              </div>
            </div>
            ))
          }
            
          </div>
        </div>
      </div>
    </>
  );
}
