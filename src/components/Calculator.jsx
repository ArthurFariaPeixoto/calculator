"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";

/**
 * A simple calculator component that displays a text input
 * and a grid of numbers and operators. When a button is clicked,
 * the corresponding value is appended to the input value. If the
 * "=" button is clicked, the input expression is evaluated and the
 * result is displayed. If an error occurs (e.g. invalid expression),
 * the input is cleared and an "Error" message is displayed.
 */
export const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);

  /**
   * Evaluates a given expression and returns the result. If the expression is
   * invalid, throws an Error.
   *
   * @param {string} expression
   * @returns {number}
   * @throws {Error}
   */
  const evaluateExpression = (expression) => {
    try {
      const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, "");
      const result = new Function(`return (${sanitizedExpression})`)();
      return result;
    } catch {
      throw new Error("Invalid expression");
    }
  };

  /**
   * Handles a button click event by appending the button value to the input
   * value, unless the button value is "C" or "=". If the button value is "C",
   * the input value is cleared and the display value is reset to "0". If the
   * button value is "=", the input expression is evaluated and the result is
   * displayed. If an error occurs during evaluation, the input value is cleared
   * and an "Error" message is displayed.
   *
   * @param {string} buttonValue
   */
  const handleButtonClick = (buttonValue) => {
    try {
      if (buttonValue === "C") {
        setDisplayValue("0");
        setInputValue("");
        setHasError(false);
      } else if (buttonValue === "=") {
        if (inputValue) {
          const result = evaluateExpression(inputValue);
          setDisplayValue(result.toString());
          setInputValue(result.toString());
        }
      } else {
        if (hasError) setHasError(false);
        setInputValue((prevValue) => prevValue + buttonValue);
      }
    } catch (error) {
      setHasError(true);
      setInputValue("");
    }
  };

  return (
    <div className="flex z-[10] items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="mb-4">
          <input
            type="text"
            value={hasError ? "Error" : inputValue || displayValue}
            readOnly
            className="w-full p-3 text-right text-gray-800 text-xl border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            "7",
            "8",
            "9",
            "/",
            "4",
            "5",
            "6",
            "*",
            "1",
            "2",
            "3",
            "-",
            "C",
            "0",
            "=",
            "+",
          ].map((buttonValue) => (
            <Button
              key={buttonValue}
              onPress={() => handleButtonClick(buttonValue)}
              className="p-4 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              {buttonValue}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
