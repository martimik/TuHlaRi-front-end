import React from "react";
import { shallow } from "enzyme";
import Homepage from "../components/HomePage";

it("renders welcome message", () => {
    const wrapper = shallow(<Homepage />);
    const welcome = "Welcome!";
    expect(wrapper.contains(welcome)).toEqual(true);
});
