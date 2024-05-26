import React from "react";
import filterStyle from "../../styles/filter.module.css";
import CustomSortDropdown from "../../components/common/CustomSortDropdown";

export default function SortAndFilters({
  sortOptions,
  getSortedData,
  filterPriceRangeData,
  finalData,
}) {
  return (
    <div className={filterStyle["filter_wrapper"]}>
      <div className={filterStyle["icon"]}>
        <img
          src="https://d2mccptxtk231d.cloudfront.net/v2_d_app/327/dist/ec801393969dd5727e11.svg"
          alt=""
        />
      </div>
      <CustomSortDropdown
        data={sortOptions}
        getSortedData={getSortedData}
        finalData={finalData}
      />
      <CustomSortDropdown
        data={sortOptions}
        getSortedData={getSortedData}
        filterPriceRangeData={filterPriceRangeData}
        type="price"
        finalData={finalData}
      />
    </div>
  );
}
