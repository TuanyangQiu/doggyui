import React from "react";
import { Divider } from "antd";
import { Filter } from "./Filter";
import styles from "./FilterArea.module.css";

export const FilterArea: React.FC = () => {
  return (
    <>
      <Filter title="Rating" tags={["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"]} />
      <Divider dashed className={styles["filter-divider"]} />
      <Filter title="Departure City" tags={["Auckland", "Shanghai", "Wellington", "Christchurch"]} />
      <Divider dashed className={styles["filter-divider"]} />
      <Filter title="Days" tags={["2 days", "3 days", "4 days", "5 days", "6 days"]} />
      <Divider dashed />
      <Filter
        title="Tourism Type"
        tags={["Group", "Backpack", "Private", "Hign-End"]}
      />
      <Divider dashed />
      <Filter title="Departure Date" tags={["September", "October", "November", "Christmas day"]} />
    </>
  );
};
