'use client';

import { lazy, Suspense, useRef, useState, useEffect } from "react"

interface PickerOption {
    label: string;
    value: string;
}

interface PickerProps {
    value: string;
    title: string;
    type: "date" | "select";
    borderColor?: string;
    className?: string;
    onChange: (value: string) => void;
    options?: PickerOption[];
}

const BiDown = lazy(() => import('react-icons/bi').then(module => ({
    default: module.BiChevronDown
})));

export function Picker({ value, title, type, borderColor = "light-gray", className = "", onChange, options = [] }: PickerProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        if (type === "date" && inputRef.current?.showPicker) {
            inputRef.current.showPicker();
        } else if (type === "select") {
            setIsOpen(!isOpen);
        }
    };

    const handleSelectOption = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const getDisplayValue = () => {
        if (type === "date") {
            return value;
        }
        const selectedOption = options.find(opt => opt.value === value);
        return selectedOption?.label || value;
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div
            ref={dropdownRef}
            className={`relative ${title ? "min-w-[160px]" : "min-w-[100px]"} border-[2px] border-${borderColor} rounded-xl p-2 bg-white flex flex-col justify-center items-start cursor-pointer h-[56px] ${className}`}
            onClick={handleClick}
        >
            {
                title && (
                    <label className="text-md text-point-blue font-bold mb-1">
                        {title}
                    </label>
                )
            }

            <div className="relative w-full" ref={dropdownRef}>
                {
                    type === "date" ? (
                        <input
                            ref={inputRef}
                            type="date"
                            aria-label="date picker"
                            value={value}
                            className="text-sm w-full bg-transparent pr-4 outline-none [&::-webkit-calendar-picker-indicator]:hidden cursor-pointer"
                            onChange={(e) => onChange(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    ) : (
                        <div className="text-sm w-full bg-transparent pr-8">
                            {getDisplayValue()}
                        </div>
                    )
                }

                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Suspense>
                        <BiDown size={22} />
                    </Suspense>
                </div>
            </div>

            {
                type === "select" && isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-light-gray rounded shadow-lg z-50 max-h-60 overflow-y-auto">
                        {
                            options.map((option) => (
                                <div
                                    key={option.value}
                                    className="px-4 py-2 border border-hover:bg-light-gray/20 cursor-pointer text-sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelectOption(option.value);
                                    }}
                                >
                                    {option.label}
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}