import { Button } from "./button";
import React from "react";
import renderer from "react-test-renderer";
import {render, fireEvent, waitFor, screen} from '@testing-library/react';


describe("Проверка рендера кнопки", () => {
  it("Кнопка с текстом рендерится без ошибок", () => {
    const tree = renderer.create(<Button text="Sample text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка без текста рендерится без ошибок", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Заблокированная кнопка рендерится без ошибок", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка в состоянии загрузки рендерится без ошибок", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});


