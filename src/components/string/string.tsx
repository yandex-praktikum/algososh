import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {StringComponentContent} from "../string-component-content/string-component-content";

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <StringComponentContent/>
    </SolutionLayout>
  );
};
