"use client";

import Image from "next/image";
import { useState } from "react";

interface DropdownListProps {
  options?: string[];
  selectedOption?: string;
  onOptionSelect?: (option: string) => void | Promise<void>;
  triggerElement?: React.ReactNode;
}

const DropdownList = ({
  options = ["Most recent", "Most liked"],
  selectedOption = "Most recent",
  onOptionSelect = () => {},
  triggerElement,
}: DropdownListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  const defaultTrigger = (
    <div className="filter-trigger">
      <figure>
        <Image
          src={"/assets/icons/hamburger.svg"}
          alt="menu"
          width={14}
          height={14}
        />
        {selectedOption}
      </figure>
      <Image
        src={"/assets/icons/arrow-down.svg"}
        alt="arrow-down"
        width={20}
        height={20}
      />
    </div>
  );

  return (
    <div className="relative">
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {triggerElement || defaultTrigger}
      </div>

      {isOpen && (
        <ul className="dropdown">
          {options.map((option) => (
            <li
              key={option}
              className={`list-item ${
                option === selectedOption ? "selected" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownList;
