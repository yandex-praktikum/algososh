import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";
import renderer from "react-test-renderer";

describe("Circle", () => {
  it("circle is empty", () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("circle with letter", () => {
    const circle = renderer.create(<Circle letter={"letter"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("circle with head", () => {
    const circle = renderer.create(<Circle head={"head"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("circle with React.Element in head", () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("circle with index", () => {
    const circle = renderer.create(<Circle index={0} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("circle with tail", () => {
    const circle = renderer
      .create(<Circle tailType={"string"} tail={"tail"} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("circle with React.Element in tail", () => {
    const circle = renderer
      .create(<Circle tailType={"element"} tail={<Circle />} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("circle is small", () => {
    const circle = renderer.create(<Circle isSmall />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("circle is default", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("circle is changing", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("circle is modified", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
});
